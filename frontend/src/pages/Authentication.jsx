import { Navigate, Outlet } from "react-router-dom";

function Authentication() {

    const role = localStorage.getItem("role");

  // console.log(token);
  console.log(role);

  if (role === "student") {
    console.log("hi")
    return <Navigate to="/student-dashboard" />
  }

    return (
        <Outlet />
    );
}

export default Authentication;