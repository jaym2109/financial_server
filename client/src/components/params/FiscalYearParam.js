import React from "react";

const FiscalYearParam = ({ onChangeHandler, fiscal }) => {
  const years = ["2014", "2015", "2016", "2017", "2018", "2019", "2020"];
  const onChange = e => {
    const fieldName = e.target.id;
    const fieldValue = e.target.value;

    onChangeHandler(fieldName, fieldValue);
  };

  return (
    <div className="form-group">
      <label htmlFor="fiscal_years">Fiscal Year: </label>
      <select
        name="fiscal_years"
        id="fiscal_years"
        className="custom-select"
        defaultValue={fiscal}
        onChange={onChange}
      >
        {years.map(fy => (
          <option key={fy} value={fy}>
            {fy}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FiscalYearParam;
