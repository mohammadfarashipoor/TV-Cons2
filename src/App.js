import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tabs from "./pages/Tabs";
import DetailItem from "./pages/DetailItem";
import EditItem from "./pages/EditItem";
import { useState } from "react";
function App() {
  const [itemselected, setItemSelected] = useState();
  const [alertshow, setAlertShow] = useState(null);
  const passItem = (item) => {
    setItemSelected(item);
  };

  const passAlert = (bol) => {
    setAlertShow(bol);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Tabs passItem={passItem} alertshow={alertshow} />}
          />
          <Route path="add" element={<DetailItem passAlert={passAlert} />} />
          <Route
            path="/edit"
            element={
              <EditItem itemselected={itemselected} passAlert={passAlert} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
