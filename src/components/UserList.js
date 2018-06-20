import React from 'react'
import userService from '../services/users'
import { connect } from 'react-redux'


const UserList = (props) => {

    console.log('props at userlist: ', props)
    return (
        <table>
            <thead>
                <tr>
                    <th><strong>user</strong></th>
                    <th><strong>blogs</strong></th>
                </tr>
            </thead>
            <tbody>

                {props.users.map(u => {
                    return (
                        <tr key={JSON.stringify(u)}>
                            <td>{u.name}      </td>
                            <td>{u.blogs.length}      </td>
                        </tr>
                    )
                })
                }
            </tbody>
        </table>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

//const mapDispatchToProps = null
const connectedUserList = connect(mapStateToProps)(UserList)
export default connectedUserList