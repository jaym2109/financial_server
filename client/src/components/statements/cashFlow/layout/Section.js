import React, { Fragment } from "react";
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
        </tr>
      )}
      {section.type === "accounts" &&
        (section.total !== 0) && (
          <tr>
            <SectionFooter>Total {section.section}</SectionFooter>
            <SectionFooterTotals>
              {numCurrency(section.total)}
            </SectionFooterTotals>
          </tr>
        )}
    </Fragment>
  );
};

export default Section;
