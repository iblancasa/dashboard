# Netbeast dashboard

[![Join the chat at https://gitter.im/netbeast-co/router](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/netbeast-co/xway?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/netbeast-co/xy-dashboard.svg)](https://travis-ci.org/netbeast-co/dashboard)
[![npm version](https://badge.fury.io/js/xy-dashboard.svg)](http://badge.fury.io/js/xy-dashboard)

###Iot in html5.

This is a web panel from you can install, manage or publish IoT applications. For Linux + node.js. You already tried the Netbeast dashboard or distro? Let us know http://bit.ly/1dQmFKt!

## Try it locally
Find it live at `http://localhost`
<img src="https://github.com/netbeast-co/xway/blob/master/img/dashboard-cap.png?raw=true"></img>

### Install
``` bash
npm install -g nb-dashboard
```

### Run
```bash
sudo xy-dasyboard --port 80
```

## Turn your Raspberry Pi in a home automation gateway!

Compiling with npm the nb-dashboard node.js native modules may take a while. That is why we precompile them weekly and push them to this repo production branch. You can have it on your Raspberry Pi in less than a minute:

```bash
git clone -b production --single-branch https://github.com/netbeast-co/dashboard/
cd nb-dashboard
npm link npm # npm package itself is needed but not included in production
sudo ./www
```

We also prepared a <u>very lightweight Raspberry Pi distro with the dashboard already installed</u> is published every two weeks here http://bit.ly/1HjkWo2. Available for Rpi 1 and 2 versions.

## Use cases
Find them in our marketplace private beta. Invitations are open <a target="_blank" href="http://bit.ly/1ENxgvq">here</a>
* Push notification system using a Node.js REST API
* SFTP server in Node.js + linux package
* Live Streaming powerpoint web app
* Web SSH built with node
* Wifi Interface  controller with Node.js and bash scripts

You can build IoT apps using only web technologies: javascript and HTML5! Also we hace tutorials at our docs to build apps with python.


### Docs
https://github.com/netbeast-co/router

### Chat with us
We are at gitter: http://bit.ly/1dQmFKt


<img src="https://github.com/netbeast-co/xway/blob/master/img/open-source.png?raw=true" height="140px" width="auto"/>
<img src="https://github.com/netbeast-co/xway/blob/master/img/open-hw.png?raw=true" height="140px" width="auto"/>
