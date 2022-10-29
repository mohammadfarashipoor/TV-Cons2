import { ClayPaginationBarWithBasicItems } from "@clayui/pagination-bar";
import { useState, useEffect } from "react";
import DataFilterContext from "../context/DataFilterContext";
import React from "react";
//const spritemap = "./icons.svg";
import spritemap from "./icons.svg";

const Pagination = (props) => {
  const [activePage, setActivePage] = useState(1);
  const [delta, setDelta] = useState(20);
  const data = React.useContext(DataFilterContext);

  const deltas = [
    {
      label: 20,
    },
    {
      label: 40,
    },
    {
      label: 60,
    },
    {
      label: 80,
    },
  ];
  const handlechange = () => {
    props.showitems(activePage, delta);
  };
  useEffect(() => {
    handlechange();
  }, [delta, activePage, data]);
  return (
    <>
      <ClayPaginationBarWithBasicItems
        activeDelta={delta}
        activePage={activePage}
        deltas={deltas}
        ellipsisBuffer={3}
        onDeltaChange={setDelta}
        onPageChange={setActivePage}
        spritemap={spritemap}
        totalItems={data.length}
        className="pagination"
      />
    </>
  );
};
export default Pagination;
