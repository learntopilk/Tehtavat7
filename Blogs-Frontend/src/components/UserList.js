import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'


const UserList = (props) => {

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
            <tr key={JSON.stringify(u.name)}>
              <td><LinkContainer to={`users/${u.id}`}><a href="#">{u.name}  </a></LinkContainer></td>
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

const connectedUserList = connect(mapStateToProps)(UserList)
export default connectedUserList