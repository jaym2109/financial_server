import React from "react";
import Section from "./Section";
import { TableStyles, TableHeader } from "./styles/Table.style";

const Table = ({ headers, accounts, statement_id }) => {
  const loadTable = () => {
    if (headers && accounts) {
      return (
        <TableStyles>
          <TableHeader>
            <tr>
              <th scope="col" colSpan="2" />
              {headers.map(header => (
                <th scope="col" className="text-right mr-2" key={header}>
                  {header}
                </th>
              ))}
            </tr>
          </TableHeader>
          <tbody>
            {accounts.map(section => (
              <Section
                key={section.id}
                section={section}
                sections={accounts}
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
