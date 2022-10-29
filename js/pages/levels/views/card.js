import ClayButton from '@clayui/button';
import ClayCard from '@clayui/card';
import {ClayDropDownWithItems} from '@clayui/drop-down';
import {ClayCheckbox} from '@clayui/form';
import ClayIcon from '@clayui/icon';
import React from 'react';

export default function Card({
	actions,
	changeItemSelected,
	items,
	selectedItems,
}) {
	return (
		<ClayCard.Group>
			{items.map((item, key) => {
				const {
					maxScoreLevel,
					minScoreLevel,
					order,
					percentDiscount,
					title,
				} = item;

				return (
					<ClayCard
						active={selectedItems[key].selected}
						displayType="file"
						key={key}
						selectable
					>
						<ClayCard.AspectRatio className="card-item-first">
							<ClayCheckbox
								checked={selectedItems[key].selected}
								className="custom-checkbox"
								disabled={false}
								onChange={() => changeItemSelected(key)}
								style={{zIndex: 3}}
							>
								<div className="parent-img">
									<ClayIcon
										className="placeholder-icon text-secondary"
										symbol="picture"
									/>
								</div>
							</ClayCheckbox>
						</ClayCard.AspectRatio>

						<ClayCard.Body>
							<ClayCard.Row>
								<div className="autofit-col autofit-col-expand">
									<section className="autofit-section">
										<ClayCard.Description displayType="title">
											{title}
										</ClayCard.Description>

										<ClayCard.Description displayType="subtitle">
											{`ترتیب : ${order}  | تخفیف : ${percentDiscount}`}
										</ClayCard.Description>

										<ClayCard.Caption>
											<span className="badge badge-info badge-pill">
												<span className="badge-item badge-item-expand">
													{`حداکثر امتیاز: ${maxScoreLevel}`}
												</span>
											</span>

											<span className="badge badge-pill badge-secondary">
												<span className="badge-item badge-item-expand">
													{`حداقل امتیاز: ${minScoreLevel}`}
												</span>
											</span>
										</ClayCard.Caption>
									</section>
								</div>

								<div className="autofit-col">
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
							</ClayCard.Row>
						</ClayCard.Body>
					</ClayCard>
				);
			})}
		</ClayCard.Group>
	);
}
