import React, { Fragment } from "react";
import { numCurrency } from "../../../utils/formatting";
import { AccountDesc, AccountTotal } from "./styles/Account.style";

const accountComp = (account, headers, statement_id) => {
  if (statement_id === "forecast") {
    return account.forecastTotal !== 0 || account.annualBudget !== 0 ? (
      <Fragment>
        <td style={{ width: "5px" }} />
        <AccountDesc id={account.id}>{account.name}</AccountDesc>
        <AccountTotal className="text-right">
          {numCurrency(account.forecastTotal, 0)}
        </AccountTotal>
        <AccountTotal className="text-right">
          {numCurrency(account.annualBudget, 0)}
        </AccountTotal>
        <AccountTotal className="text-right">
          {numCurrency(account.forecastTotal - account.annualBudget, 0)}
        </AccountTotal>
      </Fragment>
    ) : null;
  } else if (statement_id === "balance_sheet") {
    if (account.total !== 0 && account.pyTotal !== 0) {
      return (
        <Fragment>
          <AccountDesc>{account.account}</AccountDesc>
          <AccountTotal>{numCurrency(account.total)}</AccountTotal>
          <AccountTotal>{numCurrency(account.pyTotal)}</AccountTotal>
          <AccountTotal>
            {numCurrency(account.total - account.pyTotal)}
          </AccountTotal>
        </Fragment>
      );
    }
  } else if (headers[1] === "Budget") {
    return account.total !== 0 || account.budgetTotal !== 0 ? (
      <Fragment>
        <td style={{ width: "5px" }} />
        <AccountDesc id={account.id}>{account.name}</AccountDesc>
        <AccountTotal className="text-right">
          {numCurrency(account.total, 0)}
        </AccountTotal>
        <AccountTotal className="text-right">
          {numCurrency(account.budgetTotal, 0)}
        </AccountTotal>
        <AccountTotal className="text-right">
          {numCurrency(account.total - account.budgetTotal, 0)}
        </AccountTotal>
      </Fragment>
    ) : null;
  } else {
    return account.total !== 0 || account.pyTotal !== 0 ? (
      <Fragment>
        <td style={{ width: "5px" }} />
        <AccountDesc>{account.name}</AccountDesc>
        <AccountTotal className="text-right">
          {numCurrency(account.total, 0)}
        </AccountTotal>
        <AccountTotal className="text-right">
          {numCurrency(account.pyTotal, 0)}
        </AccountTotal>
        <AccountTotal className="text-right">
          {numCurrency(account.total - account.pyTotal, 0)}
        </AccountTotal>
      </Fragment>
    ) : null;
  }
};

const Account = ({ account, headers, statement_id }) => {
  return <tr>{accountComp(account, headers, statement_id)}</tr>;
};

export default Account;
