import { init } from '@rematch/core';
import * as models from './models';

export default (initialState) => {
    const wares = [];
    if (process.env.NODE_ENV === 'development') {
        const {createLogger} = require('redux-logger');
        wares.push(createLogger());
    }
    const store = init({
        redux: {
            middlewares: wares,
            initialState
        },
        models
    });

    if (module.hot) {
        module.hot.accept('./models', () => {
            Object.keys(models).forEach(modelKey => {
                console.log(`Reloading model ${modelKey}`);
                store.model({
                    name: modelKey,
                    ...models[modelKey]
                });
            });
        });
    }

    return {store};
};
   
