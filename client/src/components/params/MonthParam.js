import React from "react";

const MonthParam = ({ month, onChangeHandler }) => {
  const months = [
    {
      value: 0,
      name: "January"
    },
    {
      value: 1,
      name: "February"
    },
    {
      value: 2,
      name: "March"
    },
    {
      value: 3,
      name: "April"
    },
    {
      value: 4,
      name: "May"
    },
    {
      value: 5,
      name: "June"
    },
    {
      value: 6,
      name: "July"
    },
    {
      value: 7,
      name: "August"
    },
    {
      value: 8,
      name: "September"
    },
    {
      value: 9,
      name: "October"
    },
    {
      value: 10,
      name: "November"
    },
    {
      value: 11,
      name: "December"
    }
  ];

  const onChange = e => {
    const fieldName = e.target.id;
    const fieldValue = e.target.value;

    onChangeHandler(fieldName, fieldValue);
  };

  return (
    <div className="form-group">
      <label htmlFor="month_dropdonw">Month: </label>
      <select
        name="month_dropdown"
        id="month_dropdown"
        defaultValue={month.value}
        onChange={onChange}
        className="custom-select"
      >
        {months.map(mth => (
          <option key={mth.value} value={mth.value}>
            {mth.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthParam;
