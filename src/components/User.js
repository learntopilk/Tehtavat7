import React from 'react'
//import userService from '../services/users'
//import { connect } from 'react-redux'

const User = ({ user }, props) => {
    return (
        <div>
            <h4>USER VIEW</h4>
            <h4>{user.name}</h4>

            <h5>Blogs added</h5>
                <ul>
                    {user.blogs.map(b => { return(<li key={ Date.now.toString().concat(b.title) }>{ b.title }</li>) })}
                    </ul>

        </div>
    )
}

/*
const mapStateToProps = (state) =>{
    return {users: state.users}
}*/

//const connectedUser = connect({})(User)
export default User