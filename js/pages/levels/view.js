import ClayButton, {ClayButtonWithIcon} from '@clayui/button';
import {ClayDropDownWithItems} from '@clayui/drop-down';
import {ClayCheckbox, ClayInput} from '@clayui/form';
import ClayIcon from '@clayui/icon';
import ClayLoadingIndicator from '@clayui/loading-indicator';
import ClayManagementToolbar, {
	ClayResultsBar,
} from '@clayui/management-toolbar';
import findIndex from 'lodash/findIndex';
import pickBy from 'lodash/pickBy';
import React from 'react';
import {useHistory} from 'react-router-dom';

import EmptyState from '../components/empty-state/view';
import FilterResultBar from '../components/filter-results-bar/view';
import Pagination from '../components/pagination-bar/view';
import SearchResultBar from '../components/search-results-bar/view';
import Card from './views/card';
import List from './views/list';
import Table from './views/table';

export default function View({
	actions,
	changeItemSelected,
	data,
	deleteLevels,
	handelFilter,
	handelSearch,
	handelSort,
	mainCheckBoxStatus,
	searchInputRef: searchInput,
	searchMobile,
	setData,
	setSearchMobile,
	sortIcon,
	sortItems,
	viewTypes,
}) {
	const history = useHistory();

	// data

	const {filter, items, loading, searchValue, selectedItems, viewType} = data;

	return (
		<div className="main-row">
			<div className="mb-2">
				<ClayManagementToolbar className="mb-0">
					<ClayManagementToolbar.ItemList>
						<ClayManagementToolbar.Item>
							<ClayCheckbox
								checked={mainCheckBoxStatus(data, 'checked')}
								indeterminate={mainCheckBoxStatus(
									data,
									'indeterminate'
								)}
								onChange={(ev) => {
									var value = ev.target.checked;
									setData((os) => {
										os.selectedItems.map((ob) => {
											ob.selected = value;
										});

										return {...os};
									});
								}}
							/>
						</ClayManagementToolbar.Item>

						<ClayManagementToolbar.Item>
							<ClayDropDownWithItems
								items={sortItems}
								trigger={
									<ClayButton
										className="nav-link nav-link-monospaced"
										disabled={true}
										displayType="unstyled"
									>
										<ClayIcon symbol="order-arrow" />
									</ClayButton>
								}
							/>
						</ClayManagementToolbar.Item>

						<ClayManagementToolbar.Item>
							<ClayDropDownWithItems
								items={data.filter}
								trigger={
									<ClayButton
										className="nav-link nav-link-monospaced"
										disabled={true}
										displayType="unstyled"
									>
										<ClayIcon symbol="filter" />
									</ClayButton>
								}
							/>
						</ClayManagementToolbar.Item>
					</ClayManagementToolbar.ItemList>

					<ClayManagementToolbar.Search
						onSubmit={(ev) => handelSearch(ev)}
						showMobile={searchMobile}
					>
						<ClayInput.Group className="mb-0">
							<ClayInput.GroupItem>
								<ClayInput
									className="form-control input-group-inset input-group-inset-after"
									defaultValue={searchValue}
									placeholder="جستجو"
									ref={searchInput}
									type="text"
								/>

								<ClayInput.GroupInsetItem after tag="span">
									<ClayButtonWithIcon
										className="navbar-breakpoint-d-none"
										displayType="unstyled"
										onClick={(ev) => {
											setSearchMobile(false);
											handelSearch(ev);
										}}
										spritemap={
											themeDisplay.getPathThemeImages() +
											'/clay/icons.svg'
										}
										symbol="times"
									/>

									<ClayButtonWithIcon
										displayType="unstyled"
										onClick={(ev) => handelSearch(ev)}
										spritemap={
											themeDisplay.getPathThemeImages() +
											'/clay/icons.svg'
										}
										symbol="search"
									/>
								</ClayInput.GroupInsetItem>
							</ClayInput.GroupItem>
						</ClayInput.Group>
					</ClayManagementToolbar.Search>

					<ClayManagementToolbar.ItemList>
						<ClayManagementToolbar.Item className="navbar-breakpoint-d-none">
							<ClayButton
								className="nav-link nav-link-monospaced"
								displayType="unstyled"
								onClick={() => setSearchMobile(true)}
							>
								<ClayIcon symbol="search" />
							</ClayButton>
						</ClayManagementToolbar.Item>

						<ClayManagementToolbar.Item>
							<ClayDropDownWithItems
								items={viewTypes}
								spritemap={
									themeDisplay.getPathThemeImages() +
									'/clay/icons.svg'
								}
								trigger={
									<ClayButton
										className="nav-link nav-link-monospaced"
										displayType="unstyled"
									>
										<ClayIcon
											spritemap={
												themeDisplay.getPathThemeImages() +
												'/clay/icons.svg'
											}
											symbol={viewType.symbolLeft}
										/>
									</ClayButton>
								}
							/>
						</ClayManagementToolbar.Item>

						<ClayManagementToolbar.Item>
							<ClayButtonWithIcon
								className="nav-btn nav-btn-monospaced"
								onClick={() => history.push(`/level/form/add`)}
								spritemap={
									themeDisplay.getPathThemeImages() +
									'/clay/icons.svg'
								}
								symbol="plus"
							/>
						</ClayManagementToolbar.Item>
					</ClayManagementToolbar.ItemList>
				</ClayManagementToolbar>
			</div>

			{/* item selected alert */}

			{!loading && findIndex(selectedItems, {selected: true}) !== -1 && (
				<div className="mb-2 selected-items-col">
					<ClayResultsBar>
						<ClayResultsBar.Item expand>
							<span className="component-text text-truncate-inline">
								{
									Object.keys(
										pickBy(selectedItems, {
											selected: true,
										})
									).length
								}{' '}
								مورد
							</span>
						</ClayResultsBar.Item>

						<ClayResultsBar.Item>
							<ClayButton
								className="component-link tbar-link"
								disabled={true}
								displayType="unstyled"
								onClick={() => deleteLevels(false)}
							>
								حذف موارد
							</ClayButton>
						</ClayResultsBar.Item>
					</ClayResultsBar>
				</div>
			)}

			<SearchResultBar
				{...{btnText: 'تمام سطوح', handelSearch, searchValue}}
			/>

			<FilterResultBar
				{...{btnText: 'حذف فیلتر', filter, handelFilter}}
			/>

			<div className="mt-3">
				{loading ? (
					<ClayLoadingIndicator className="my-5" />
				) : (
					<>
						{items && items.length === 0 ? (
							<EmptyState
								{...{
									title: 'هیچ نتیجه ایی برای نمایش وجود ندارد.',
								}}
							/>
						) : (
							<>
								{viewType.symbolLeft === 'table' && (
									<Table
										{...{
											actions,
											changeItemSelected,
											handelSort,
											items,
											selectedItems,
											sortIcon,
										}}
									/>
								)}
								{viewType.symbolLeft === 'list' && (
									<List
										{...{
											actions,
											changeItemSelected,
											items,
											selectedItems,
										}}
									/>
								)}
								{viewType.symbolLeft === 'cards2' && (
									<Card
										{...{
											actions,
											changeItemSelected,
											items,
											selectedItems,
										}}
									/>
								)}

								<Pagination {...{data, setData}} />
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
}
