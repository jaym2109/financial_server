import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import financials from "./financials";
import params from "./params";

export default combineReducers({
  alert,
  auth,
  financials,
  params
});
