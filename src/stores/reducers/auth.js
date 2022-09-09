import { actionType } from "../actions/type"
import bcrypt from "bcryptjs/dist/bcrypt";

const salt = bcrypt.genSaltSync(10)

const initialState = {
    userList: [],
    isLogin: false,
    isEdit: false,
    selectedId: null,
    userLogin: {}
}


const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionType.GET_USER: {
            return {
                ...state,
                userList: JSON.parse(localStorage.getItem("userList"))
            }
        }
        case actionType.SET_LOGIN: {
            localStorage.setItem("isLogin", true)
            const userLogin = JSON.parse(localStorage.getItem("userLogin"))
            return {
                ...state,
                isLogin: true,
                userLogin: userLogin
            }
        }
        case actionType.LOG_OUT: {
            localStorage.removeItem("isLogin")
            localStorage.removeItem("userLogin")
            return { ...state, isLogin: false }
        }
        case actionType.EDIT_PROFILE: {
            const cloneUserList = [...state.userList];
            const usernameEdit = cloneUserList.find(item => item.id === payload);
            if (usernameEdit && !state.isEdit) {
                state.isEdit = true;
                state.selectedId = usernameEdit.id;
            } else if (state.isEdit) {
                state.isEdit = false;
                state.selectedId = null;
                localStorage.setItem("userList", JSON.stringify(cloneUserList))
            }
            return { ...state }
        }
        case actionType.CHANGE_PROFILE: {

            const newUserList = state.userList.map((profile) => {

                if (profile.id === state.selectedId) {
                    const cloneProfile = { ...profile }
                    switch (payload.field) {
                        case 'username':
                            cloneProfile.username = payload.value
                            break;
                        case 'password':
                            cloneProfile.password = payload.value
                            break;
                        case 'email':
                            cloneProfile.email = payload.value
                            break;
                        case 'phoneNumber':
                            cloneProfile.phoneNumber = payload.value
                            break;
                        default: return cloneProfile
                    }
                    return cloneProfile
                }
                return profile
            })
            return { ...state, userList: newUserList }
        }
        case actionType.DELETE_PROFILE: {
            const newUserList = state.userList.filter((profile) => profile.id !== payload)
            localStorage.setItem("userList", JSON.stringify(newUserList));
            return { ...state, userList: newUserList }
        }
        case actionType.ADD_PROFILE: {
            const id = state.userList[state.userList.length - 1].id + 1
            const username = `newprofile${id}`;
            const password = "123456"
            const hashPassword = bcrypt.hashSync(password, salt)
            const email = `newprofile${id}@gmail.com`
            const phoneNumber = "0454561421"
            state.userList.push({ id, username, password: hashPassword, email, phoneNumber })
            localStorage.setItem("userList", JSON.stringify(state.userList));
            return { ...state }
        }
        default: return { ...state }
    }
}
export default reducer