import { Outlet } from "react-router-dom"

const AuthRoutes = () => {
  console.log("auth chaal")
  return (
    <div><Outlet/></div>
  )
}

export default AuthRoutes