# Netbeast dashboard/ Desktop Version

[![Build Status](https://travis-ci.org/netbeast/dashboard.svg)](https://travis-ci.org/netbeast/dashboard)
[![npm version](https://badge.fury.io/js/nb-dashboard.svg)](https://badge.fury.io/js/nb-dashboard)
![dependencies](https://david-dm.org/netbeast/dashboard.svg)
[![devDependency](https://david-dm.org/netbeast/dashboard/dev-status.svg)](https://david-dm.org/netbeast/dashboard#info=devDependencies)

[![Join the chat at https://gitter.im/netbeast/docs](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/netbeast/docs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

### Run it locally

This is the desktop version of the Netbeast dashboard. If you want to run the desktop version locally run:

```
git clone -b electron --single-branch https://github.com/netbeast/dashboard
cd dashboard
npm install  #Installing all dependencies
./node_modules/.bin/electron index.js
```

After that, an Electron window of the Netbeast dashboard will appear. 

## Compile the desktop version for MACOS

If you want to create the Netbeast dashboard application for mac, follow these steps:

##### 1. Install last Nodejs version (In this example I have v5.7.1) & npm packages

```
# Install electron-packager
npm install electron-packager -g 

# Install appdmg
npm install appdmg -g 

# Clone the Netbeast dashboard 
git clone -b electron --single-branch https://github.com/netbeast/dashboard
```

- You can find more information about how these packages work: [electron-packager](https://github.com/electron-userland/electron-packager) [appdmg](https://github.com/LinusU/node-appdmg)

##### 2. Create the Mac App

```
electron-packager dashboard Netbeast --platform=darwin --arch=all --version=0.36.10 --icon=dashboard/desktop_app/icon.icns --version-string.CompanyName=Netbeast --version-string.ProductName=NetbeastDashboard
```

-  Check the electron version ```./node_modules/.bin/electron -v```in my case: 36.10

##### 3. Create the Mac dmg

Once you have created the Netbeast dashboard app you can run the following command:


```
cd Netbeast-darwin-x64
appdmg ../dashboard/desktop_app/appdmg.json ~/Desktop/Netbeast.dmg
```

- Then you will have the Netbeast.dmg file on your desktop :smile:


## Compile the desktop version for Windows

Coming Soon

## Compile the desktop version for Linux

Coming Soon

## Contact
* Visit our site [https://netbeast.co](https://netbeast.co)
* Mail us: staff [at] netbeast.co
* Report a bug or enter discussion at [issues](https://github.com/netbeast/docs/issues)
* Other resources: [Docs](https://github.com/netbeast/docs/wiki), Netbeast [API](https://github.com/netbeast/API)

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/netbeast/docs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)


<img src="https://github.com/netbeast/docs/blob/master/img/open-source.png?raw=true" height="140px" width="auto"/>
<img src="https://github.com/netbeast/docs/blob/master/img/open-hw.png?raw=true" height="140px" width="auto"/>
