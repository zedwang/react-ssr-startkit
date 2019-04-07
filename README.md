# React SSR Startkit
A web's scaffolding tool for react ssr webapps.using [React](https://github.com/facebook/react), [Redux](https://github.com/rackt/redux), [Rematch](https://github.com/rematch/rematch)(A redux framework) and [Scss](https://sass-lang.com/documentation/file.SASS_REFERENCE.html).
**Note:** If your browser < IE10, you need `babel/polyfill`. see [https://babeljs.io/docs/en/babel-polyfill](https://babeljs.io/docs/en/babel-polyfill)
## Goal
This project can help you start the react ssr project in seconds. You can thing of it as a nodejs application. It integrated [HMR](https://webpack.js.org/concepts/hot-module-replacement/), Proxy, Test, Lint, Server Logger

## Usage
```shell
git clone https://github.com/zedwang/react-ssr-startkit.git
cd react-ssr-startkit
npm install
npm start
```
Then visit `localhost:8080` in your browser.
** Deploy **
```shell
npm build
```
Will genarate a `dist` directory
```shell
dist
  bin
    server.boundle.js # app entry
  public
    ... #some js css images etc
```

## Tips
The rematch hot reload

before
```js
if (module.hot) {
        module.hot.accept('./reducers', () => {
           const nextReducers = require('./reducers')
           store.replace(nextReducers);
        });
    }
```
now
```js
if (module.hot) {
        module.hot.accept('./models', () => {
            Object.keys(models).forEach(modelKey => {
                console.log(`Reloading model ${modelKey}`);
                model({
                    name: modelKey,
                    ...models[modelKey]
                });
            });
        });
    }

```