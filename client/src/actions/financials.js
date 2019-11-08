import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_FINANCIALS,
  REMOVE_FINANCIALS,
  GET_ACCOUNTS,
  REMOVE_ACCOUNTS
} from "./types";

// Get Financial Data
export const getFinancials = () => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.get("/api/financials", config);

    res.data[0].consolidated.map(data => {
      data.Mth = new Date(data.Mth);
      return (data.Mth = new Date(
        data.Mth.getFullYear(),
        data.Mth.getMonth(),
        data.Mth.getDate() + 1
      ));
    });

    dispatch({
      type: GET_FINANCIALS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REMOVE_FINANCIALS
    });
  }
};

// Remove Financial Data
export const removeFinancials = () => dispatch => {
  dispatch({
    type: REMOVE_FINANCIALS
  });
};

// Get Accounts
export const getAccounts = () => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.get("/api/accounts", config);

    dispatch({
      type: GET_ACCOUNTS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REMOVE_ACCOUNTS
    });
  }
};

// Remove Accounts
export const removeAccounts = () => dispatch => {
  dispatch({
    type: REMOVE_ACCOUNTS
  });
};
