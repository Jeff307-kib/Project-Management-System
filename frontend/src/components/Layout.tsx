import { Outlet } from "react-router-dom";
import Header from "./Header";
import TopBar from "@/features/workspaces/TopBar";
const Layout = () => {
  return (
    <>
      <Header />
      <TopBar />
      <Outlet />
    </>
    
  );
};

export default Layout;
