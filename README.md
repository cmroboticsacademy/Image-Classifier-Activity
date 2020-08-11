## Image Classification Activity

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Install

In the root of the project...
run `yarn install`

This project uses a test app created with create-react-app to load the component. You will need to link the component to that project before running.

1. Create a symlink for this project's component:

```
% yarn link

yarn link v1.22.4
success Registered "@carnegie-mellon-robotics-academy/rah_image_classification_prototype".
```

2. Copy the link from the previous step. Install the test apps node moadules, then link it to the test app

```
% cd test_app/
% yarn install
% yarn link "@carnegie-mellon-robotics-academy/rah_image_classification_prototype"
```

3. Link the component's react instance to the test app. Note that we use NPM instead of Yarn for this step.

```
% npm link '../node_modules/react'
```

## Getting Started

1. Run yarn watch in the root directory of the project.

```
% yarn watch
```

2. Open a new terminal tab and change directories to test_app and start the server.

```
% cd test_app && yarn start
```

## Available Scripts

In the project directory, you can run:

### `yarn watch`

Running this script will trigger rebuilds when files in the src directory are changed.
