import bcrypt from "bcryptjs/dist/bcrypt";

export const login = (username, password) => {
    const userList = JSON.parse(localStorage.getItem("userList"))
    const userLogin = userList.find(item => item.username === username)
    if(userLogin) {
        localStorage.setItem("userLogin", JSON.stringify(userLogin))
    }
    const correctPass = bcrypt.compareSync(password, userLogin.password);
    if (!userLogin) {
        alert("user is not found")
    } else if (userLogin.username === username && correctPass) {
        return true
    }
    return false
}

export const register = (id, username, password, email, phoneNumber) => {
    if (!localStorage.getItem("userList")) {
        localStorage.setItem("userList", JSON.stringify([]));
    }
    let userList = JSON.parse(localStorage.getItem('userList'));
    const checkUsername = userList.some(item => item.username === username)
    if (!checkUsername) {
        if (userList.length > 0) {
            id = userList[userList.length - 1].id + 1;
        }
        userList.push({ id, username, password, email, phoneNumber })
        localStorage.setItem("userList", JSON.stringify(userList))
    } else {
        alert("tai khoan da ton tai")
        return false
    }
    return true
}