import React from "react";
import CompanyParam from "./CompanyParam";
import FiscalYearParam from "./FiscalYearParam";
import MonthParam from "./MonthParam";
import BudgPYParam from "./BudgPYParam";
import styled from "styled-components";

const NavBar = styled.div`
  color: #fff;
  display: flex;
  justify-content: space-between;
  max-width: 1366px;
  width: 90%;
  background: #272121;

  @media print {
    display: none;
  }
`;

const ParamsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  width: 50%;
  padding: 50px 30px;
`;

const ParamsBar = ({
  company,
  fiscal,
  month,
  budgetPY,
  onChangeHandler,
  statement
}) => {
  const params = () => {
    if (statement === "Balance Sheet" || statement === "Cash Flow") {
      return (
        <NavBar>
          <ParamsContainer>
            <CompanyParam company={company} onChangeHandler={onChangeHandler} />
          </ParamsContainer>
          <ParamsContainer>
            <FiscalYearParam
              fiscal={fiscal}
              onChangeHandler={onChangeHandler}
            />
            <MonthParam month={month} onChangeHandler={onChangeHandler} />
          </ParamsContainer>
        </NavBar>
      );
    } else if (statement === "Income Statement") {
      return (
        <NavBar>
          <ParamsContainer>
            <CompanyParam company={company} onChangeHandler={onChangeHandler} />
            <BudgPYParam
              budgetPY={budgetPY}
              onChangeHandler={onChangeHandler}
            />
          </ParamsContainer>
          <ParamsContainer>
            <FiscalYearParam
              fiscal={fiscal}
              onChangeHandler={onChangeHandler}
            />
            <MonthParam month={month} onChangeHandler={onChangeHandler} />
          </ParamsContainer>
        </NavBar>
      );
    } else {
      return (
        <NavBar>
          <ParamsContainer>
            <CompanyParam company={company} onChangeHandler={onChangeHandler} />
          </ParamsContainer>
        </NavBar>
      );
    }
  };

  return (
    <nav className="navbar navbar-light bg-light d-print-none">{params()}</nav>
  );
};

export default ParamsBar;
