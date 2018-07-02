import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'


class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      buttonText : props.buttonText
    }
  }

    toggleVisibility = () => {
      this.setState({ visible: !this.state.visible })
    }

    render() {

      const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
      const showWhenVisible = { display: this.state.visible ? '' : 'none' }

      return (
        < div >
          <div style={hideWhenVisible}><Button onClick={this.toggleVisibility}>{this.state.buttonText}</Button></div>
          <div style={showWhenVisible} className='togglableContent'>
            {this.props.children}
            <Button onClick={this.toggleVisibility}>cancel</Button>
          </div>
        </div >
      )
    }
}

Togglable.propTypes = {
  buttonText: PropTypes.string.isRequired
}

export default Togglable