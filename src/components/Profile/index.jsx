import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutPage from "../../HOC/Layout";
import { createAction } from "../../stores/actions";
import { actionType } from "../../stores/actions/type";
import "./index.css";

export const Profile = () => {

  const dispatch = useDispatch();
  

  // const userList = JSON.parse(localStorage.getItem("userList"));

  const { userList ,isEdit, selectedId } = useSelector(state => state.auth);

  const handleEditProfile = (id) => {
    dispatch(createAction(actionType.EDIT_PROFILE, id))
  }
  const handleChangProfile = (e, field) => {
    dispatch(createAction(actionType.CHANGE_PROFILE, { value: e.target.value, field }))
  }
  const handleDeleteProfile = (id) => {
    dispatch(createAction(actionType.DELETE_PROFILE, id))
  }
  const handleAddprofile = () => {  
    dispatch(createAction(actionType.ADD_PROFILE))
  }
  
  useEffect(() => {
    dispatch(createAction(actionType.SET_LOGIN))
    dispatch(createAction(actionType.GET_USER));
  },[dispatch]);
  return (
    <LayoutPage>
      <div>
        <button onClick={handleAddprofile} className="add_profile">Add profile</button>
        <div>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Password</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      { item.username }
                    </td>
                    <td>
                      {isEdit && item.id === selectedId ? (<input className={isEdit ? "item_input show" : "item_input"} onChange={(event) => handleChangProfile(event, 'password')} defaultValue={item.password} type="password" />) : ( item.password.slice(30,40) )}
                    </td>
                    <td>
                      {isEdit && item.id === selectedId ? (<input className={isEdit ? "item_input show" : "item_input"} onChange={(event) => handleChangProfile(event, 'email')} defaultValue={item.email} type="email" />) : ( item.email )}
                    </td>
                    <td>
                      {isEdit && item.id === selectedId ? (<input className={isEdit ? "item_input show" : "item_input"} onChange={(event) => handleChangProfile(event, 'phoneNumber')} defaultValue={item.phoneNumber} type="text" />) : ( item.phoneNumber )}
                    </td>
                    <td className="btn_change_profile">
                      <button onClick={() => handleEditProfile(item.id)} className="btn_edit">Edit</button>
                      <button onClick={() => handleDeleteProfile(item.id)} className="btn_remove">Remove</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </LayoutPage>
  );
};
