import React from "react";
import styled from "styled-components";

const ParamGroup = styled.div`
  margin-left: 10px;
`;

const BudgPYParam = ({ onChangeHandler, budgPY }) => {
  const params = ["Budget", "Prior Year"];
  const onChange = e => {
    const fieldName = e.target.id;
    const fieldValue = e.target.value;

    onChangeHandler(fieldName, fieldValue);
  };

  return (
    <ParamGroup>
      <label htmlFor="budget_prior">Vs. Budget/Prior Year: </label>
      <select
        name="budget_prior"
        id="budget_prior"
        defaultValue={budgPY}
        onChange={onChange}
        className="custom-select"
      >
        {params.map(param => (
          <option key={param} value={param}>
            {param}
          </option>
        ))}
      </select>
    </ParamGroup>
  );
};

export default BudgPYParam;
