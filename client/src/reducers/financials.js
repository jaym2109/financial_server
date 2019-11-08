import {
  GET_FINANCIALS,
  REMOVE_FINANCIALS,
  GET_ACCOUNTS,
  REMOVE_ACCOUNTS
} from "../actions/types";

const initialState = {
  financials: null,
  defaults: null,
  accounts: null,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FINANCIALS:
      return {
        ...state,
        financials: payload,
        loading: false
      };
    case GET_ACCOUNTS:
      return {
        ...state,
        accounts: payload,
        loading: false
      };
    case REMOVE_FINANCIALS:
      return {
        ...state,
        financials: null,
        loading: false
      };
    case REMOVE_ACCOUNTS:
      return {
        ...state,
        accounts: null,
        loading: false
      };
    default:
      return state;
  }
}
