import ClayTable from "@clayui/table";
import { useEffect, useState } from "react";
import React from "react";
import ClayLoadingIndicator from "@clayui/loading-indicator";
import { useNavigate } from "react-router-dom";
import { ClayDropDownWithItems } from "@clayui/drop-down";
import ClayButton from "@clayui/button";
import ClayIcon, { ClayIconSpriteContext } from "@clayui/icon";
import { ClayCheckbox } from "@clayui/form";
import spritemap from "./icons.svg";

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
export const TableWithSelectable = (args) => {
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
  useEffect(() => {
    setCountItem(args.countItem);
  }, [args.countItem]);

  const navigate = useNavigate();

  const ComponentLoading = () => {
    return (
      <tr>
        <td colSpan="4">
          <div className="loading">
            <ClayLoadingIndicator small />
          </div>
        </td>
      </tr>
    );
  };
  const passItem = (item) => {
    args.passItem(item);
    navigate("/edit");
  };
  return (
    <form>
      {countItem === undefined ? (
        <ComponentLoading />
      ) : (
        <div>
          <ClayTable
            bodyVerticalAlignment={args.bodyVerticalAlignment}
            borderedColumns={args.borderedColumns}
            borderless={args.bordeless}
            headVerticalAlignment={args.headVerticalAlignment}
            headingNoWrap={args.headingNoWrap}
            hover={args.hover}
            noWrap={args.noWrap}
            responsive={args.responsive}
            responsiveSize={args.responsiveSize}
            striped={args.striped}
            tableVerticalAlignment={args.tableVerticalAlignment}
          >
            <ClayTable.Head>
              <ClayTable.Row className="table-header">
                <ClayTable.Cell headingCell></ClayTable.Cell>
                <ClayTable.Cell expanded headingCell>
                  {"نام برنامه"}
                </ClayTable.Cell>
                <ClayTable.Cell headingCell>{"روز"}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{"زمان پخش"}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{"لینک"}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{"نوع برنامه"}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{"وضعیت"}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{"پخش"}</ClayTable.Cell>
                <ClayTable.Cell headingCell></ClayTable.Cell>
              </ClayTable.Row>
            </ClayTable.Head>

            <ClayTable.Body className="table-row">
              {Object.values(countItem).map((item) => (
                <ClayTable.Row key={item.id}>
                  <ClayTable.Cell>
                    <ClayCheckboxWithState
                      allselect={args.allselect}
                      counter={CounterItems}
                      item={item}
                      aria-label="Select row"
                    />
                  </ClayTable.Cell>
                  <ClayTable.Cell headingTitle>{item.name}</ClayTable.Cell>
                  <ClayTable.Cell>
                    {item.day.map((itm) => (
                      <span key={itm.id}>{itm.day} </span>
                    ))}
                  </ClayTable.Cell>
                  <ClayTable.Cell>
                    {item.time.hours}:{item.time.minutes}
                  </ClayTable.Cell>
                  <ClayTable.Cell>
                    <a href="1">JPG</a>
                  </ClayTable.Cell>
                  <ClayTable.Cell>
                    {item.type === 1 ? "سیما" : "صدا"}
                  </ClayTable.Cell>
                  <ClayTable.Cell>
                    {item.status ? "فعال" : "غیرفعال"}
                  </ClayTable.Cell>
                  <ClayTable.Cell>
                    <a href="1">JPG</a>
                  </ClayTable.Cell>
                  <ClayTable.Cell>
                    <Dropdown item={item} />
                  </ClayTable.Cell>
                </ClayTable.Row>
              ))}
            </ClayTable.Body>
          </ClayTable>
        </div>
      )}
    </form>
  );
};
