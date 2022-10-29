import ClayButton from '@clayui/button';
import ClayCard from '@clayui/card';
import {ClayDropDownWithItems} from '@clayui/drop-down';
import {ClayCheckbox} from '@clayui/form';
import ClayIcon, { ClayIconSpriteContext } from "@clayui/icon";
import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import spritemap from "./icons.svg";
import ClayLabel from "@clayui/label";




export const ClayCheckboxWithState = (props) => {
    const { item } = props;
    const [value, setValue] = useState(false);
    useEffect(() => {
      setValue(props.allselect);
    }, [props.allselect]);
    const CounterItem = (value) => {
      props.counter(item, value);
    };
    return (
      <ClayCard.AspectRatio className="card-item-first">

      <ClayCheckbox
        aria-label="Select"
        checked={value}
        onChange={() => {
          value === false ? CounterItem(true) : CounterItem(false);
          setValue((val) => !val);
        }}
      >	<div className="parent-img">
      <ClayIconSpriteContext.Provider value={spritemap}>
          <ClayIcon className="placeholder-icon text-secondary custom-control-picture" symbol="picture" />
        </ClayIconSpriteContext.Provider>
      </div></ClayCheckbox></ClayCard.AspectRatio>
    );
  };
  

export default function CardWithSelectable(args) {
    function Dropdown(props) {
        return (
          <ClayDropDownWithItems
            items={[
              {
                onClick: () => {
                  passItem(props.item);
                },
                label: "ویرایش",
              },
              { href: "#2", label: "Two" },
              { href: "#3", label: "Three" },
            ]}
            trigger={
              <ClayButton
                aria-label="Open Dropdown"
                className="component-action"
                displayType="unstyled"
                monospaced
              >
                {" "}
                <ClayIconSpriteContext.Provider value={spritemap}>
                  <ClayIcon symbol="ellipsis-v" />
                </ClayIconSpriteContext.Provider>
              </ClayButton>
            }
          />
        );
      }

      
  const CounterItems = (item, value) => {
    args.counter(item, value);
  };

  const [countItem, setCountItem] = useState(args.countItem);
useEffect(()=>{setCountItem(args.countItem)},[args.countItem])
  const navigate = useNavigate();

  const passItem = (item) => {
    args.passItem(item);
    navigate("/edit");
  };

	return (
	<div className="mt-3">
    <ClayCard.Group>
			{Object.values(countItem).map((item) => (
					<ClayCard
						displayType="file"
						selectable
            key={item.id}
					>
                <ClayCheckboxWithState
                allselect={args.allselect}
                counter={CounterItems}
                item={item}
                aria-label="Select row"
              >
							</ClayCheckboxWithState>
							
						<ClayCard.Body>
							<ClayCard.Row>
								<div className="autofit-col autofit-col-expand">
									<section className="autofit-section">
										<ClayCard.Description displayType="title">
                    {item.name}
										</ClayCard.Description>

										<ClayCard.Description displayType="subtitle">
                    <span className="">
                    {" "}
                    {item.day.map((itm) => (
                      <span key={itm.id}>{itm.day} </span>
                    ))}{" "}
                    {item.time.hours}:{item.time.minutes}
                  </span>
										</ClayCard.Description>

										<div className="d-flex">
                  <div className="list-group-detail p-1">
                    {item.type === 1 ? "سیما" : "صدا"}
                  </div>
                  <div className="p-1">
                    {item.status ? (
                      <ClayLabel displayType="info">{"فعال"}</ClayLabel>
                    ) : (
                      <ClayLabel displayType="warning">{"غیر فعال"}</ClayLabel>
                    )}
                  </div>
                </div>
									</section>
								</div>

								<div className="autofit-col">
                                <Dropdown item={item}/>

								</div>
							</ClayCard.Row>
						</ClayCard.Body>
					</ClayCard>
				
			))}
		</ClayCard.Group>
</div>
	);
}
