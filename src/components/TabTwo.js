/* eslint-disable array-callback-return */
import { ClaySelect } from "@clayui/form";
import WeekBtn from "./WeekBtn";
import { useEffect, useState } from "react";
import TableWeek from "./TableWeek";
import DataContext from "../context/DataContext";
import React from "react";

function TabTwo(props) {
  // const { data } = props;
  const data = React.useContext(DataContext);
  const [myitems, setMyItems] = useState(data);
  const [select, setSelect] = useState();
  let today;
  useEffect(() => {
    const d = new Date();
    let day = d.getDay() + 1;
    today = day === 7 ? 1 : day + 1;
    selectBtn(today);
  }, []);

  const selectBox = [
    {
      label: "تمام",
      value: "1",
    },
    {
      label: "سینما",
      value: "2",
    },
    {
      label: "صدا",
      value: "3",
    },
  ];
  const selectBtn = (item) => {
    let myarray = [];
    if (item === 1) {
      data.filter((items) => {
        items.day.filter((item) => {
          if (item.day === "شنبه") {
            myarray = [...myarray, items];
          }
        });
      });
    }
    if (item === 2) {
      data.filter((items) => {
        items.day.filter((item) => {
          if (item.day === "یک شنبه") {
            myarray = [...myarray, items];
          }
        });
      });
    }

    if (item === 3) {
      data.filter((items) => {
        items.day.filter((item) => {
          if (item.day === "دوشنبه") {
            myarray = [...myarray, items];
          }
        });
      });
    }

    if (item === 4) {
      data.filter((items) => {
        items.day.filter((item) => {
          if (item.day === "سه شنبه") {
            myarray = [...myarray, items];
          }
        });
      });
    }

    if (item === 5) {
      data.filter((items) => {
        items.day.filter((item) => {
          if (item.day === "چهارشنبه") {
            myarray = [...myarray, items];
          }
        });
      });
    }

    if (item === 6) {
      data.filter((items) => {
        items.day.filter((item) => {
          if (item.day === "پنج شنبه") {
            myarray = [...myarray, items];
          }
        });
      });
    }
    if (item === 7) {
      data.filter((items) => {
        items.day.filter((item) => {
          if (item.day === "جمعه") {
            myarray = [...myarray, items];
          }
        });
      });
    }
    setMyItems(myarray);
    setSelect(myarray);
  };
  const handleClick = (e) => {
    let search = [...select];
    if (e.target.value === "2") {
      setMyItems(search.filter((item) => item.type === 1));
    }
    if (e.target.value === "3") {
      setMyItems(search.filter((item) => item.type === 2));
    }
    if (e.target.value === "1") {
      setMyItems(select);
    }
  };

  return (
    <div className="ml-5 mr-5 mt-2">
      <div className="d-flex align-items-center flex-wrap pl-3 pr-3">
        <div className="m-3">نوع کنداکتور</div>
        <div>
          <ClaySelect
            aria-label="Select Label"
            id="mySelectId"
            onChange={(e) => handleClick(e)}
            className="m-3"
          >
            {selectBox.map((item) => (
              <ClaySelect.Option
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </ClaySelect>
        </div>
      </div>
      <div>
        <WeekBtn selectbtn={selectBtn} />
      </div>
      <div>
        {myitems.map((item) => (
          <TableWeek key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default TabTwo;
