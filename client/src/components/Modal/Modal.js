import React, { Component, Fragment } from 'react'

import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    render() {
        return (
            <Fragment>
                <Backdrop
                    show={this.props.show}
                    clicked={this.props.modalClosed}
                />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show
                            ? 'translateY(0vh)'
                            : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0',
                        top: this.props.top,
                    }}
                >
                    {this.props.children}
                </div>
            </Fragment>
        )
    }
}

export default Modal
