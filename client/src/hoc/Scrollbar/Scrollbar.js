import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars';
 
class Scrollbar extends Component {
  render() {
    return (
      <Scrollbars
        onScroll={this.handleScroll}
        onScrollFrame={this.handleScrollFrame}
        onScrollStart={this.handleScrollStart}
        onScrollStop={this.handleScrollStop}
        onUpdate={this.handleUpdate}
        renderView={this.renderView}
        renderTrackHorizontal={this.renderTrackHorizontal}
        renderTrackVertical={this.renderTrackVertical}
        renderThumbHorizontal={this.renderThumbHorizontal}
        renderThumbVertical={this.renderThumbVertical}
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        // autoHeightMin={0}
        autoHeightMax={1000}
        thumbMinSize={30}
        // universal={true}
        {...this.props} />
    );
  }
}

export default Scrollbar

