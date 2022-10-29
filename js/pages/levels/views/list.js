import ClayButton from '@clayui/button';
import {ClayDropDownWithItems} from '@clayui/drop-down';
import {ClayCheckbox} from '@clayui/form';
import ClayIcon from '@clayui/icon';
import ClayList from '@clayui/list';
import React from 'react';

export default function List({
	actions,
	changeItemSelected,
	items,
	selectedItems,
}) {
	return (
		<ClayList>
			{items.map((item, key) => {
				const {description, order, title} = item;

				return (
					<ClayList.Item
						active={selectedItems[key].selected}
						flex
						key={key}
					>
						<ClayList.ItemField>
							<ClayCheckbox
								checked={selectedItems[key].selected}
								onChange={() => changeItemSelected(key)}
							/>
						</ClayList.ItemField>

						<ClayList.ItemField>
							<span className="sticker sticker-user-icon sticker-xl">
								<span className="sticker-overlay">
									<ClayIcon
										className="placeholder-icon"
										symbol="picture"
									/>
								</span>
							</span>
						</ClayList.ItemField>

						<ClayList.ItemField expand>
							<section className="autofit-section">
								<ClayList.ItemTitle>{title}</ClayList.ItemTitle>

								<ClayList.ItemText>
									<span className="">ترتیب: {order}</span>
								</ClayList.ItemText>

								<div className="list-group-detail">
									{description}
								</div>
							</section>
						</ClayList.ItemField>

						<ClayList.ItemField>
							<div className="dropdown dropdown-action">
								<ClayDropDownWithItems
									items={actions(item)}
									trigger={
										<ClayButton
											className="nav-link nav-link-monospaced"
											displayType="unstyled"
										>
											<ClayIcon symbol="ellipsis-v" />
										</ClayButton>
									}
								/>
							</div>
						</ClayList.ItemField>
					</ClayList.Item>
				);
			})}
		</ClayList>
	);
}
