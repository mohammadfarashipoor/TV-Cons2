/* eslint-disable react-hooks/exhaustive-deps */
import ClayTable from "@clayui/table";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import _ from "lodash";
import DataFilterContext from "../context/DataFilterContext";
import React from "react";
import ClayLoadingIndicator from "@clayui/loading-indicator";
import { useNavigate } from "react-router-dom";
import {WithNonWrappedCells} from "./WithNonWrappedCells";
const MyTable = (props) => {
  // const { data } = props;
  const [myactivepage, setMyActivePage] = useState(1);
  const [mydelta, setMyDelta] = useState(20);
  const showitems = (activePage, delta) => {
    setMyActivePage(activePage);
    setMyDelta(delta);
  };
  const data = React.useContext(DataFilterContext);
  const [countItem, setCountItem] = useState(data);

  const navigate = useNavigate();
  useEffect(() => {
    const startIndex = (myactivepage - 1) * mydelta;
    setCountItem(_(data).slice(startIndex).take(mydelta).value());
  }, [mydelta, myactivepage, data]);

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
    props.passItem(item);
    navigate("/edit");
  };

  return (
    <>
      <ClayTable className="mytable">
        <ClayTable.Head>
          <ClayTable.Row>
            <ClayTable.Cell expanded headingCell>
              {"نام برنامه"}
            </ClayTable.Cell>
            <ClayTable.Cell headingCell>{"روز"}</ClayTable.Cell>
            <ClayTable.Cell headingCell>{"زمان پخش"}</ClayTable.Cell>
            <ClayTable.Cell headingCell>{"لینک"}</ClayTable.Cell>
            <ClayTable.Cell headingCell>{"نوع برنامه"}</ClayTable.Cell>
            <ClayTable.Cell headingCell>{"وضعیت"}</ClayTable.Cell>
            <ClayTable.Cell headingCell>{"پخش"}</ClayTable.Cell>
          </ClayTable.Row>
        </ClayTable.Head>
        <ClayTable.Body>
          {countItem === undefined ? (
            <ComponentLoading />
          ) : (
            Object.values(countItem).map((item) => (
              <ClayTable.Row
                key={item.id}
                onClick={() => {
                  passItem(item);
                }}
              >
                <ClayTable.Cell headingTitle>{item.name}</ClayTable.Cell>
                <ClayTable.Cell>
                  {item.day.map((itm) => (
                    <span key={itm.id}>{itm.day} </span>
                  ))}
                </ClayTable.Cell>
                <ClayTable.Cell>
                  {item.time.hours}:{item.time.minutes}
                </ClayTable.Cell>
                <ClayTable.Cell>{"Brazil"}</ClayTable.Cell>
                <ClayTable.Cell>
                  {item.type === 1 ? "سیما" : "صدا"}
                </ClayTable.Cell>
                <ClayTable.Cell>
                  {item.status ? "فعال" : "غیرفعال"}
                </ClayTable.Cell>
                <ClayTable.Cell>{"Brazil"}</ClayTable.Cell>
              </ClayTable.Row>
            ))
          )}
        </ClayTable.Body>
      </ClayTable>
      <Pagination showitems={showitems} />
      <br/>
      <WithNonWrappedCells/>
    </>
  );
};

export default MyTable;
