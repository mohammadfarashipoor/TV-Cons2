import ClayButton from '@clayui/button';
import ClayIcon from '@clayui/icon';
import {ClayPaginationWithBasicItems} from '@clayui/pagination';
import ClayPaginationBar from '@clayui/pagination-bar';
import React from 'react';

export default function View({data, setData}) {

	// pagination variable

	const paginationInfo = (data) => {
		var count = data.items.length;
		var {activePage, pageSize, totalCount} = data;

		var start = pageSize * (activePage - 1) + 1;
		if (activePage === 1) {
			start = 1;
		}
		var end = start + count - 1;
		if (count === 0) {
			start = 0;
		}

		return (
			<>
				نمایش مورد {start} تا {end} از {totalCount} مورد
			</>
		);
	};

	// data

	const {activePage, lastPage, pageSize, totalCount} = data;

	return (
		<ClayPaginationBar className="border-top my-1 pt-3" dir="ltr">
			<ClayPaginationBar.DropDown
				items={[8, 16, 32, 64].map((num) => {
					return {
						label: num,
						onClick: () => {
							setData((oldState) => {
								if (totalCount < num) {
									oldState.activePage = 1;
								}

								return {
									loading: true,
									...oldState,
									pageSize: num,
								};
							});
						},
					};
				})}
				trigger={
					<ClayButton displayType="unstyled">
						{pageSize}
						مورد
						<ClayIcon symbol="caret-double-l" />
					</ClayButton>
				}
			/>

			<ClayPaginationBar.Results>
				{paginationInfo(data)}
			</ClayPaginationBar.Results>

			<ClayPaginationWithBasicItems
				activePage={activePage}
				dir="ltr"
				ellipsisBuffer={1}
				onPageChange={(num) => {
					setData((oldState) => {
						return {
							...oldState,
							activePage: num,
							loading: true,
						};
					});
				}}
				spritemap={
					themeDisplay.getPathThemeImages() + '/clay/icons.svg'
				}
				totalPages={lastPage}
			/>
		</ClayPaginationBar>
	);
}
