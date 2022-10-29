import Core, {definitions} from '@sainui/core';
import React from 'react';
import {ClayIconSpriteContext} from '@clayui/icon';
import configs from './dev/configs';

import routes from './pages/routes';

import './assets/styles/main.css';

export default function (props) {
	const app = definitions('portlet-club-level-admin-web', props, configs);

	const {developmentMode, direction, wrapperClassName} = app;

	return (
		<Core app={app} routes={routes}>
			{({children: pages}) => {
				return (
					<ClayIconSpriteContext.Provider
						value={
							themeDisplay.getPathThemeImages() +
							'/clay/icons.svg'
						}
					>
						<main
							className={wrapperClassName}
							dir={developmentMode ? direction : ''}
						>
							{pages}
						</main>
					</ClayIconSpriteContext.Provider>
				);
			}}
		</Core>
	);
}
