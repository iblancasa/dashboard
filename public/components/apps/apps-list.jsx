/* global toastr */

import React from 'react'

import App from './app.jsx'
import { Session, API } from '../lib'

export default class AppsList extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = { apps: Session.load('apps') || [] }
  }

  componentWillReceiveProps (nextProps) {
    API.loadAppsFrom(nextProps.src).then((apps) => {
      this.setState({ apps })
    }).catch((err) => toastr.error(err))
  }

  componentDidMount () {
    API.loadAppsFrom(this.props.src).then((apps) => {
      this.setState({ apps })
    }).catch((err) => toastr.error(err))
  }

  dismiss (appName) {
    let apps = [...this.state.apps] // smart copy
    const index = apps.findIndex((app) => { return app.name === appName })
    if (index < 0) return // do not change react component
    apps.splice(index, 1) // splice changes the array
    this.setState({ apps })
  }

  render () {
    const { apps } = this.state
    return (
      <div className='apps-list'>
        {this.props.prepend}
        {apps.map((data) => {
          return <App key={data.name} { ...data } dismiss={this.dismiss.bind(this)} />
        })}
        {this.props.append}
        <br/>
      </div>
    )
  }
}
