import React, { Fragment } from "react";
import Subsection from "../../layout/Subsection";
import { numCurrency } from "../../../../utils/formatting";
import {
  SectionHeader,
  SectionFooter,
  SectionFooterTotals
} from "../../layout/styles/Section.style";

const Section = ({ section, headers, statement_id }) => {
  return (
    <Fragment>
      {section.type === "accounts" ? (
        <tr>
          <SectionHeader section={section.id} colSpan="5">
            {section.section}
          </SectionHeader>
        </tr>
      ) : (
        <tr>
          <SectionFooter>Total {section.section}</SectionFooter>
          <SectionFooterTotals>
            {numCurrency(section.total)}
          </SectionFooterTotals>
          <SectionFooterTotals>
            {numCurrency(section.pyTotal)}
          </SectionFooterTotals>
          <SectionFooterTotals>
            {numCurrency(section.total - section.pyTotal)}
          </SectionFooterTotals>
        </tr>
      )}
      {section.type === "accounts" &&
        section.total !== 0 &&
        section.pyTotal !== 0 &&
        section.subsections.map(subsection => (
          <Subsection
            key={subsection.id}
            subsection={subsection}
            headers={headers}
            statement_id={statement_id}
          />
        ))}
      {section.type === "accounts" &&
        (section.total !== 0 || section.pyTotal !== 0) && (
          <tr>
            <SectionFooter>Total {section.section}</SectionFooter>
            <SectionFooterTotals>
              {numCurrency(section.total)}
            </SectionFooterTotals>
            <SectionFooterTotals>
              {numCurrency(section.pyTotal)}
            </SectionFooterTotals>
            <SectionFooterTotals>
              {numCurrency(section.total - section.pyTotal)}
            </SectionFooterTotals>
          </tr>
        )}
    </Fragment>
  );
};

export default Section;
