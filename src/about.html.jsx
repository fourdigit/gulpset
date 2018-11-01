import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './jsx/components/App';
import rootReducer from './jsx/reducers';

const store = createStore(rootReducer);

const IndexPage = () => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Redux Todos Example</title>
    </head>
    <body>
      <Provider store={store}>
        <App />
      </Provider>
    </body>
  </html>
);

export default IndexPage;
