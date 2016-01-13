import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router'

import Drawer from './drawer.jsx'
import Notifications from './notifications.jsx'
import Settings from './settings.jsx'
import NotFound from './not-found.jsx'

class Dashboard extends React.Component {
  render () {
    return (
      <div id='dashboard'>
        <Notifications />
        <main>
          {this.props.children || <Drawer />}
        </main>
      </div>
    )
  }
}

ReactDOM.render(
  <Router>
    <Route path='/' component={Dashboard}>
      <Route path='about' component={Drawer}/>
      <Route path='settings' component={Settings}>
        <Route path='/user/:userId' component={Drawer}/>
      </Route>
      <Route path='*' component={NotFound}/>
    </Route>
  </Router>
, document.getElementById('app'))
