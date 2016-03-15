/* global localStorage, toastr */

import request from 'superagent-bluebird-promise'
import Promise from 'bluebird'

export class Session {
  static save (key, value) {
    if (typeof value !== 'string') value = JSON.stringify(value)
    localStorage.setItem(key, value)
  }

  static load (key) {
    return JSON.parse(localStorage.getItem(key))
  }
}

export class API {
  static loadAppsFrom (src) {
    const kind = src.split('/')[src.split('/').length - 1]

    src = kind !== 'remove' ? src : '/api/modules'

    return request.get(src)
    .then((res) => {
      let apps = [ ...res.body ] // smart copy
      apps.forEach((app) => app.kind = kind)

      Session.save('apps', apps)
      return Promise.resolve(apps)
    })
  }

  static launch (name) {
    return request.post('/api/activities/' + name)
    .then(() => {
      return request.get('/i/' + name).promise()
    })
  }

  static stop (name) {
    return request.del('/api/activities/' + name)
    .promise()
  }

  static install (url) {
    return request
    .post('/api/apps').send({ url })
    .then((res) => {
      const name = res.body.name
      const props = res.body.netbeast
      const type = props ? props.type : 'app'

      toastr.success(`${name} has been installed!`)

      if (type === 'plugin' || type === 'service' || (props && props.bootOnLoad)) {
        return this.launch(name)
      }
    }).then((res) => {
      toastr.success(`${res.body.name} is running`)
      return Promise.resolve(res)
    })
    .catch((fail, res) => toastr.error(fail.message))
  }

  static uninstall (name) {
    return request.del('/api/apps/' + name)
    .promise()
  }
}

export default { Session, API }
