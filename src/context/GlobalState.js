import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial state
const initialState = {
  transactions: [{name: "Loading", stock: "........."}],
  error: null,
  loading: true
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getTransactions() {
    try {
      const res = await axios.get('http://localhost:8080/api/products');
            
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: console.log("error")
      });
    }
  }

  async function deleteTransaction(_id) {
      
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'mode' : 'CORS',
        'body' : JSON.stringify(_id)
      }
    } 
    
    try {
      await axios.delete(`http://localhost:8080/api/products/${_id}`);

      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: _id
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'mode' : 'CORS',
        'body' : JSON.stringify(transaction)
      }
    }

    try {
      const res = await axios.post('http://localhost:8080/api/products', transaction, config);

      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    error: state.error,
    loading: state.loading,
    getTransactions,
    deleteTransaction,
    addTransaction
  }}>
    {children}
  </GlobalContext.Provider>);
}
