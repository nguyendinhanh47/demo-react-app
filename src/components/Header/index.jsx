import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createAction } from '../../stores/actions'
import { actionType } from '../../stores/actions/type'
import "./index.css"

export const Header = () => {

    const {userLogin} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(createAction(actionType.LOG_OUT))
        navigate("/signin")
    }
    useEffect(() => {
        dispatch(createAction(actionType.SET_LOGIN))
    },[dispatch])

    return (
        <div className='header'>
            <div className="profile">
                {userLogin ?
                    (<div className='profile_user'>
                        <div className='profile_name'>
                            Hello, {userLogin.username}
                        </div>
                        <div className='profile_image'>
                            <img src="https://picsum.photos/40/40" alt="" />
                        </div>
                        <div>
                            <button onClick={handleLogout} className='btn_logout'>Log out</button>
                        </div>
                    </div>) :
                    (<div>
                        <Link to="/signin" className='btn-header'>
                            Sign in
                        </Link>
                        <Link to="/register" className='btn-header'>
                            Register
                        </Link>
                    </div>)}
            </div>
        </div>
    )
}
