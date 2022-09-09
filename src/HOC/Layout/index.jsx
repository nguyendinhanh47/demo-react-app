import React from "react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar";
import "./index.css";

const LayoutPage = (props) => {
  return (
    <div className="container-fluid h-100">
      <div >
        <div >
          <Header />
        </div>
        <div className="content">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="children">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default LayoutPage;
