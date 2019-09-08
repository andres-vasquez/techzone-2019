# TechZone 2019 - Reactive Apps Demo App

An Ionic 4 hybrid mobile application to show basic operations for Reactive Apps.
 
### Author
Andrés Vasquez Agramont

[https://github.com/andres-vasquez](https://github.com/andres-vasquez)

### Presentation Slides
https://drive.google.com/file/d/1ABun8Ot6Tgo12yaf_0A0oS6NRMLSVv4T/view?usp=sharing


## Development Requirements

* [NodeJS](https://nodejs.org/en)
* [Ionic](http://ionicframework.com/docs/cli)
* [Cordova](http://cordova.apache.org)
* [Android Studio](https://developer.android.com/studio/index.html)
* [Android SDK](https://developer.android.com/sdk/download.html)
* [XCode](https://itunes.apple.com/us/app/xcode/id497799835)

## Installation

### Node Version Manager

In order to prevent system wide permission errors while using Node (avoiding the installation of packages and running node scripts with **sudo** for Unix based systems), NVM installs Node in a different directory other than the system's, and it allows to switch from version to version in a painless way.

#### Unix (macOS/Linux)

You can read the full instructions on the [NVM repository](https://github.com/creationix/nvm) or you can run the following cURL script directly on the unix terminal:

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

#### Windows

Follow the Node Version Manager for Windows [installation instructions](https://github.com/coreybutler/nvm-windows)
or download the [installer](https://github.com/coreybutler/nvm-windows/releases/download/1.1.6/nvm-setup.zip) directly, decompress the ZIP file and run **nvm-setup.exe**.

### NodeJS

Once you have NVM installed check it's accessible in your $PATH or as an alias in your terminal:

```bash
nvm ls
```

It should output the versions of node you have installed:

```bash
-> v10.16.3
default   -> 10.16.3 (-> v10.16.3)
node      -> stable (-> v10.16.3)
stable    -> 10.16 (-> v10.16.3) (default)
lts/* -> lts/dubnium (-> v10.16.3)
lts/argon -> v4.9.1 (-> N/A)
lts/boron -> v6.17.1 (-> N/A)
lts/carbon -> v8.16.1 (-> N/A)
lts/dubnium -> v10.16.3
```

Now you can install the current node LTS (legacy version) with the following command:

```bash
nvm install 10.16.3
```

Once installed you can optionally set it up as the default node version with the next command:

```bash
nvm alias default 10.16.3
```

Once you're done with the installation verify with the commands:

```bash
node -v && npm -v
```

It should output:
 
```bash 
v10.16.3
6.9.0
```

### Ionic CLI

To install the Ionic CLI, you will need to first install node and npm. Once installed, run the following command to get the latest version of the Ionic CLI:

```bash
npm install -g ionic@latest
```

### Cordova

Cordova is necessary for generating platforms, installing plugins, building and running the application in real devices (Android and iOS).

```bash
npm install -g cordova@9.0.0
```

Note the version 9.0.0, which is required for this project.

### iOS Sim - iOS Deploy

To be able to build the iOS version of the application it's required to install **ios-sim** and **ios-deploy**

```bash
npm install -g ios-sim ios-deploy
```

This will allow to run the command:

```bash
ionic cordova platform add ios && ionic prepare ios && ionic build ios
```

### Dependencies

To install the application dependencies you need to run the following command:

```bash
npm install
```

This command will read the [package.json](package.json) and install all the required dependencies to the [node_modules](node_modules) folder.

### Serve

Use ionic serve to start a local development server for app dev and testing. This is useful for both desktop browser testing, and to test within a device browser which is connected to the same network. Additionally, this command starts LiveReload which is used to monitor changes in the file system. As soon as you save a file the browser is refreshed automatically.

```bash
ionic serve
```

There are several [configuration flags](http://ionicframework.com/docs/cli/serve/) you can customize the command with.

### Emulate

The emulate command will deploy the app to the specified platform devices. You can also run live reload on the specified emulator by adding the --livereload option. The live reload functionality is similar to ionic serve, but instead of developing and debugging an app using a standard browser, the compiled hybrid app itself is watching for any changes to its files and reloading the app when needed. This reduces the requirement to constantly rebuild the app for small changes. However, any changes to plugins will still require a full rebuild. For live reload to work, the dev machine and emulator must be on the same local network, and the device must support web sockets.

```bash
ionic emulate ios --target="iPhone-6s, 10.3" --livereload
```

There are several [configuration flags](http://ionicframework.com/docs/cli/emulate/) you can customize the command with.


### Platforms

To restore or add platforms (ios, android, browser, windows, etc.) run the following command:

```bash
ionic cordova platform add ios
ionic cordova platform add android
```

### Build

The build command builds an app for a specific platform. Pass in either ios or android to generate platform specific code in the platforms subdirectory. The build command is a proxy for Cordova’s build command.

#### Android

```bash
ionic cordova buid android
```
**NOTE:** if you want to have the same signature for android to avoid uninstalling the app replace the debug.keystore located in ~/.android/debug.keystore with the provided in the library

#### iOS

Go to XCode and open the *.workspace* file generated in the folder *platforms/ios/*. Change the provisional profile for signing the app to an authorized one.

```bash
ionic cordova build ios
```

### Run

The run command will deploy the app to the specified platform devices. You can also run live reload on the specified platform device by adding the --livereload option. The live reload functionality is similar to ionic serve, but instead of developing and debugging an app using a standard browser, the compiled hybrid app itself is watching for any changes to its files and reloading the app when needed.

```bash
ionic cordova run ios
ionic cordova run android
```

