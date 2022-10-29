import { useState, useEffect } from "react";
import TabOne from "../components/TabOne";
import axios from "axios";
import ClayLoadingIndicator from "@clayui/loading-indicator";
import ClayTabs from "@clayui/tabs";
import TabTwo from "../components/TabTwo";
import Alert from "../components/Alert";
import DataContext from "../context/DataContext";

const Tabs = (props) => {
  const [activeTabKeyValue, setActiveTabKeyValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [getdata, setGetData] = useState();
  const fetchData = async () => {
    try {
      await axios
        .get("https://6242dd49b6734894c157e955.mockapi.io/date/d1/project1")
        .then((response) => {
          setGetData(response.data);
        });

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ComponentLoading = () => {
    return (
      <div className="loading">
        <ClayLoadingIndicator small />
      </div>
    );
  };
  const passItem = (item) => {
    props.passItem(item);
  };

  return (
    <>
      {isLoading ? (
        ComponentLoading()
      ) : (
        <DataContext.Provider value={getdata}>
          <div className="m-4">
            <ClayTabs modern>
              <ClayTabs.Item
                active={activeTabKeyValue === 0}
                innerProps={{
                  "aria-controls": "tabpanel-1"
                }}
                onClick={() => setActiveTabKeyValue(0)}
              >
                {"مدیریت برنامه"}
              </ClayTabs.Item>
              <ClayTabs.Item
                active={activeTabKeyValue === 1}
                innerProps={{
                  "aria-controls": "tabpanel-2"
                }}
                onClick={() => setActiveTabKeyValue(1)}
              >
                {"جدول پخش هفتگی"}
              </ClayTabs.Item>
            </ClayTabs>
            <ClayTabs.Content activeIndex={activeTabKeyValue} fade>
              <ClayTabs.TabPane aria-labelledby="tab-1">
                <TabOne passItem={passItem}  />
              </ClayTabs.TabPane>
              <ClayTabs.TabPane aria-labelledby="tab-2">
                <TabTwo />
              </ClayTabs.TabPane>
            </ClayTabs.Content>
            {props.alertshow ? (
              <Alert
                type="success"
                title="موفقیت : "
                text="اطلاعات با موفقیت ثبت شد"
              />
            ) : null}
            {props.alertshow === false ? (
              <Alert
                type="danger"
                title="مشکل  : "
                text="اطلاعات با مشکل مواجه شد"
              />
            ) : null}
          </div>
        </DataContext.Provider>
      )}
    </>
  );
};

export default Tabs;
