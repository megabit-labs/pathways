import React, { PureComponent } from 'react'
import PropTypes from "prop-types";

class Header extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
  };
  render() {
    return (
      <div style={{margin: "1.2em 0", color: "red"}}>
        {this.props.value}
      </div>
    )
  }
}

export default Header

