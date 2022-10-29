import ClayButton from '@clayui/button';
import {ClayResultsBar} from '@clayui/management-toolbar';
import React from 'react';

export default function View({btnText, filter, handelFilter}) {
	return filter.map((fil, key) => {
		if (fil.active) {
			return (
				<div className="mb-2" key={key}>
					<ClayResultsBar>
						<ClayResultsBar.Item expand>
							<span className="component-text text-truncate-inline">
								{fil.text}
							</span>
						</ClayResultsBar.Item>

						<ClayResultsBar.Item>
							<ClayButton
								className="component-link tbar-link"
								displayType="unstyled"
								onClick={() => handelFilter(fil.name)}
							>
								{btnText}
							</ClayButton>
						</ClayResultsBar.Item>
					</ClayResultsBar>
				</div>
			);
		}
	});
}
