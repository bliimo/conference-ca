# Framework7 v3 React App Template

To get started, clone this repo as whatever you want to name your app:

```
$ git clone https://github.com/framework7io/framework7-react-app-template/ my-app
```

Running the app:

```
$ npm install
$ npm start
```

To build your app for deployment, run:

```
$ npm run build
```

to install cordova
$npm i cordova -g

To add platform
$ cordova add platform [platform]
  e.g $ cordova add platform android or $ cordova add platform ios

To build cordova app
$ cordova build android

The build folder will then contain all of your app's files, optimized and ready for deployment.

This template was created with [Create React App](https://github.com/facebookincubator/create-react-app). It is suggested that you read more about Create React App to understand the full capabilities of the toolset.

### Issues

Please log any issues to the main [Framework7 repo](https://github.com/framework7io/framework7/issues).

  # to build apk
  keytool -genkeypair -v -keystore bliimo-box.keystore -alias bliimo-box -keyalg RSA -keysize 2048 -validity 10000
  Password: bliimo-box

  CN=Placido Penitente, OU=Software Agency, O=Bliimo Technologies, L=Pasig, ST=Manila, C=PH

  # set up android home and java home
  $ export PATH=$PATH:$ANDROID_HOME/tools/bin
  $ export PATH=$PATH:$ANDROID_HOME/platform-tools
  $ export PATH=$PATH:$ANDROID_HOME/emulator
  $ export JAVA_HOME=`/usr/libexec/java_home -v 1.8`
  $ export ANDROID_HOME=/Users/rufogabrillo/Library/Android/sdk

  #deploy firebase functions
  $ firebase deploy --only functions

  firebase auth:export backups/users.json --format=file_format