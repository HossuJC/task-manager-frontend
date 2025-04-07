import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Chart from "./pages/Chart";
import ProtectedRoute from "./routes/ProtectedRoute";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chart" element={<Chart />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
