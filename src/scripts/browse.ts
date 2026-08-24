// Home-page interactivity: filter / sort / search / view toggle over the
// statically rendered rows. Rows are never re-created — they are shown,
// hidden and reordered in place, so the full list stays in the HTML.
import { loadCopyCounts, refreshCopyLabels } from './copies';

interface BrowseState {
  category: string;
  integration: string;
  query: string;
  sort: 'copies' | 'newest' | 'name';
  view: 'table' | 'cards';
}

function init(): void {
  const search = document.getElementById('agent-search') as HTMLInputElement | null;
  const category = document.getElementById('agent-category') as HTMLInputElement | null;
  const integration = document.getElementById('agent-integration') as HTMLInputElement | null;
  const sort = document.getElementById('agent-sort') as HTMLInputElement | null;
  const btnTable = document.getElementById('view-table-btn');
  const btnCards = document.getElementById('view-cards-btn');
  const tableView = document.getElementById('table-view');
  const cardsView = document.getElementById('cards-view');
  const empty = document.getElementById('empty-state');
  if (!search || !category || !integration || !btnTable || !btnCards || !tableView || !cardsView || !empty) return;

  const state: BrowseState = {
    category: new URLSearchParams(location.search).get('category') || 'All',
    integration: 'all',
    query: '',
    sort: sort?.value === 'copies' || sort?.value === 'newest' ? sort.value : 'name',
    view: window.matchMedia('(max-width: 900px)').matches ? 'cards' : 'table',
  };
  category.dispatchEvent(new CustomEvent('select:set', { detail: state.category }));

  function syncUrl(): void {
    const url = new URL(location.href);
    if (state.category === 'All') url.searchParams.delete('category');
    else url.searchParams.set('category', state.category);
    history.replaceState(null, '', url);
  }

  const effectiveCopies = (row: HTMLElement): number => Number(row.dataset.copies || '0');

  const matches = (row: HTMLElement, q: string): boolean =>
    (state.category === 'All' || row.dataset.category === state.category) &&
    (state.integration === 'all' || (row.dataset.integrations || '').split('|').includes(state.integration)) &&
    (!q || (row.dataset.search || '').includes(q));

  function applyTo(container: HTMLElement): number {
    const agentRows = Array.from(container.querySelectorAll<HTMLElement>('[data-slug]'));
    const q = state.query.trim().toLowerCase();

    const visible = agentRows.filter((r) => matches(r, q));
    visible.sort((a, b) => {
      if (state.sort === 'name') return (a.dataset.name || '').localeCompare(b.dataset.name || '');
      if (state.sort === 'newest') {
        const byDate = (b.dataset.addedAt || '').localeCompare(a.dataset.addedAt || '');
        return byDate || (a.dataset.name || '').localeCompare(b.dataset.name || '');
      }
      return effectiveCopies(b) - effectiveCopies(a) ||
        (a.dataset.name || '').localeCompare(b.dataset.name || '');
    });

    const hiddenRows = agentRows.filter((r) => !visible.includes(r));

    for (const r of visible) r.hidden = false;
    for (const r of hiddenRows) r.hidden = true;
    for (const r of [...visible, ...hiddenRows]) container.appendChild(r);

    return visible.length;
  }

  function apply(): void {
    applyTo(tableView!);
    applyTo(cardsView!);
    const anyVisible = tableView!.querySelectorAll('[data-slug]:not([hidden])').length > 0;
    empty!.hidden = anyVisible;
  }

  function syncView(): void {
    tableView!.hidden = state.view !== 'table';
    cardsView!.hidden = state.view !== 'cards';
    btnTable!.classList.toggle('active', state.view === 'table');
    btnCards!.classList.toggle('active', state.view === 'cards');
  }

  search.addEventListener('input', () => {
    state.query = search.value;
    apply();
  });
  category.addEventListener('change', () => {
    state.category = category.value || 'All';
    syncUrl();
    apply();
  });
  integration.addEventListener('change', () => {
    state.integration = integration.value;
    apply();
  });
  sort?.addEventListener('change', () => {
    state.sort = sort.value === 'name' || sort.value === 'newest' ? sort.value : 'copies';
    apply();
  });
  btnTable.addEventListener('click', () => {
    state.view = 'table';
    syncView();
  });
  btnCards.addEventListener('click', () => {
    state.view = 'cards';
    syncView();
  });

  refreshCopyLabels();
  apply();
  syncView();
  void loadCopyCounts().then(apply);
}

init();
