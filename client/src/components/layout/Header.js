import React from "react";
import { getCompanyName, getLastDay } from "../../utils/formatting";
import styled from "styled-components";

const HeaderStyle = styled.div`
  text-align: center;
  padding: 25px;
  color: #272121;

  h1 {
    font-size: 1.75rem;
    padding-bottom: 5px;
  }

  h3 {
    font-weight: 300;
    padding-bottom: 5px;
  }
`;

const Header = ({ statement, company, month, fiscal, statement_id }) => {
  const companyName = getCompanyName(company);
  const actualYear = month.value >= 10 ? fiscal - 1 : fiscal;
  const lastDay = getLastDay(actualYear, month.value);
  const dateLine = () => {
    if (statement_id === "income_statement") {
      return `For the month ended ${month.name} ${lastDay}, ${actualYear}`;
    } else if (statement_id === "forecast") {
      return `For Fiscal Year ${fiscal} as of ${
        month.name
      } ${lastDay}, ${actualYear}`;
    } else {
      return `As of ${month.name} ${lastDay}, ${actualYear}`;
    }
  };

  return (
    <HeaderStyle>
      <h1>{companyName}</h1>
      <h3>{statement}</h3>
      <h3>{dateLine()}</h3>
    </HeaderStyle>
  );
};

export default Header;
