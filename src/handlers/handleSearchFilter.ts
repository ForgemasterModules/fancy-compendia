/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import { DynMapReducer, DynReducerHelper } from '#runtime/svelte/store/reducer';

/**
 * Adds a filter to a given reducer
 */
export function addSearchFilter(reducer: DynMapReducer<string, any>, searchDescriptions = false) {
  reducer.filters.removeById('searchFilter');

  const queries = searchDescriptions ? ['name', 'system.description'] : 'name';
  const searchFilter = DynReducerHelper.filters.regexObjectQuery(queries);

  const searchInput = {
    store: searchFilter,
    placeholder: 'Search',
    type: 'search'
  };
  reducer.filters.add({ id: 'searchFilter', filter: searchFilter });

  return searchInput;
}

export function removeSearchFilter(reducer: DynMapReducer<string, any>) {
  reducer.filters.removeById('searchFilter');
}
