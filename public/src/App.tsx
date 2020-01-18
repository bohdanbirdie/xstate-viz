import React, { Component, createContext, useState } from 'react';
import './App.css';
import { PreviewStateChart } from '@statecharts/xstate-viz';

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

const Kek = (machine: string) => {
  <PreviewStateChart machine={a} />
}

export default Kek;
