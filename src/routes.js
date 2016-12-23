/**
 * Created by jiawei6 on 2016/11/22.
 */
export const routes = {
	component: require('./views/App').default,
	childRoutes: [
		{
			component: require('./views/MainPage').default,
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
							//component: require('./views/ExplorePage/ExploreSingerPage').default
							getComponent(nextState, cb) {
								require.ensure([], (require) => {
									cb(null, require('./views/ExplorePage/ExploreSingerPage').default)
								}, 'ExploreSingerPage');
							}
						},
						{
							path: 'albumlist',
							//component: require('./views/ExplorePage/ExploreAlbumPage').default
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
					//component: require('./views/MVListPage').default
					getComponent(nextState, cb) {
						require.ensure([], (require) => {
							cb(null, require('./views/MVListPage').default)
						}, 'MVListPage');
					}
				},
				{
					path: 'singer',
					//component: require('./views/SingerPage').default,
					getComponent(nextState, cb) {
						require.ensure([], (require) => {
							cb(null, require('./views/SingerPage').default)
						}, 'SingerPage');
					},
					childRoutes: [
						{
							path: 'song/:mid',
							//component: require('./views/SingerPage/SingerSongPage').default
							getComponent(nextState, cb) {
								require.ensure([], (require) => {
									cb(null, require('./views/SingerPage/SingerSongPage').default)
								}, 'SingerSongPage');
							}
						},
						{
							path: 'album/:mid',
							//component: require('./views/SingerPage/SingerAlbumPage').default
							getComponent(nextState, cb) {
								require.ensure([], (require) => {
									cb(null, require('./views/SingerPage/SingerAlbumPage').default)
								}, 'SingerAlbumPage');
							}
						},
						{
							path: 'mv/:mid',
							//component: require('./views/SingerPage/SingerMVPage').default
							getComponent(nextState, cb) {
								require.ensure([], (require) => {
									cb(null, require('./views/SingerPage/SingerMVPage').default)
								}, 'SingerMVPage');
							}
						},
						{
							path: 'similar/:mid',
							//component: require('./views/SingerPage/SingerSimilarPage').default
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
					//component: require('./views/ToplistPage').default
					getComponent(nextState, cb) {
						require.ensure([], (require) => {
							cb(null, require('./views/ToplistPage').default)
						}, 'ToplistPage');
					}
				},
				{
					path: 'album',
					//component: require('./views/AlbumPage').default,
					getComponent(nextState, cb) {
						require.ensure([], (require) => {
							cb(null, require('./views/AlbumPage').default)
						}, 'AlbumPage');
					},
					childRoutes: [
						{
							path: 'song/:mid',
							//component: require('./views/AlbumPage/AlbumSongPage').default
							getComponent(nextState, cb) {
								require.ensure([], (require) => {
									cb(null, require('./views/AlbumPage/AlbumSongPage').default)
								}, 'AlbumSongPage');
							}
						},
						{
							path: 'data/:mid',
							//component: require('./views/AlbumPage/AlbumDataPage').default
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
					//component: require('./views/MVPage').default
					getComponent(nextState, cb) {
						require.ensure([], (require) => {
							cb(null, require('./views/MVPage').default)
						}, 'MVPage');
					}
				},
				{
					path: 'search',
					component: require('./views/SearchPage').default,
					childRoutes: [
						{
							path: 'song',
							component: require('./views/SearchPage/SearchSongPage').default
						},
						{
							path: 'album',
							component: require('./views/SearchPage/SearchAlbumPage').default
						},
						{
							path: 'mv',
							component: require('./views/SearchPage/SearchMVPage').default
						}
					]
				}
			]
		},
		{
			path: 'play',
			component: require('./views/PlayPage').default
			/*getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('./views/PlayPage').default)
				}, 'PlayPage');
			}*/
		}
	]
};
