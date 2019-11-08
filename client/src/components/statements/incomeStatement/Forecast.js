import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ParamsBar from "../../params/ParamsBar";
import Header from "../../layout/Header";
import Table from "../layout/Table";
import Layout from "../../layout/Layout";
import Loading from "../../layout/Loading";
import { calculateISTotals } from "./calculations";
import {
  InnerBackground,
  StatementContainer
} from "../layout/styles/Statement.style";
import {
  getCompany,
  getFiscalYear,
  getMonth,
  getBudgetPY
} from "../../../actions/params";
import {
  getMonthName,
  getLastDay,
  getDateDefaults
} from "../../../utils/formatting";
import PrintBtn from "../../layout/PrintBtn";

const Forecast = ({
  auth: { user },
  accounts,
  financials,
  params: { company, fiscalYear, month, budgetPY },
  loading,
  getCompany
}) => {
  const [incomeStatementAccounts, setIncomeStatementAccounts] = useState(null);
  useEffect(() => {
    if (user && accounts && financials && company) {
      setIncomeStatementAccounts(
        calculateISTotals(
          financials[0].consolidated,
          accounts[0].sections,
          company,
          getDateDefaults().fiscalYear,
          getDateDefaults().month,
          getLastDay(getDateDefaults().fiscalYear, getDateDefaults().month)
        )
      );
    }
  }, [user, accounts, financials, company]);
  const onChangeHandler = (field, value) => {
    if (field === "company_dropdown") {
      getCompany(value);
      setIncomeStatementAccounts(
        calculateISTotals(
          financials[0].consolidated,
          accounts[0].sections,
          value,
          fiscalYear,
          month,
          getLastDay(fiscalYear, month)
        )
      );
    }
  };

  const loadDefault = () => {
    if (financials === null || loading) {
      return <Loading />;
    } else {
      return (
        <Layout>
          <ParamsBar
            company={company}
            fiscal={getDateDefaults().fiscalYear}
            month={{
              value: getDateDefaults().month,
              name: getMonthName(getDateDefaults().month)
            }}
            budgetPY={budgetPY}
            onChangeHandler={onChangeHandler}
            statement="Forecast"
          />
          <InnerBackground>
            <StatementContainer>
              <PrintBtn />
              <Header
                statement={`Forecasted Income Statement vs. Annual Budget`}
                company={company}
                month={{
                  value: getDateDefaults().month,
                  name: getMonthName(getDateDefaults().month)
                }}
                fiscal={fiscalYear}
                statement_id="forecast"
              />
              <Table
                headers={["YTD", "Budget", "Variance"]}
                accounts={incomeStatementAccounts}
                statement_id="forecast"
              />
            </StatementContainer>
          </InnerBackground>
        </Layout>
      );
    }
  };

  return loadDefault();
};

Forecast.propTypes = {
  auth: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  accounts: PropTypes.array,
  financials: PropTypes.array,
  loading: PropTypes.bool,
  getCompany: PropTypes.func.isRequired,
  getFiscalYear: PropTypes.func.isRequired,
  getMonth: PropTypes.func.isRequired,
  getBudgetPY: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  accounts: state.financials.accounts,
  financials: state.financials.financials,
  loading: state.financials.loading,
  params: state.params
});

export default connect(
  mapStateToProps,
  { getCompany, getFiscalYear, getMonth, getBudgetPY }
)(Forecast);
