import "./App.css";
import { Route, Routes } from "react-router-dom";

import User from "./components/User";
import Login from "./components/Login";
import Admin from "./components/Admin";
import AuthRoutes from "./routes/auth.routes";
import UserRoutes from "./routes/privateRoutes/user.privateRoutes";
import AdminRoutes from "./routes/privateRoutes/admin.routes";

function App() {

  return (
    <>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<UserRoutes />}>
          <Route path="/user" element={<User />} />
        </Route>
        <Route element={<AdminRoutes/>}>
          <Route path="/" element={<Admin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
