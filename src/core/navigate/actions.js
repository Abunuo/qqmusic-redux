/**
 * Created by jiawei6 on 2016/11/28.
 */
export const nagivateActions = {
	NAVIGATE_TO: 'NAVIGATE_TO',
	NAVIGATE_TO_SEARCH: 'NAVIGATE_TO_SEARCH',

	navigateTo: (path, param) => ({
		type: nagivateActions.NAVIGATE_TO,
		payload: {
			pathname: `${path}`,
			param
		}
	}),

	navigateToSearch: (type, query, lastSearch) => ({
		type: nagivateActions.NAVIGATE_TO_SEARCH,
		payload: {
			pathname: `/search/${type}?q=${query}`,
			lastSearch: lastSearch,
			currentSearch: query
		}
	})
};