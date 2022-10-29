import ClayButton from '@clayui/button';
import {ClayDropDownWithItems} from '@clayui/drop-down';
import {ClayCheckbox} from '@clayui/form';
import ClayIcon from '@clayui/icon';
import ClayTable from '@clayui/table';
import React from 'react';

export default function Table({
	actions,
	changeItemSelected,
	items,
	selectedItems,

	// sortIcon,
	// handelSort,

}) {
	return (
		<ClayTable>
			<ClayTable.Head>
				<ClayTable.Row>
					<ClayTable.Cell></ClayTable.Cell>

					<ClayTable.Cell headingCell>شناسه</ClayTable.Cell>

					<ClayTable.Cell headingCell>عنوان</ClayTable.Cell>

					<ClayTable.Cell headingCell>
						حداقل/حداکثر امتیاز
					</ClayTable.Cell>

					<ClayTable.Cell headingCell>تخفیف</ClayTable.Cell>

					<ClayTable.Cell headingCell>
						حداقل/حداکثر کارمزد
					</ClayTable.Cell>

					<ClayTable.Cell headingCell>ترتیب</ClayTable.Cell>

					<ClayTable.Cell headingCell></ClayTable.Cell>
				</ClayTable.Row>
			</ClayTable.Head>

			<ClayTable.Body>
				{items.map((item, key) => {
					const {
						id,
						maxCommission,
						maxScoreLevel,
						minCommission,
						minScoreLevel,
						order,
						percentDiscount,
						title,
					} = item;

					return (
						<ClayTable.Row
							active={selectedItems[key].selected}
							key={key}
						>
							<ClayTable.Cell>
								<ClayCheckbox
									checked={selectedItems[key].selected}
									onChange={() => changeItemSelected(key)}
								/>
							</ClayTable.Cell>

							<ClayTable.Cell>{id}</ClayTable.Cell>

							<ClayTable.Cell>{title}</ClayTable.Cell>

							<ClayTable.Cell>
								{minScoreLevel} / {maxScoreLevel}
							</ClayTable.Cell>

							<ClayTable.Cell>{percentDiscount}</ClayTable.Cell>

							<ClayTable.Cell>
								{minCommission} / {maxCommission}
							</ClayTable.Cell>

							<ClayTable.Cell>{order}</ClayTable.Cell>

							<ClayTable.Cell>
								<ClayDropDownWithItems
									items={actions(item)}
									trigger={
										<ClayButton
											className="action-btn nav-link nav-link-monospaced"
											displayType="unstyled"
										>
											<ClayIcon symbol="ellipsis-v" />
										</ClayButton>
									}
								/>
							</ClayTable.Cell>
						</ClayTable.Row>
					);
				})}
			</ClayTable.Body>
		</ClayTable>
	);
}
