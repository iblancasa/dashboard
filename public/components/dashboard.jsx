import React from 'react'

import Notifications from './notifications'
import Launcher from './launcher.jsx'

export default class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.getPathClassName = this.getPathClassName.bind(this)
    this.state = { path: this.getPathClassName() }
  }

  getPathClassName (nextProps) {
    const { location } = nextProps || this.props
    const regexp = new RegExp('/', 'g')
    const pathname = location.pathname.replace(regexp, '-')
    return (pathname === '-') ? '-root' : pathname
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ path: this.getPathClassName(nextProps) })
  }

  render () {
    let { path } = this.state
    path = path.indexOf('live') > -1 ? '-live' : path
    return (
      <div id='dashboard' className={`path${path}`}>
        <Notifications />
        <main>
          {this.props.children}
        </main>
        <Launcher { ...this.props } />
      </div>
    )
  }
}

Dashboard.propTypes = {
  children: React.PropTypes.element
}
