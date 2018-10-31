
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from '../components/App';
import rootReducer from '../reducers';

const store = createStore(rootReducer);

const IndexPage = () => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Redux Todos Example</title>
    </head>
    <body>
      <div id="root">
        <Provider store={store}>
          <App />
        </Provider>
      </div>
    </body>
  </html>
);

export default IndexPage

