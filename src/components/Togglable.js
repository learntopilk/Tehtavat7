import React from 'react'
import PropTypes from 'prop-types'


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

        const hideWhenVisible = {display: this.state.visible ? 'none' : ''}
        const showWhenVisible = {display: this.state.visible ? '' : 'none'}

        return (
            < div >
            <div style={hideWhenVisible}><button onClick={this.toggleVisibility}>{this.state.buttonText}</button></div>
            <div style={showWhenVisible} className='togglableContent'>
                {this.props.children}
                <button onClick={this.toggleVisibility}>cancel</button>
                </div>
            </div >
        )
    }
}

Togglable.propTypes = {
    buttonText: PropTypes.string.isRequired
}

export default Togglable