import bcrypt from "bcryptjs/dist/bcrypt";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../LocalStore/auth";

import { createAction } from "../../stores/actions";
import { actionType } from "../../stores/actions/type";
import "./index.css"

export const Signin = () => {
  const initialValues = { username: "", password: "" };
  const [formLogin, setFormLogin] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  let navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      validate(formLogin);
      const checkLogin = login(formLogin.username, formLogin.password);
      if (checkLogin) {
        dispatch(createAction(actionType.SET_LOGIN))
        navigate("/");
      }
    } catch (errors) {
      // server error handler

      // local message handler
      if (errors.isLocal) {
        setFormErrors(errors);
      } else {

      }
    }

    // const userList = JSON.parse(localStorage.getItem("userList"))
    // const userLogin = userList.find(item => item.username === formLogin.username);
    // const hashPassword = bcrypt.compareSync(formLogin.password, userLogin.password);
    // console.log(hashPassword);
    // if (Object.keys(formErrors).length === 0) {
    //   if (formLogin.username === userLogin.username && hashPassword) {
    //     dispatch(createAction(actionType.SET_LOGIN))
    //     navigate("/");
    //   } else {
    //     alert("Sai tên đăng nhập hoặc mật khẩu")
    //   }
    // } 
  }

  const validate = (values) => {
    const errors = {};
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!values.username) {
      errors.username = "Username is required!";
    } else if (!usernameRegex.test(values.username)) {
      errors.username = "Username is not accept special character!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    }
    if (Object.keys(errors).length > 0) {
      errors.isLocal = true;
      throw (errors);
    }
    return null;
  };
  const validateUsername = (username) => {
    const errors = {}
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!username) {
      errors.username = "Username is required!";
    } else if (!usernameRegex.test(username)) {
      errors.username = "Username is not accept special character!";
    }
    return errors;
  }
  const validatePassword = (password) => {
    const errors = {}
    if (!password) {
      errors.password = "Password is required!";
    }
    return errors;
  }

  return (
    <div className="body">

      <div className="signin">
        <div className="signin-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => {
                const { name, value } = e.target;
                setFormLogin({ ...formLogin, [name]: value });
                setFormErrors(validateUsername(value));
              }}
              value={formLogin.username}
              name="username"
              placeholder="Username"
            />
            <p className="error">{formErrors.username}</p>

            <input
              type="password"
              onChange={(e) => {
                const { name, value } = e.target;
                setFormLogin({ ...formLogin, [name]: value });
                setFormErrors(validatePassword(value));
              }}
              value={formLogin.password}
              name="password"
              placeholder="Password"
            />
            <p className="error">{formErrors.password}</p>

            <div className="button-signin">
              <button type="submit">Sign in</button>
            </div>
          </form>
          <div className="signin-bottom">
            <p>
              Not registered?{" "}
              <Link className="register-link" to="/register">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
