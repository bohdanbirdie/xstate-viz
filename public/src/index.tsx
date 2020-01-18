import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import queryString from 'query-string';
import { PreviewStateChart } from '@statecharts/xstate-viz';

const query = queryString.parse(window.location.search);
const a = `
// Available variables:
// - Machine
// - interpret
// - assign
// - send
// - sendParent
// - spawn
// - raise
// - actions
// - XState (all XState exports)

const fetchMachine = Machine({
  id: 'fetch',
  initial: 'idle',
  context: {
    retries: 0
  },
  states: {
    idle: {
      on: {
        FETCH: 'loading'
      }
    },
    loading: {
      on: {
        RESOLVE: 'success',
        REJECT: 'failure'
      }
    },
    success: {
      type: 'final'
    },
    failure: {
      on: {
        RETRY: {
          target: 'loading',
          actions: assign({
            retries: (context, event) => context.retries + 1
          })
        }
      }
    }
  }
});
`

if (query.code && window.opener) {
  window.opener.authCallback(query.code);
  setTimeout(() => window.close());
} else {
  ReactDOM.render(<PreviewStateChart machine={a}/>, document.getElementById('root'));

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.unregister();
}
