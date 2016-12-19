/**
 * Created by jiawei6 on 2016/11/22.
 */
if (process.env.NODE_ENV === 'production') {
	module.exports = require('./configureStore.prod')
} else {
	module.exports = require('./configureStore.dev')
}
