/* global XMLHttpRequest */
import React from 'react'

export default class ProgressBar extends React.Component {
  constructor () {
    super()
    this.state = {
      position: 'fixed',
      height: '3px',
      backgroundColor: 'rgb(0, 233, 207)',
      top: 0,
      width: 0
    }
    window.updateProgressBar = this.update.bind(this)
  }

  update (width) {
    console.log(width)
    width = width >= 1 ? 0 : width
    this.setState({ width: width * 100 + '%' })
  }

  render () {
    const { width } = this.state

    return (
      <span className='progress-bar' style={this.state}></span>
    )
  }
}
