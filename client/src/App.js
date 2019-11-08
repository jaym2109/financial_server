import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import IncomeStatement from "./components/statements/incomeStatement/IncomeStatement";
import Forecast from "./components/statements/incomeStatement/Forecast";
import BalanceSheet from "./components/statements/balanceSheet/BalanceSheet";
import CashFlow from "./components/statements/cashFlow/CashFlow";
import PrivateRoute from "./components/routing/PrivateRoute";
import AdminRoute from "./components/routing/AdminRoute";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import "./App.css";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Switch>
            <AdminRoute exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute
              exact
              path="/income-statement"
              component={IncomeStatement}
            />
            <PrivateRoute exact path="/forecast" component={Forecast} />
            <PrivateRoute
              exact
              path="/balance-sheet"
              component={BalanceSheet}
            />
            <PrivateRoute exact path="/cash-flow" component={CashFlow} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
