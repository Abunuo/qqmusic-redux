/**
 * Created by jiawei6 on 2016/11/22.
 */
export const routes = {
	component: require('./views/App').default,
	childRoutes: [
		{
			//path: '/',
			component: require('./views/App/MainPage').default,
			/*indexRoute: {
				component: require('./views/ExplorePage').default
			},*/
			childRoutes: [
				{
					path: '/',
					component: require('./views/ExplorePage').default,
					indexRoute: {
						component: require('./views/ExplorePage/ExploreToplistPage').default,
					},
					childRoutes: [
						{
							path: 'singerlist',
							getComponent(nextState, cb) {
								require.ensure([], (require) => {
									cb(null, require('./views/ExplorePage/ExploreSingerPage').default)
								}, 'ExploreSingerPage');
							}
						},
						{
							path: 'albumlist',
							getComponent(nextState, cb) {
								require.ensure([], (require) => {
									cb(null, require('./views/ExplorePage/ExploreAlbumPage').default)
								}, 'ExploreAlbumPage');
							}
						}
					]
				},
				{
					path: 'mvlist',
					getComponent(nextState, cb) {
						require.ensure([], (require) => {
							cb(null, require('./views/MVListPage').default)
						}, 'MVListPage');
					}
				},
				{
					path: 'singer',
					getComponent(nextState, cb) {
						require.ensure([], (require) => {
							cb(null, require('./views/SingerPage').default)
						}, 'SingerPage');
					},
					childRoutes: [
						{
							path: 'song/:mid',
							getComponent(nextState, cb) {
								require.ensure([], (require) => {
									cb(null, require('./views/SingerPage/SingerSongPage').default)
								}, 'SingerSongPage');
							}
						},
						{
							path: 'album/:mid',
							getComponent(nextState, cb) {
								require.ensure([], (require) => {
									cb(null, require('./views/SingerPage/SingerAlbumPage').default)
								}, 'SingerAlbumPage');
							}
						},
						{
							path: 'mv/:mid',
							getComponent(nextState, cb) {
								require.ensure([], (require) => {
									cb(null, require('./views/SingerPage/SingerMVPage').default)
								}, 'SingerMVPage');
							}
						},
						{
							path: 'similar/:mid',
							getComponent(nextState, cb) {
								require.ensure([], (require) => {
									cb(null, require('./views/SingerPage/SingerSimilarPage').default)
								}, 'SingerSimilarPage');
							}
						}
					]
				},
				{
					path: 'toplist/:mid',
					getComponent(nextState, cb) {
						require.ensure([], (require) => {
							cb(null, require('./views/ToplistPage').default)
						}, 'ToplistPage');
					}
				},
				{
					path: 'album',
					getComponent(nextState, cb) {
						require.ensure([], (require) => {
							cb(null, require('./views/AlbumPage').default)
						}, 'AlbumPage');
					},
					childRoutes: [
						{
							path: 'song/:mid',
							getComponent(nextState, cb) {
								require.ensure([], (require) => {
									cb(null, require('./views/AlbumPage/AlbumSongPage').default)
								}, 'AlbumSongPage');
							}
						},
						{
							path: 'data/:mid',
							getComponent(nextState, cb) {
								require.ensure([], (require) => {
									cb(null, require('./views/AlbumPage/AlbumDataPage').default)
								}, 'AlbumDataPage');
							}
						}
					]
				},
				{
					path: 'mv/:mid',
					getComponent(nextState, cb) {
						require.ensure([], (require) => {
							cb(null, require('./views/MVPage').default)
						}, 'MVPage');
					}
				},
				{
					path: 'search',
					component: require('./views/SearchPage').default,
					/*getComponent(nextState, cb) {
						require.ensure([], (require) => {
							cb(null, require('./views/SearchPage').default)
						}, 'SearchPage');
					},*/
					childRoutes: [
						{
							path: 'song',
							component: require('./views/SearchPage/SearchSongPage').default
							/*getComponent(nextState, cb) {
								require.ensure([], (require) => {
									cb(null, require('./views/SearchPage/SearchSongPage').default)
								}, 'SearchSongPage');
							}*/
						},
						{
							path: 'album',
							component: require('./views/SearchPage/SearchAlbumPage').default
							/*getComponent(nextState, cb) {
								require.ensure([], (require) => {
									cb(null, require('./views/SearchPage/SearchAlbumPage').default)
								}, 'SearchAlbumPage');
							}*/
						},
						{
							path: 'mv',
							component: require('./views/SearchPage/SearchMVPage').default
							/*getComponent(nextState, cb) {
								require.ensure([], (require) => {
									cb(null, require('./views/SearchPage/SearchMVPage').default)
								}, 'SearchMVPage');
							}*/
						}
					]
				}
			]
		},
		{
			path: 'play',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('./views/PlayPage').default)
				}, 'PlayPage');
			}
		}
	]
};
