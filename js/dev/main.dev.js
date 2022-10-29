import '@clayui/css/lib/css/atlas.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {definitions} from '@sainui/core';
import configs from './configs';

import App from '../index.es';

export default function (params) {
	const app = definitions('portlet-club-level-admin-web', {}, configs);

	setTimeout(() => {
		ReactDOM.render(
			<App />,
			document.getElementById(params.portletElementId)
		);
	}, app.delay);
}
