import { Outlet } from "react-router-dom";

import AppNav from "./AppNav";
import Logo from "./Logo";
import Footer from "./Footer";
import styles from "./Sidebar.module.css";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <Footer />
    </div>
  );
}

export default SideBar;
