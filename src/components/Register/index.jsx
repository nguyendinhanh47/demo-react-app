import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import bcrypt from 'bcryptjs'
import bcrypt from "bcryptjs/dist/bcrypt";
import "./index.css";
import { register } from "../../LocalStore/auth";

const salt = bcrypt.genSaltSync(10)

export const Register = () => {
  const initialValues = {
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    id: 1,
  };

  const [formLogin, setFormLogin] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      setFormErrors(validate(formLogin));
      if (Object.keys(formErrors).length === 0) {
        const checkRegister = register(formLogin.id, formLogin.username, formLogin.password = bcrypt.hashSync(formLogin.password, salt), formLogin.email, formLogin.phoneNumber)
        if (checkRegister) {
          navigate("/signin");
        }
      }
    } catch (error) {
      
    }

    // // kiem tra object rong
    // if (Object.keys(formErrors).length === 0) {
    //   // tạo ds user
    //   // if (!localStorage.getItem("userList")) {
    //   //   localStorage.setItem("userList", JSON.stringify([]));
    //   // }
    //   // let userList = JSON.parse(localStorage.getItem('userList'));
    //   // // kiểm tra username đã tồn tại chưa ?
    //   // const checkUsername = userList.some(item => item.username === formLogin.username)
    //   // if (!checkUsername) {
    //   //   if (userList.length > 0) {
    //   //     formLogin.id = userList[userList.length - 1].id + 1;
    //   //   }
    //   //   formLogin.password = bcrypt.hashSync(formLogin.password, salt)
    //   //   userList.push(formLogin)
    //   //   localStorage.setItem("userList", JSON.stringify(userList))
    //   //   navigate("/signin")
    //   // } else {
    //   //   alert("Tài khoản đã tồn tại")
    //   // }
    //   register(formLogin)
    // }

  };

  const validate = (values) => {
    const errors = {};
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const phoneNumberRegex = /^[0-9]{10}$/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!values.username) {
      errors.username = "Username is required!";
    } else if (!usernameRegex.test(values.username)) {
      errors.username = "Username is not accept special character!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!"
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email address!"
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone number is required"
    } else if (!phoneNumberRegex.test(values.phoneNumber)) {
      errors.phoneNumber = "Is not a phone number"
    }
    return errors;
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
  const validateEmail = (email) => {
    const errors = {}
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email) {
      errors.email = "Email is required!"
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email address!"
    }
    return errors;
  }
  const validatePhoneNumber = (phoneNumber) => {
    const errors = {}
    const phoneNumberRegex = /^[0-9]{10}$/;
    if (!phoneNumber) {
      errors.phoneNumber = "phoneNumber is required!";
    } else if (!phoneNumberRegex.test(phoneNumber)) {
      errors.phoneNumber = "phoneNumber is not accept special character!";
    }
    return errors;
  }

  // useEffect(() => {
  //   if (Object.keys(formErrors).length === 0 && isRegister) {
  //     navigate("/")
  //   }
  // },[])

  return (
    <div className="body">
      <div className="register">
        <div className="register-form">
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              type="text"
              onChange={(e) => {
                const { name, value } = e.target;
                setFormLogin({ ...formLogin, [name]: value });
                setFormErrors(validateUsername(value));
              }}
              value={formLogin.username}
              name="username"
            />
            <p className="error">{formErrors.username}</p>

            <input
              placeholder="Password"
              type="password"
              onChange={(e) => {
                const { name, value } = e.target;
                setFormLogin({ ...formLogin, [name]: value });
                setFormErrors(validatePassword(value));
              }}
              value={formLogin.password}
              name="password"
            />
            <p className="error">{formErrors.password}</p>
            <input
              placeholder="Email"
              type="text"
              onChange={(e) => {
                const { name, value } = e.target;
                setFormLogin({ ...formLogin, [name]: value });
                setFormErrors(validateEmail(value));
              }}
              value={formLogin.email}
              name="email"

            />
            <p className="error">{formErrors.email}</p>
            <input
              placeholder="Phone Number"
              type="text"
              onChange={(e) => {
                const { name, value } = e.target;
                setFormLogin({ ...formLogin, [name]: value });
                setFormErrors(validatePhoneNumber(value));
              }}
              value={formLogin.phoneNumber}
              name="phoneNumber"
            />
            <p className="error">{formErrors.phoneNumber}</p>
            <div className="btn-register">
              <button type="submit">Register

              </button>
            </div>
          </form>
          <div className="register-bottom">
            <p>
              Registered?{" "}
              <Link className="signin-link" to="/signin">
                Login now
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
