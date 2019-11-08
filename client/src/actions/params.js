import {
  GET_COMPANY,
  REMOVE_COMPANY,
  GET_FISCAL_YEAR,
  REMOVE_FISCAL_YEAR,
  GET_MONTH,
  REMOVE_MONTH,
  GET_BUDGET_PY,
  REMOVE_BUDGET_PY
} from "./types";

// Get Company
export const getCompany = company => dispatch => {
  dispatch({
    type: GET_COMPANY,
    payload: company
  });
};

// Remove Company
export const removeCompany = () => dispatch => {
  dispatch({
    type: REMOVE_COMPANY
  });
};

// Get Fiscal Year
export const getFiscalYear = fiscal => dispatch => {
  dispatch({
    type: GET_FISCAL_YEAR,
    payload: fiscal
  });
};

// Remove Fiscal Year
export const removeFiscalYear = () => dispatch => {
  dispatch({
    type: REMOVE_FISCAL_YEAR
  });
};

// Get Month
export const getMonth = month => dispatch => {
  dispatch({
    type: GET_MONTH,
    payload: month
  });
};

// Remove Month
export const removeMonth = () => dispatch => {
  dispatch({
    type: REMOVE_MONTH
  });
};

// Get BudgetPY
export const getBudgetPY = budgetPY => dispatch => {
  dispatch({
    type: GET_BUDGET_PY,
    payload: budgetPY
  });
};

// Remove BudgetPY
export const removeBudgetPY = () => dispatch => {
  dispatch({
    type: REMOVE_BUDGET_PY
  });
};
