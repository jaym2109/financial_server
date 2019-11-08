import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ParamsBar from "../../params/ParamsBar";
import Header from "../../layout/Header";
import Loading from "../../layout/Loading";
import Table from './layout/Table'; 
import Layout from "../../layout/Layout";
import { getMonthName, getLastDay } from "../../../utils/formatting";
import { InnerBackground, StatementContainer} from "../layout/styles/Statement.style"; 
import PrintBtn from "../../layout/PrintBtn";
import {calculateCFTotals} from './calculations'; 
import {
  getCompany, 
  getFiscalYear,
  getMonth
} from "../../../actions/params";

const CashFlow = ({
  auth: { user },
  accounts,
  financials,
  params: { company, fiscalYear, month },
  loading,
  getCompany,
  getFiscalYear,
  getMonth
}) => {
  const [cashFlowAccounts, setCashFlowAccounts] = useState(null);
  useEffect(() => {
    if (user && accounts && financials && company && fiscalYear && month) {
      setCashFlowAccounts(
        calculateCFTotals(
          financials[0].consolidated,
          accounts[2].sections,
          company,
          fiscalYear,
          month,
          getLastDay(fiscalYear, month)
        )
      );
    }
  }, [user, accounts, financials, company, fiscalYear, month]);
  const onChangeHandler = (field, value) => {
    if (field === "month_dropdown") {
      value = parseInt(value);
      getMonth(value);
      setCashFlowAccounts(
        calculateCFTotals(
          financials[0].consolidated,
          accounts[2].sections,
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
      setCashFlowAccounts(
        calculateCFTotals(
          financials[0].consolidated,
          accounts[2].sections,
          company,
          value,
          month,
          getLastDay(value, month)
        )
      );
    }
    if (field === "company_dropdown") {
      getCompany(value);
      setCashFlowAccounts(
        calculateCFTotals(
          financials[0].consolidated,
          accounts[2].sections,
          value,
          fiscalYear,
          month,
          getLastDay(fiscalYear, month)
        )
      );
    }
  };

  const cashFlowContent = () => {
    if (financials === null || loading) {
      return <Loading />;
    } else {
      let year = month >= 10 ? fiscalYear - 1 : fiscalYear;
      return (
        <Layout>
          <ParamsBar
            company={company}
            fiscal={fiscalYear}
            month={{ value: month, name: getMonthName(month) }}
            statement="Cash Flow"
            onChangeHandler={onChangeHandler}
          />
          <InnerBackground>
            <StatementContainer>
              <PrintBtn />
              <Header
                statement="Cash Flow"
                company={company}
                month={{ value: month, name: getMonthName(month) }}
                fiscal={fiscalYear}
                statement_id="cash_flow"
              />
              <Table
                headers={["header1"
                ]}
                sections={cashFlowAccounts}
                statement_id="cash_flow"
              />
            </StatementContainer>
          </InnerBackground>
        </Layout>
      );
    }
  };

  return cashFlowContent();
};

CashFlow.propTypes = {
  auth: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  accounts: PropTypes.array,
  financials: PropTypes.array,
  loading: PropTypes.bool,
  getCompany: PropTypes.func.isRequired,
  getFiscalYear: PropTypes.func.isRequired,
  getMonth: PropTypes.func.isRequired
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
  { getCompany, getFiscalYear, getMonth }
)(CashFlow);

