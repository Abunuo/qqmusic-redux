/**
 * Created by jiawei6 on 2016/11/22.
 */
import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router';

import {routes} from '../../routes';

const Root = ({history, store}) => (
	<Provider store={store}>
		<Router
			history={history}
			routes={routes}
		/>
	</Provider>
);

Root.propTypes = {
	history: PropTypes.object.isRequired,
	store: PropTypes.object.isRequired
};

export default Root;