# react-ssr-startkit
A web's scaffolding tool for react ssr webapps.using [React](https://github.com/facebook/react), [Redux](https://github.com/rackt/redux), [Rematch](https://github.com/rematch/rematch)(A redux framework) and [Scss](https://sass-lang.com/documentation/file.SASS_REFERENCE.html).

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
The server side fetching data

client:
```js
class Home extends React.Component {
    // some logic
}
// modelType/action
// see: https://rematch.gitbooks.io/rematch/docs/api.html#storedispatch
Home.serverFetch = {type: 'repos/fetchData'};
```
server:
```js
routes
    .filter(route => matchPath(req.url, route))
    .map(route => route.component)
    .filter(comp => comp.serverFetch)
    .map(comp => {
        const {type, payload} = comp.serverFetch;
        return dispatch({type, payload});
    });
```