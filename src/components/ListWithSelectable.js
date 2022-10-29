import ClayButton from "@clayui/button";
import { ClayDropDownWithItems } from "@clayui/drop-down";
import { ClayCheckbox } from "@clayui/form";
import ClayIcon, { ClayIconSpriteContext } from "@clayui/icon";
import ClayList from "@clayui/list";
import React from "react";
import spritemap from "./icons.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <ClayCheckbox
      aria-label="Select"
      checked={value}
      onChange={() => {
        value === false ? CounterItem(true) : CounterItem(false);
        setValue((val) => !val);
      }}
    />
  );
};

export default function ListWithSelectable(args) {
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
      {Object.values(countItem).map((item) => (
        <ClayList key={item.id}>
          <ClayList.Item active={true} flex>
            <ClayList.ItemField>
              <ClayCheckboxWithState
                allselect={args.allselect}
                counter={CounterItems}
                item={item}
                aria-label="Select row"
              />
            </ClayList.ItemField>

            <ClayList.ItemField>
              <span className="sticker sticker-user-icon sticker-xl">
                <span className="sticker-overlay">
                  <ClayIconSpriteContext.Provider value={spritemap}>
                    <ClayIcon className="placeholder-icon" symbol="picture" />
                  </ClayIconSpriteContext.Provider>
                </span>
              </span>
            </ClayList.ItemField>

            <ClayList.ItemField expand>
              <section className="autofit-section">
                <ClayList.ItemTitle>{item.name}</ClayList.ItemTitle>

                <ClayList.ItemText>
                  <span className="">
                    {" "}
                    {item.day.map((itm) => (
                      <span key={itm.id}>{itm.day} </span>
                    ))}{" "}
                    {item.time.hours}:{item.time.minutes}
                  </span>
                </ClayList.ItemText>
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
            </ClayList.ItemField>

            <ClayList.ItemField>
              <div className="dropdown dropdown-action">
                <Dropdown item={item}/>
              </div>
            </ClayList.ItemField>
          </ClayList.Item>
        </ClayList>
      ))}
    </div>
  );
}
