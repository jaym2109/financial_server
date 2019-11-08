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
import { getMonthName, getLastDay } from "../../../utils/formatting";
import PrintBtn from "../../layout/PrintBtn";

const IncomeStatement = ({
  auth: { user },
  accounts,
  financials,
  params: { company, fiscalYear, month, budgetPY },
  loading,
  getCompany,
  getFiscalYear,
  getMonth,
  getBudgetPY
}) => {
  const [incomeStatementAccounts, setIncomeStatementAccounts] = useState(null);
  useEffect(() => {
    if (
      user &&
      accounts &&
      financials &&
      company &&
      fiscalYear &&
      month &&
      budgetPY
    ) {
      setIncomeStatementAccounts(
        calculateISTotals(
          financials[0].consolidated,
          accounts[0].sections,
          company,
          fiscalYear,
          month,
          getLastDay(fiscalYear, month)
        )
      );
    }
  }, [user, accounts, financials, company, fiscalYear, month, budgetPY]);
  const onChangeHandler = (field, value) => {
    if (field === "month_dropdown") {
      value = parseInt(value);
      getMonth(value);
      setIncomeStatementAccounts(
        calculateISTotals(
          financials[0].consolidated,
          accounts[0].sections,
          company,
          fiscalYear,
          value,
          getLastDay(fiscalYear, value)
        )
      );
    }
    if (field === "fiscal_years") {
      value = parseInt(value);
      getFiscalYear(value);
      setIncomeStatementAccounts(
        calculateISTotals(
          financials[0].consolidated,
          accounts[0].sections,
          company,
          value,
          month,
          getLastDay(value, month)
        )
      );
    }
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
    if (field === "budget_prior") {
      getBudgetPY(value);
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
            fiscal={fiscalYear}
            month={{
              value: month,
              name: getMonthName(month)
            }}
            budgetPY={budgetPY}
            onChangeHandler={onChangeHandler}
            statement="Income Statement"
          />
          <InnerBackground>
            <StatementContainer>
              <PrintBtn />
              <Header
                statement={`Income Statement vs. ${budgetPY}`}
                company={company}
                month={{
                  value: month,
                  name: getMonthName(month)
                }}
                fiscal={fiscalYear}
                statement_id="income_statement"
              />
              <Table
                headers={["YTD", budgetPY, "Variance"]}
                accounts={incomeStatementAccounts}
                statement_id="income_statement"
              />
            </StatementContainer>
          </InnerBackground>
        </Layout>
      );
    }
  };

  return loadDefault();
};

IncomeStatement.propTypes = {
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
)(IncomeStatement);
