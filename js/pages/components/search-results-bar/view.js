import ClayButton from '@clayui/button';
import {ClayResultsBar} from '@clayui/management-toolbar';
import React from 'react';

export default function View({btnText, handelSearch, searchValue}) {
	return (
		searchValue !== '' && (
			<div className="mb-2">
				<ClayResultsBar>
					<ClayResultsBar.Item expand>
						<span className="component-text text-truncate-inline">
							نمایش نتایج جستجو برای عبارت
							<strong> &quot;{searchValue}&quot; </strong>
						</span>
					</ClayResultsBar.Item>

					<ClayResultsBar.Item>
						<ClayButton
							className="component-link tbar-link"
							displayType="unstyled"
							onClick={() => handelSearch('clear')}
						>
							{btnText}
						</ClayButton>
					</ClayResultsBar.Item>
				</ClayResultsBar>
			</div>
		)
	);
}
