/* global toastr */
import React from 'react'
import request from 'superagent-bluebird-promise'

import { API } from '../lib'

export default class ExplorableApp extends React.Component {
  constructor (props, context) {
    super(props)
    this.router = context.router
    this.state = { hidden: false }
  }

  componentDidMount () {
    const GITHUB_ROOT = 'https://raw.githubusercontent.com/' + this.props.full_name + '/master/'
    const GITHUB_Q = GITHUB_ROOT + 'package.json'

    request.get(GITHUB_Q).end((err, res) => {
      if (err) return this.setState({ hidden: true })

      const { netbeast, logo } = JSON.parse(res.text)
      this.setState({ netbeast, logo: logo ? GITHUB_ROOT + logo : null })
    })
  }

  launch () {
    const { name } = this.props

    API.launch(name).then(() => {
      this.router.push('/i/' + name)
    }).catch((err) => {
      if (err.status === 404) {
        this.setState({ isRunning: true })
        return toastr.info(`${name} is running`)
      }
      toastr.error(err.message)
    })
  }

  renderButton () {
    const { installed, name, git_url } = this.props
    return installed ? <a href='javascript:void(0)' onClick={this.launch.bind(this)} className='install btn btn-filled btn-primary'> Launch </a>
    : <a href='javascript:void(0)' onClick={API.install.bind(API, git_url)} className='install btn btn-filled btn-info'> Install </a>
  }

  render () {
    if (this.state.hidden) return null

    const { name, author } = this.props
    const { netbeast, logo } = this.state
    const isPlugin = netbeast && (netbeast.type === 'plugin')
    const defaultLogo = isPlugin ? 'url(/img/plugin.png)' : 'url(/img/dflt.png)'
    const logoStyle = { backgroundImage: logo ? `url(${logo})` : defaultLogo }

    return (
      <div className='app'>
        <div className='logo' title='Launch app' style={logoStyle} onClick={this.launch.bind(this)}>
        </div>
        {this.renderButton()}
        <h4 className='name'>{name}</h4>
      </div>
    )
  }
}

ExplorableApp.contextTypes = {
  router: React.PropTypes.object.isRequired
}
