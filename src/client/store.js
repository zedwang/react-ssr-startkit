// import { createStore, applyMiddleware } from "redux";
import { init, model } from '@rematch/core';
import {createBrowserHistory} from "history";
// import reducers from './reducers';
import * as models from './models';



export default (initialState) => {
    // const history = createBrowserHistory();
    const wares = [];
    if (process.env.NODE_ENV === 'development') {
        const logger = require('redux-logger');
        wares.push(logger);
    }
    const store = init({
        redux: {
            // middlewares: [...wares],
            initialState
        },
        models
    });
    // const store = createStore(reducers, initialState, applyMiddleware(...middlewares));

    // if (module.hot) {
    //     module.hot.accept('./reducers', () => {
    //         const nextRootReducer = require('./reducers');
    //         store.replaceReducer(nextRootReducer());
    //     });
    // }

    if (module.hot) {
        module.hot.accept('./models', () => {
            // const nextRootReducer = require('./models');
            // store.replaceReducer(nextRootReducer());
            Object.keys(models).forEach(modelKey => {
                console.log(`Reloading model ${modelKey}`);
                model({
                    name: modelKey,
                    ...models[modelKey]
                });
            });
        });
    }

    return {store};
};
   
