import React, { useState, useEffect } from "react";
import ClayButton from "@clayui/button";

function WeekBtn(props) {
  const [button, setButton] = useState(1);
  useEffect(() => {
    const d = new Date();
    let day = d.getDay() + 1;
    activeBtn(day === 7 ? 1 : day + 1);
    clickBtn(day === 7 ? 1 : day + 1);
  }, []);
  const week = [
    { id: 1, day: "شنبه" },
    { id: 2, day: "یک شنبه" },
    { id: 3, day: "دوشنبه" },
    { id: 4, day: "سه شنبه" },
    { id: 5, day: "چهارشنبه" },
    { id: 6, day: "پنج شنبه" },
    { id: 7, day: "جمعه" },
  ];
  const activeBtn = (item) => {
    if (item === button) {
      return "active";
    }
  };
  const clickBtn = (item) => {
    setButton(item);
    props.selectbtn(item);
  };
  return (
    <div
      className="d-flex align-items-center flex-wrap p-3 
    "
    >
      {week.map((item) => (
        <div
          className="m-1"
          key={item.id}
          onClick={() => {
            clickBtn(item.id);
          }}
          id={activeBtn(item.id)}
        >
          <ClayButton displayType="secondary">{item.day}</ClayButton>
        </div>
      ))}
    </div>
  );
}

export default WeekBtn;
