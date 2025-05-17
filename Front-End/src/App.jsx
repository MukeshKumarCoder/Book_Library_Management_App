import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";
import MyBook from "./Pages/MyBook";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/mybooks"
          element={
            <PrivateRoute>
              <MyBook />{" "}
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
