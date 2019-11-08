import {
  GET_COMPANY,
  REMOVE_COMPANY,
  GET_FISCAL_YEAR,
  REMOVE_FISCAL_YEAR,
  GET_MONTH,
  REMOVE_MONTH,
  GET_BUDGET_PY,
  REMOVE_BUDGET_PY
} from "../actions/types";

const initialState = {
  company: null,
  fiscalYear: null,
  month: null,
  budgetPY: "Budget"
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COMPANY:
      return {
        ...state,
        company: payload
      };
    case GET_FISCAL_YEAR:
      return {
        ...state,
        fiscalYear: payload
      };
    case GET_MONTH:
      return {
        ...state,
        month: payload
      };
    case GET_BUDGET_PY:
      return {
        ...state,
        budgetPY: payload
      };
    case REMOVE_COMPANY:
    case REMOVE_FISCAL_YEAR:
    case REMOVE_MONTH:
    case REMOVE_BUDGET_PY:
      return {
        ...state,
        company: null,
        fiscalYear: null,
        month: null,
        budgetPY: null
      };
    default:
      return state;
  }
}
