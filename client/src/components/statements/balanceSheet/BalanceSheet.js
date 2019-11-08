import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ParamsBar from "../../params/ParamsBar";
import Header from "../../layout/Header";
import Loading from "../../layout/Loading";
import Table from "./layout/Table";
import Layout from "../../layout/Layout";
import PrintBtn from "../../layout/PrintBtn";
import { calculateBalances } from "./calculations";
import { getCompany, getFiscalYear, getMonth } from "../../../actions/params";
import { getMonthName, getLastDay } from "../../../utils/formatting";
import {
  InnerBackground,
  StatementContainer
} from "../layout/styles/Statement.style";

const BalanceSheet = ({
  auth: { user },
  accounts,
  financials,
  params: { company, fiscalYear, month },
  loading,
  getCompany,
  getFiscalYear,
  getMonth
}) => {
  const [balanceSheetAccounts, setbalanceSheetAccounts] = useState(null);
  useEffect(() => {
    if (user && accounts && financials && company && fiscalYear && month) {
      setbalanceSheetAccounts(
        calculateBalances(
          financials[0].consolidated,
          accounts[1].sections,
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
      setbalanceSheetAccounts(
        calculateBalances(
          financials[0].consolidated,
          accounts[1].sections,
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
      setbalanceSheetAccounts(
        calculateBalances(
          financials[0].consolidated,
          accounts[1].sections,
          company,
          value,
          month,
          getLastDay(value, month)
        )
      );
    }
    if (field === "company_dropdown") {
      getCompany(value);
      setbalanceSheetAccounts(
        calculateBalances(
          financials[0].consolidated,
          accounts[1].sections,
          value,
          fiscalYear,
          month,
          getLastDay(fiscalYear, month)
        )
      );
    }
  };

  const balanceSheetContent = () => {
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
            statement="Balance Sheet"
            onChangeHandler={onChangeHandler}
          />
          <InnerBackground>
            <StatementContainer>
              <PrintBtn />
              <Header
                statement="Balance Sheet"
                company={company}
                month={{ value: month, name: getMonthName(month) }}
                fiscal={fiscalYear}
                statement_id="balance_sheet"
              />
              <Table
                headers={[
                  `As of ${month + 1}/${year}`,
                  `As of ${month + 1}/${year - 1}`,
                  "Change"
                ]}
                sections={balanceSheetAccounts}
                statement_id="balance_sheet"
              />
            </StatementContainer>
          </InnerBackground>
        </Layout>
      );
    }
  };

  return balanceSheetContent();
};

BalanceSheet.propTypes = {
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
)(BalanceSheet);
