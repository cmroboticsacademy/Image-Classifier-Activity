## Image Classification Prototype for Ready AIM Hire Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Install

This project uses a test app created with create-react-app to load the component. You will need to link the component to that project before running.

1. Create a symlink for this project's component:

```
% yarn link

yarn link v1.22.4
success Registered "@carnegie-mellon-robotics-academy/rah_image_classification_prototype".
```

2. Copy the link from the previous step and link it to the test app

```
% cd test_app/
% yarn link "@carnegie-mellon-robotics-academy/rah_image_classification_prototype"
```

3. Link the component's react instance to the test app. Note that we use NPM instead of Yarn for this step.

```
% npm link '../node_modules/react'
```

## Getting Started

1. Run yarn watch in the parent directory.

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

### `npm publish`

1. Login

Run the npm login command and populate your credentials.

```
% npm login --scope=@carnegie-mellon-robotics-academy
```

2. Publish

```
% npm publish
```

This publishes the package to the NPM package repository. You will need to login and set your organization scope to
@carnegie-mellon-robotics-academy. See section about logging in and setting scope [here](https://docs.npmjs.com/using-npm/scope.html#associating-a-scope-with-a-registry) for more information.
