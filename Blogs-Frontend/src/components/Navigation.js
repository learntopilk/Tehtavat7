import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavItem, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Navigation = ({ user }) => {
    if (user) {
        return (
            <Navbar>
                <Navbar.Brand>
                    Blog Service
                </Navbar.Brand>
                <Navbar.Collapse>
                <Nav>
                    <LinkContainer to="/">
                        <NavItem href="#">Home</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/users">
                        <NavItem href="#">
                            Users
                        </NavItem>
                    </LinkContainer>
                    <NavItem>
                        <span><em>{(user.username || 'User not')} logged in</em></span> &nbsp;
                    </NavItem>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    } else {
        return (
            <Navbar>
                <Navbar.Brand>
                    Blog Service
                </Navbar.Brand>
                <Navbar.Collapse>
                <Nav>
                    <LinkContainer to="/">
                    <NavItem href="#"> 
                        Home
          </NavItem>
          </LinkContainer> &nbsp;
          <LinkContainer to="/users">
                    <NavItem href="#">Users</NavItem>
          </LinkContainer> &nbsp;
          
                    <NavItem>
                        <span><em>Not logged in</em></span> &nbsp;
          </NavItem>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Navigation