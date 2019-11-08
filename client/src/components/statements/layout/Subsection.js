import React, { Fragment } from "react";
import Account from "./Account";
import { numCurrency } from "../../../utils/formatting";
import {
  SubSectionHeader,
  SubSectionFooter,
  SubSectionFooterTotals
} from "./styles/Section.style";

const Subsection = ({ subsection, headers, statement_id }) => {
  return (
    <Fragment>
      <tr>
        <SubSectionHeader subSection={subsection.id} colSpan={headers.length}>
          {subsection.subsection}
        </SubSectionHeader>
      </tr>
      {subsection.accounts.map(account => (
        <Account
          key={account.id}
          account={account}
          headers={headers}
          statement_id={statement_id}
        />
      ))}
      {subsection.subsection !== "Equity" && (
        <tr>
          <SubSectionFooter subSection={subsection.id}>
            {subsection.subsection} Total{" "}
          </SubSectionFooter>
          <SubSectionFooterTotals subSection={subsection.id}>
            {numCurrency(subsection.total)}{" "}
          </SubSectionFooterTotals>
          <SubSectionFooterTotals subSection={subsection.id}>
            {numCurrency(subsection.pyTotal)}
          </SubSectionFooterTotals>
          <SubSectionFooterTotals subSection={subsection.id}>
            {numCurrency(subsection.total - subsection.pyTotal)}
          </SubSectionFooterTotals>
        </tr>
      )}
    </Fragment>
  );
};

export default Subsection;
