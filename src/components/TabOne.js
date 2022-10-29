import { TableWithSelectable } from "./TableWithSelectable";
import ListWithSelectable from "./ListWithSelectable";
import CardWithSelectable from "./CardWithSelectable";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataContext from "../context/DataContext";
import React from "react";
import DataFilterContext from "../context/DataFilterContext";
import ClayButton, { ClayButtonWithIcon } from "@clayui/button";
import { ClayDropDownWithItems } from "@clayui/drop-down";
import { ClayCheckbox, ClayInput } from "@clayui/form";
import ClayIcon, { ClayIconSpriteContext } from "@clayui/icon";
import ClayLabel from "@clayui/label";
import ClayManagementToolbar, {
  ClayResultsBar,
} from "@clayui/management-toolbar";
import spritemap from "./icons.svg";
import axios from "axios";
import Pagination from "./Pagination";
import _ from "lodash";
import ClayEmptyState from "@clayui/empty-state";
import successtate from "./success_state.gif";

let contme = [];
function TabOne(props) {
  // const { data } = props;
  const [search, setsearch] = useState("");
  const data = React.useContext(DataContext);
  const [mydata, setMyData] = useState(data);
  const [clicksearch, setClickSearch] = useState(false);
  const [message, setMessage] = useState("");
  const handleSearch = (e) => {
    setsearch(e.target.value);
    setMessage(e.target.value);
  };
  const handleFilter = (e) => {
    let search = [...data];
    if (e === "2") {
      setMyData(search.filter((item) => item.type === 1));
    }
    if (e === "3") {
      setMyData(search.filter((item) => item.type === 2));
    }
    if (e === "1") {
      setMyData(data);
    }
  };
  const passItem = (item) => {
    props.passItem(item);
  };
  const filterItems = [
    { label: "همه", value: "1", onClick: () => handleFilter("1") },
    { label: "سیما", value: "2", onClick: () => handleFilter("2") },
    { label: "صدا", value: "3", onClick: () => handleFilter("3") },
  ];
  const [viewtable, setViewTable] = useState("List");
  const viewTypes = [
    {
      active: viewtable === "List" ? true : false,
      label: "List",
      onClick: () => setViewTable("List"),
      symbolLeft: "list",
    },
    {
      active: viewtable === "Table" ? true : false,
      label: "Table",
      onClick: () => setViewTable("Table"),
      symbolLeft: "table",
    },
    {
      active: viewtable === "Card" ? true : false,
      label: "Card",
      onClick: () => setViewTable("Card"),
      symbolLeft: "cards2",
    },
  ];
  const onSearch = async () => {
    try {
      const result = await axios.get(
        `https://6242dd49b6734894c157e955.mockapi.io/date/d1/project1?name=${search}`
      );
      setMyData(result.data);
      setCountItem(result.data);
      setClickSearch(true);
    } catch (error) {
      console.error(error);
    }
  };
  const onClear = () => {
    setMessage("");
    setClickSearch(false);
    setMyData(data);
    setCountItem(data);
  };
  const [searchMobile, setSearchMobile] = useState(false);
  const viewTypeActive = viewTypes.find((type) => type.active);
  const [select, setSelect] = useState(false);

  const [myactivepage, setMyActivePage] = useState(1);
  const [mydelta, setMyDelta] = useState(20);
  const showitems = (activePage, delta) => {
    setMyActivePage(activePage);
    setMyDelta(delta);
  };
  const [countItem, setCountItem] = useState(data);

  useEffect(() => {
    const startIndex = (myactivepage - 1) * mydelta;
    setCountItem(_(data).slice(startIndex).take(mydelta).value());
  }, [mydelta, myactivepage, data]);
  useEffect(() => {
    setCountItem(mydata);
  }, [mydata]);
  const CounterSelect = (item, value) => {
    if (value === true) {
      if (item === "all") {
        contme = mydata;
        setItemSelect(mydata.length);
      } else {
        contme.push(item);
        setItemSelect(itemselect + 1);
      }
      console.log(contme);
    } else {
      if (item === "all") {
        contme = [];
        setItemSelect(0);
      } else {
        contme.pop(item);
        setItemSelect(itemselect - 1);
      }
    }
  };
  const [itemselect, setItemSelect] = useState(0);
  const deleteItemSelect = (item) => {
    console.log(item);
    item.map(async (item) => {
      try {
        await axios.delete(
          `https://6242dd49b6734894c157e955.mockapi.io/date/d1/project1/${item.id}`,
          data
        );
      } catch (error) {
        console.log(error);
      }
    });
    window.location.reload();
  };
  return (
    <div>
      <DataFilterContext.Provider value={mydata}>
        <div className="ml-5 mr-5 mt-2">
          <div>
            {itemselect === 0 && (
              <div>
                <ClayManagementToolbar className="toolbar">
                  <ClayManagementToolbar.ItemList className="itemlist-toolbar">
                    <ClayManagementToolbar.Item>
                      <ClayCheckbox
                        checked={select}
                        onChange={() => {
                          select === false
                            ? CounterSelect("all", true)
                            : CounterSelect("all", false);
                          setSelect((val) => !val);
                        }}
                      />
                    </ClayManagementToolbar.Item>

                    <ClayDropDownWithItems
                      items={filterItems}
                      spritemap={spritemap}
                      trigger={
                        <ClayButton className="nav-link" displayType="unstyled">
                          <span className="navbar-breakpoint-down-d-none">
                            <span className="navbar-text-truncate">
                              <ClayIconSpriteContext.Provider value={spritemap}>
                                <ClayIcon
                                  className="inline-item inline-item-after"
                                  symbol="filter"
                                />
                              </ClayIconSpriteContext.Provider>
                            </span>
                            <ClayIconSpriteContext.Provider value={spritemap}>
                              <ClayIcon
                                className="inline-item inline-item-after"
                                symbol="caret-bottom"
                              />
                            </ClayIconSpriteContext.Provider>
                          </span>
                          <span className="navbar-breakpoint-d-none">
                            <ClayIcon spritemap={spritemap} symbol="filter" />
                          </span>
                        </ClayButton>
                      }
                    />

                    <ClayManagementToolbar.Item>
                      <ClayButton
                        className="nav-link nav-link-monospaced"
                        displayType="unstyled"
                        onClick={() => {}}
                      >
                        <ClayIcon
                          spritemap={spritemap}
                          symbol="order-list-up"
                        />
                      </ClayButton>
                    </ClayManagementToolbar.Item>
                  </ClayManagementToolbar.ItemList>

                  <ClayManagementToolbar.Search showMobile={searchMobile}>
                    <ClayInput.Group>
                      <ClayInput.GroupItem>
                        <ClayInput
                          aria-label="Search"
                          className="form-control input-group-inset input-group-inset-after"
                          type="text"
                          onChange={(e) => {
                            handleSearch(e);
                          }}
                          value={message}
                        />
                        <ClayInput.GroupInsetItem
                          after
                          onClick={(e) => onSearch(e)}
                          tag="span"
                        >
                          <ClayButtonWithIcon
                            className="navbar-breakpoint-d-none"
                            displayType="unstyled"
                            onClick={() => setSearchMobile(false)}
                            spritemap={spritemap}
                            symbol="times"
                          />
                          <ClayButtonWithIcon
                            displayType="unstyled"
                            spritemap={spritemap}
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
                        <ClayIcon spritemap={spritemap} symbol="search" />
                      </ClayButton>
                    </ClayManagementToolbar.Item>

                    <ClayManagementToolbar.Item>
                      <ClayButton
                        className="nav-link nav-link-monospaced"
                        displayType="unstyled"
                        onClick={() => {}}
                      >
                        <ClayIcon
                          spritemap={spritemap}
                          symbol="info-circle-open"
                        />
                      </ClayButton>
                    </ClayManagementToolbar.Item>

                    <ClayManagementToolbar.Item>
                      <ClayDropDownWithItems
                        items={viewTypes}
                        spritemap={spritemap}
                        trigger={
                          <ClayButton
                            className="nav-link-monospaced nav-link"
                            displayType="unstyled"
                          >
                            <ClayIcon
                              spritemap={spritemap}
                              symbol={
                                viewTypeActive ? viewTypeActive.symbolLeft : ""
                              }
                            />
                          </ClayButton>
                        }
                      />
                    </ClayManagementToolbar.Item>

                    <ClayManagementToolbar.Item>
                      <Link to="/add">
                        <ClayButtonWithIcon
                          className="nav-btn nav-btn-monospaced"
                          spritemap={spritemap}
                          symbol="plus"
                        />
                      </Link>
                    </ClayManagementToolbar.Item>
                  </ClayManagementToolbar.ItemList>
                </ClayManagementToolbar>
                {clicksearch && (
                  <ClayResultsBar>
                    <ClayResultsBar.Item>
                      <span className="component-text text-truncate-inline">
                        <span className="text-truncate">
                          {countItem.length}
                          {' results for "'}
                          <strong>{search}</strong>
                          {'"'}
                        </span>
                      </span>
                    </ClayResultsBar.Item>
                    <ClayResultsBar.Item expand>
                      <ClayLabel
                        className="component-label tbar-label"
                        displayType="unstyled"
                        spritemap={spritemap}
                      >
                        {"Filter"}
                      </ClayLabel>
                    </ClayResultsBar.Item>
                    <ClayResultsBar.Item>
                      <ClayButton
                        className="component-link tbar-link"
                        displayType="unstyled"
                        onClick={onClear}
                      >
                        {"Clear"}
                      </ClayButton>
                    </ClayResultsBar.Item>
                  </ClayResultsBar>
                )}
              </div>
            )}
            {itemselect !== 0 && (
              <div>
                <ClayResultsBar>
                  <ClayCheckbox
                    checked={select}
                    onChange={() => {
                      select === false
                        ? CounterSelect("all", true)
                        : CounterSelect("all", false);
                      setSelect((val) => !val);
                    }}
                  />

                  <ClayResultsBar.Item className="pl-3 pr-3" expand>
                    <span className="component-text text-truncate-inline">
                      {itemselect} مورد
                    </span>
                  </ClayResultsBar.Item>

                  <ClayResultsBar.Item>
                    <ClayButton
                      className="component-link tbar-link"
                      displayType="unstyled"
                      onClick={() => deleteItemSelect(contme)}
                    >
                      حذف موارد
                    </ClayButton>
                  </ClayResultsBar.Item>
                </ClayResultsBar>
              </div>
            )}
          </div>
          {countItem.length === 0 ? (
            <ClayEmptyState
              description="هیچ محتوایی یافت نشد "
              imgProps={{ alt: "Empty state", title: "Nothing!!!" }}
              imgSrc={successtate}
              title=""
            />
          ) : (
            <div>
              {viewtable === "Table" && (
                <>
                  <TableWithSelectable
                    passItem={passItem}
                    allselect={select}
                    counter={CounterSelect}
                    countItem={countItem}
                  />
                </>
              )}

              {viewtable === "List" && (
                <>
                  <ListWithSelectable
                    passItem={passItem}
                    allselect={select}
                    counter={CounterSelect}
                    countItem={countItem}
                  />
                </>
              )}
              {viewtable === "Card" && (
                <>
                  <CardWithSelectable
                    passItem={passItem}
                    allselect={select}
                    counter={CounterSelect}
                    countItem={countItem}
                  />
                </>
              )}
              <Pagination showitems={showitems} />
            </div>
          )}
        </div>
      </DataFilterContext.Provider>
    </div>
  );
}

export default TabOne;
