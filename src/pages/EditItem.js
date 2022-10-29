/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { ClayRadio, ClayRadioGroup } from "@clayui/form";
import ClayForm, { ClayInput } from "@clayui/form";
import { Link } from "react-router-dom";
import ClayLoadingIndicator from "@clayui/loading-indicator";
import axios from "axios";
import { ClayCheckbox } from "@clayui/form";
import ClayButton from "@clayui/button";
import OutsideClickHandler from "../components/OutsideClickHandler";
import Table from "../components/Table";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import ClayTimePicker from "@clayui/time-picker";
import Gallery1 from "../components/Gallery1.png";
const spritemap = "../components/icons.svg";

const MyCheckBox = (props) => {
  const [value, setValue] = useState(props.boolean);
  const handelClick = () => {
    setValue((val) => !val);
    props.onClick(props.item, value);
  };
  return (
    <ClayCheckbox
      aria-label={props.options}
      checked={value}
      onChange={() => handelClick()}
      label={props.options}
    />
  );
};

const EditItem = (props) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(false);
  const [data, setData] = useState([
    {
      title: "تمام",
      value: "1",
    },
    {
      title: "Option 2",
      value: "2",
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [myname, setMyName] = useState();
  const [special, setSpecial] = useState(false);
  const [explain, setExplain] = useState();
  const [checked, setChecked] = useState([]);
  const [enable, setEnable] = useState(false);
  const [radio, setRadio] = useState();
  const [inputText, setInputText] = useState("");
  const [bolcheckboxradio, setBolCheckboxRadio] = useState(1);
  const [bolcheckboxspecial, setBolCheckboxSpecial] = useState(false);
  const [bolcheckboxenable, setBolCheckboxEnable] = useState(false);
  const [bolcheckboxmyweek, setBolCheckboxMyWeek] = useState(false);
  const [valueInput, setValueInput] = useState(
    bolcheckboxradio === 1 ? "سیما" : "صدا"
  );
  const [time, setTime] = useState({
    hours: "--",
    minutes: "--",
  });
  const mynavigate = useNavigate();
  const passAlert = (bol) => {
    props.passAlert(bol);
  };
  async function fetchData() {
    try {
      const result = await axios.get(
        "https://6242dd49b6734894c157e955.mockapi.io/date/d1/project1"
      );
      setData(result.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
  async function setMydata(data) {
    try {
      await axios
        .put(
          `https://6242dd49b6734894c157e955.mockapi.io/date/d1/project1/${props.itemselected.id}`,
          data
        )
        .then((response) => passAlert(true));
    } catch (error) {
      passAlert(false);
    }
  }
  useEffect(() => {
    setDataItem(props.itemselected);
    fetchData();
  }, []);
  const setDataItem = (item) => {
    if (item === undefined) {
      mynavigate("/");
    } else {
      selectName(item.name);
      setExplainItem(item.explain);
      setBolCheckboxSpecial(item.special);
      setBolCheckboxEnable(item.status);
      setBolCheckboxMyWeek(item.day);
      setTime(item.time);
      setBolCheckboxRadio(item.type);
    }
  };
  const bolcheckboxweek = (id) => {
    let daily = [];
    bolcheckboxmyweek.map((item) => {
      daily.push(item.id);
    });
    if (id === 1 && daily.indexOf(1) !== -1) {
      return true;
    }
    if (id === 2 && daily.indexOf(2) !== -1) {
      return true;
    }
    if (id === 3 && daily.indexOf(3) !== -1) {
      return true;
    }
    if (id === 4 && daily.indexOf(4) !== -1) {
      return true;
    }
    if (id === 5 && daily.indexOf(5) !== -1) {
      return true;
    }
    if (id === 6 && daily.indexOf(6) !== -1) {
      return true;
    }
    if (id === 7 && daily.indexOf(7) !== -1) {
      return true;
    } else {
      return false;
    }
  };
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "نام را وارد کنید";
    } else if (values.name.length > 15) {
      errors.name = "نام وارد شده بیشتر از 15 حرف است";
    }
    return errors;
  };
  const myData = () => {
    let newItem = {
      name: myname,
      time: time,
      day: checked,
      type: radio,
      explain: explain,
      status: enable,
      special: special,
    };
    if (formik.values.name !== "") {
      setMydata(newItem);
      navigate("/");
    }
  };
  const setMyRadio = (item) => {
    setValueInput(item);
    setRadio(item);
  };

  const setDay = (item, value) => {
    let updateList = [...checked];
    if (value) {
      for (var i = 0; i < updateList.length; i++) {
        if (updateList[i].id === item.id) {
          updateList.splice(i, 1);
        }
      }
    } else {
      updateList = [...checked, item];
    }
    setChecked(updateList);
  };

  const handleExplain = (e) => {
    setExplain(e.target.value);
  };
  const onchange = (e) => {
    setMyName(e.target.value);
    formik.values.name = e.target.value;
    setSearch(e.target.value);
    setInputText(e.target.value);
  };
  const onchangeExplain = (e) => {
    setExplain(e.target.value);
  };
  const filtereduser = data.filter((item) => {
    if (item.name !== undefined) {
      return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    }
  });

  const insideClickHandler = () => {
    setShowList(true);
  };
  const outsideClickHandler = () => {
    setShowList(false);
  };

  const week = [
    { id: 1, day: "شنبه" },
    { id: 2, day: "یک شنبه" },
    { id: 3, day: "دوشنبه" },
    { id: 4, day: "سه شنبه" },
    { id: 5, day: "چهارشنبه" },
    { id: 6, day: "پنج شنبه" },
    { id: 7, day: "جمعه" },
  ];
  const ComponentLoading = () => {
    return (
      <div className="loading">
        <ClayLoadingIndicator small />
      </div>
    );
  };
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validate,
    onSubmit: (values) => {
      return;
    },
  });
  const selectName = (name) => {
    setInputText(name);
  };
  const setExplainItem = (text) => {
    setExplain(text);
  };

  return (
    <>
      {isLoading ? (
        ComponentLoading()
      ) : (
        <div className="p-4 ">
          <form onSubmit={formik.handleSubmit}>
            <div className="d-flex col-lg-12 flex-wrap">
              <div className="w-100 p-0 col-9">
                <div className="d-flex flex-wrap ">
                  <div className="col-lg-4 col-xl-3">
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        outsideClickHandler();
                      }}
                    >
                      <ClayForm.Group className="mb-1">
                        <label htmlFor="basicInputText">نام</label>
                        <ClayInput
                          id="basicInputText"
                          placeholder={null}
                          type="text"
                          onClick={insideClickHandler}
                          onChange={formik.handleChange}
                          value={inputText}
                          onInput={onchange}
                        />
                      </ClayForm.Group>
                      {formik.errors.name ? (
                        <div className="text-danger m-1">
                          * {formik.errors.name}
                        </div>
                      ) : null}
                      {showList &&
                        (data !== [] ? (
                          <div className="w-100 listshow bg-white">
                            {filtereduser.map((item) => (
                              <div
                                onClick={() => {
                                  selectName(item.name);
                                }}
                                className="w-100"
                                key={item.id}
                              >
                                <Table title={item.name} />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="bg-white p-2">
                            <div>هیچ برنامه ای وجود ندارد</div>
                          </div>
                        ))}
                    </OutsideClickHandler>
                  </div>
                  <div className="col-lg-4 col-xl-3">
                    <label htmlFor="basicInputText">زمان پخش</label>
                    <ClayTimePicker
                      onChange={setTime}
                      spritemap={spritemap}
                      timezone="GMT+04:30"
                      use24Hours
                      value={time}
                    />
                  </div>
                  <div className="d-flex flex-wrap col-lg-4 col-xl-3 mt-auto mb-auto">
                    <div>نوع برنامه</div>
                    <div>
                      <ClayRadioGroup
                        inline
                        onSelectedValueChange={(valueInput) =>
                          setMyRadio(valueInput)
                        }
                        selectedValue={valueInput}
                        className="mr-2 Radiogroup"
                      >
                        <ClayRadio label="سیما" value="سیما" />
                        <ClayRadio label="صدا" value="صدا" />
                      </ClayRadioGroup>
                    </div>
                  </div>
                  <div className="col-lg-4 col-xl-3">
                    <ClayForm.Group>
                      <label htmlFor="basicInputText">توضیح</label>
                      <ClayInput
                        id="basicInputText"
                        placeholder={null}
                        type="text"
                        component={"textarea"}
                        onChange={handleExplain}
                        onInput={onchangeExplain}
                        value={explain}
                      />
                    </ClayForm.Group>
                  </div>
                  <div className="col-lg-4 col-xl-3">
                    <div className="d-flex">
                      <MyCheckBox
                        boolean={bolcheckboxenable}
                        onClick={() => setEnable(!enable)}
                        options={"فعال"}
                      />
                    </div>
                    <div>
                      <p className="font-weight-light">
                        این گزینه جهت نمایش و پخش در جدول پخش کاربرد دارد و
                        برنامه هایی نمایش داده می شود که این گزینه انتخاب شده
                        باشد
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-xl-3">
                    <div className="d-flex">
                      <MyCheckBox
                        boolean={bolcheckboxspecial}
                        options={"برنامه ویژه"}
                        onClick={() => {
                          setSpecial(!special);
                        }}
                      />
                    </div>
                    <div>
                      <p className="font-weight-light">
                        این گزینه صرفا جهت نوع نمایش متن و عکس در برتلت " نمایش
                        جدول پخش" کاربرد دارد و در این نمایش ، فقط برنامه هایی
                        نمایش داده می شود که این گزینه انتخاب شده باشد
                      </p>
                    </div>
                  </div>
                </div>

                <div className="d-flex pr-5 pt-3">
                  <div className="mb-2">روز های پخش:</div>
                  <div className="d-flex mr-2">
                    {week.map((item) => (
                      <div className="d-flex m-1" key={item.id}>
                        <MyCheckBox
                          boolean={() => bolcheckboxweek(item.id)}
                          item={item}
                          onClick={setDay}
                          options={item.day}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div>
                  <div className="mb-3">
                    <label htmlFor="formFileMultiple" className="form-label">
                      تصویر شاخص
                    </label>
                    <img src={Gallery1} alt="Gallery" />
                    <input
                      className="form-control p-1 cursor-pointer"
                      type="file"
                      id="formFileMultiple"
                      multiple
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-wrap mt-5">
              <div className="mr-2 ml-2">
                <Link to="/">
                  <ClayButton
                    displayType="secondary"
                    onClick={() => {
                      passAlert(null);
                    }}
                  >
                    انصراف
                  </ClayButton>
                </Link>
              </div>
              <div>
                <ClayButton
                  submit="submit"
                  type="primary"
                  displayType={props.type}
                  onClick={myData}
                >
                  ذخیره
                </ClayButton>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditItem;
