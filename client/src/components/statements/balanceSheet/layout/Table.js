import React from "react";
import Section from "./Section";
import { TableStyles, TableHeader } from "../../layout/styles/Table.style";

const Table = ({ headers, sections, statement_id }) => {
  const loadTable = () => {
    if (headers && sections) {
      return (
        <TableStyles>
          <TableHeader>
            <tr>
              <th />
              {headers.map(header => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </TableHeader>
          <tbody>
            {sections.map(section => (
              <Section
                key={section.id}
                section={section}
                headers={headers}
                statement_id={statement_id}
              />
            ))}
          </tbody>
        </TableStyles>
      );
    } else {
      return null;
    }
  };
  return loadTable();
};

export default Table;
