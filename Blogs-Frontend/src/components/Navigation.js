import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = ({ user }) => {
    if (user) {
        return (
            <div>
                <Link to="/">Home</Link> &nbsp;
                <Link to="/users">Users</Link> &nbsp;
                <span><em>{(user.username || "User not")} logged in</em></span> &nbsp;
            </div>
        )
    } else {
        return (
            <div>
                <Link to="/">Home</Link> &nbsp;
                <Link to="/users">Users</Link> &nbsp;
                <span><em>Not logged in</em></span> &nbsp;
            </div>
        )
    }
}

export default Navigation