import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Header } from "../../components/Header";
import { Profile } from "../../components/Profile";
import App, { Sidebar } from "../../components/SideBar";
import LayoutPage from "../../HOC/Layout";
import { createAction } from "../../stores/actions";
import { actionType } from "../../stores/actions/type";
import "./index.css";

export const Home = () => {
  const dispatch = useDispatch();

  const userList = JSON.parse(localStorage.getItem("userList"));

  useEffect(() => {
    dispatch(createAction(actionType.GET_USER, userList));
  }, [userList]);

  return (
    // <div>
    //   <Header userList={userList} />
    // <Sidebar />
    // </div>
    <LayoutPage></LayoutPage>
  );
};
