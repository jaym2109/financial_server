import React, { Fragment } from "react";
import Account from "./Account";
import { numCurrency, numPct, numBps } from "../../../utils/formatting";
import {
  SectionHeader,
  SectionFooter,
  SectionFooterTotals,
  MarginFooter,
  MarginFooterTotals
} from "./styles/Section.style";

const marginComp = (section, headers, statement_id) => {
  if (statement_id === "forecast") {
    return section.forecastTotal !== 0 || section.annualBudget !== 0 ? (
      <Fragment>
        <MarginFooter colSpan="2">{section.section}</MarginFooter>
        <MarginFooterTotals>
          {numPct(section.forecastTotal, 2)}
        </MarginFooterTotals>
        <MarginFooterTotals>
          {numPct(section.annualBudget, 2)}
        </MarginFooterTotals>
        <MarginFooterTotals>
          {numBps(section.forecastTotal - section.annualBudget, 2)}
        </MarginFooterTotals>
      </Fragment>
    ) : null;
  } else if (headers[1] === "Budget") {
    return section.total !== 0 || section.budgetTotal !== 0 ? (
      <Fragment>
        <MarginFooter colSpan="2">{section.section}</MarginFooter>
        <MarginFooterTotals>{numPct(section.total, 2)}</MarginFooterTotals>

        <MarginFooterTotals>
          {numPct(section.budgetTotal, 2)}
        </MarginFooterTotals>
        <MarginFooterTotals>
          {numBps(section.total - section.budgetTotal, 2)}
        </MarginFooterTotals>
      </Fragment>
    ) : null;
  } else {
    return section.total !== 0 || section.pyTotal !== 0 ? (
      <Fragment>
        <MarginFooter colSpan="2">{section.section}</MarginFooter>
        <MarginFooterTotals>{numPct(section.total, 2)}</MarginFooterTotals>
        <MarginFooterTotals>{numPct(section.pyTotal, 2)}</MarginFooterTotals>
        <MarginFooterTotals>
          {numBps(section.total - section.pyTotal, 2)}
        </MarginFooterTotals>
      </Fragment>
    ) : null;
  }
};

const sectionComp = (section, headers, statement_id) => {
  if (statement_id === "forecast") {
    return (
      <Fragment>
        <SectionFooter colSpan="2">{section.section}</SectionFooter>
        <SectionFooterTotals>
          {numCurrency(section.forecastTotal, 0)}
        </SectionFooterTotals>
        <SectionFooterTotals>
          {numCurrency(section.annualBudget, 0)}
        </SectionFooterTotals>
        <SectionFooterTotals>
          {numCurrency(section.forecastTotal - section.annualBudget, 0)}
        </SectionFooterTotals>
      </Fragment>
    );
  } else if (headers[1] === "Budget") {
    return (
      <Fragment>
        <SectionFooter colSpan="2">{section.section}</SectionFooter>
        <SectionFooterTotals>
          {numCurrency(section.total, 0)}
        </SectionFooterTotals>
        <SectionFooterTotals>
          {numCurrency(section.budgetTotal, 0)}
        </SectionFooterTotals>
        <SectionFooterTotals>
          {numCurrency(section.total - section.budgetTotal, 0)}
        </SectionFooterTotals>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <SectionFooter colSpan="2">{section.section}</SectionFooter>
        <SectionFooterTotals>
          {numCurrency(section.total, 0)}
        </SectionFooterTotals>
        <SectionFooterTotals>
          {numCurrency(section.pyTotal, 0)}
        </SectionFooterTotals>
        <SectionFooterTotals>
          {numCurrency(section.total - section.pyTotal, 0)}
        </SectionFooterTotals>
      </Fragment>
    );
  }
};
const Section = ({ section, headers, sections, statement_id }) => {
  const headerContent = () => {
    if (
      (section.id === "gross-profit" || section.id === "gross-margin") &&
      sections[1].total === 0 &&
      sections[1].pyTotal === 0
    ) {
      return null;
    } else if (
      section.type === "accounts" &&
      section.total !== 0 &&
      section.pyTotal !== 0
    ) {
      return (
        <tr>
          <SectionHeader section={section.id} colSpan={headers.length + 2}>
            {section.section}
          </SectionHeader>
          {headers.map(header => (
            <td key={header} />
          ))}
        </tr>
      );
    } else if (section.type === "totals") {
      return <tr>{sectionComp(section, headers, statement_id)}</tr>;
    } else if (section.type === "margins") {
      return <tr>{marginComp(section, headers, statement_id)}</tr>;
    } else {
      return null;
    }
  };

  const footerContent = () => {
    if (
      section.type === "accounts" &&
      section.section !== "Taxes" &&
      section.section !== "Other Income (Expenses)" &&
      section.total !== 0 &&
      section.pyTotal !== 0
    ) {
      return <tr>{sectionComp(section, headers, statement_id)}</tr>;
    } else {
      return null;
    }
  };
  return (
    <Fragment>
      {headerContent()}
      {section.type === "accounts"
        ? section.accounts.map(account => (
            <Account
              key={account.id}
              account={account}
              headers={headers}
              statement_id={statement_id}
            />
          ))
        : null}
      {footerContent()}
    </Fragment>
  );
};

export default Section;
