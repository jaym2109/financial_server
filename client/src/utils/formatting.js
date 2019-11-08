// Currency format
export const numCurrency = (x, d = 0) => {
  return (
    "$" +
    x
      .toFixed(d)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      .replace(/-(.*)/, "($1)")
  ).replace("$(", "($");
};

// Pct format
export const numPct = (x, d = 2) => {
  return ((x * 100).toFixed(d).replace(/-(.*)/, "($1)") + "%").replace(
    ")%",
    "%)"
  );
};

// bps format
export const numBps = (x, d = 2) => {
  return ((x * 100).toFixed(d).replace(/-(.*)/, "($1)") + " bps").replace(
    ") bps",
    " bps)"
  );
};

// Month Name Format
export const getMonthName = mth => {
  switch (mth) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return "Unknown";
  }
};

export const getActualYear = (year, month) => {
  if (month >= 10) {
    return year;
  } else {
    return year + 1;
  }
};

// Get Last Day of Month
export const getLastDay = (fiscalYear, month) => {
  const year = month >= 10 ? fiscalYear + 1 : fiscalYear;
  const dateField = new Date(year, month, 1);
  return new Date(
    dateField.getFullYear(),
    dateField.getMonth() + 1,
    0
  ).getDate();
};

// Default Dates
export const getDateDefaults = () => {
  const currDate = new Date();

  const month =
    currDate.getDate() <= 10
      ? currDate.getMonth() - 2
      : currDate.getMonth() - 1;

  const year = currDate.getFullYear();

  const fiscalYear =
    currDate.getMonth() >= 10
      ? currDate.getFullYear() + 1
      : currDate.getFullYear();

  return {
    month: month,
    year: year,
    fiscalYear: fiscalYear
  };
};

// Get the full Company Name
export const getCompanyName = comp => {
  switch (comp) {
    case "JAM":
      return "J.A. Macdonald Ltd.";
    case "OP":
      return "Ontario Panelization a d/o Exterior Wall Systems Ltd.";
    case "ALM":
      return "A.L.M. Building Ltd.";
    case "ALX":
      return "Alcotex Inc.";
    case "ELX":
      return "Elemex Inc.";
    case "WBS":
      return "Woollatt Building Supply Ltd.";
    case "ALL":
      return "Macdonald Group of Companies";
    default:
      return "Unknown";
  }
};

export const getCompNumber = company => {
  switch (company) {
    case "ALL":
      return 99;
    case "JAM":
      return 1;
    case "OP":
      return 3;
    case "ALM":
      return 4;
    case "ALX":
      return 6;
    case "ELX":
      return 7;
    case "WBS":
      return 10;
    default:
      return -1;
  }
};
