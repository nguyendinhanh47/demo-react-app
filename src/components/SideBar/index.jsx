import React from 'react'
import { Link } from 'react-router-dom'
import "./index.css"

export const Sidebar = () => {
    return (
        <div>
            {/* <div className="sidebar_title">
                Menu
            </div> */}
            <div className='sidebar_profile'>
                <ul>
                    <div className="sidebar_title">
                        Menu
                    </div>
                    <div className='sidebar_option'>
                        <li><Link className='profile' to="/profile">Profile</Link></li>
                        <li><Link className='profile' to="/products">Products</Link></li>
                        <li>About</li>
                    </div>
                </ul>
            </div>
        </div>
    )
}
