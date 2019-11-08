import { getCompNumber } from "../../../utils/formatting";

export const calculateISTotals = (
  financials,
  incomeStatementAccounts,
  company,
  fiscalYear,
  month,
  day
) => {
  const endYear = month >= 10 ? fiscalYear - 1 : fiscalYear;
  let newFinancials,
    monthFinancials,
    pyFinancials,
    budgetFinancials,
    annualBudget,
    forecastFinancials;

  let co = getCompNumber(company);

  if (financials) {
    if (co !== 99) {
      newFinancials = financials.filter(
        data =>
          data.GLCo === co &&
          data.Mth >= new Date(fiscalYear - 1, 10, 1) &&
          data.Mth <= new Date(endYear, month, day) &&
          data.Type === "actual"
      );

      forecastFinancials = financials.filter(
        data =>
          data.GLCo === co &&
          data.Mth >= new Date(endYear, month, day) &&
          data.Mth <= new Date(endYear, 9, 31) &&
          data.Type === "forecast"
      );

      annualBudget = financials.filter(
        data =>
          data.GLCo === co &&
          data.Mth >= new Date(fiscalYear - 1, 10, 1) &&
          data.Mth <= new Date(fiscalYear, 9, 31) &&
          data.Type === "budget"
      );

      pyFinancials = financials.filter(
        data =>
          data.GLCo === co &&
          data.Mth >= new Date(fiscalYear - 2, 10, 1) &&
          data.Mth <= new Date(endYear - 1, month, day) &&
          data.Type === "actual"
      );
      budgetFinancials = financials.filter(
        data =>
          data.GLCo === co &&
          data.Mth >= new Date(fiscalYear - 1, 10, 1) &&
          data.Mth <= new Date(endYear, month, day) &&
          data.Type === "budget"
      );
      monthFinancials = financials.filter(
        data =>
          data.GLCo === co &&
          data.Mth >= new Date(endYear, month, 1) &&
          data.Mth <= new Date(endYear, month, day) &&
          data.Type === "actual"
      );
    } else {
      newFinancials = financials.filter(
        data =>
          data.Mth >= new Date(fiscalYear - 1, 10, 1) &&
          data.Mth <= new Date(endYear, month, day) &&
          data.Type === "actual"
      );

      forecastFinancials = financials.filter(
        data =>
          data.Mth >= new Date(endYear, month, day) &&
          data.Mth <= new Date(endYear, 9, 31) &&
          data.Type === "forecast"
      );

      annualBudget = financials.filter(
        data =>
          data.Mth >= new Date(fiscalYear - 1, 10, 1) &&
          data.Mth <= new Date(fiscalYear, 9, 31) &&
          data.Type === "budget"
      );
      pyFinancials = financials.filter(
        data =>
          data.Mth >= new Date(fiscalYear - 2, 10, 1) &&
          data.Mth <= new Date(endYear - 1, month, day) &&
          data.Type === "actual"
      );
      budgetFinancials = financials.filter(
        data =>
          data.Mth >= new Date(fiscalYear - 1, 10, 1) &&
          data.Mth <= new Date(endYear, month, day) &&
          data.Type === "budget"
      );
      monthFinancials = financials.filter(
        data =>
          data.Mth >= new Date(endYear, month, 1) &&
          data.Mth <= new Date(endYear, month, day) &&
          data.Type === "actual"
      );
    }

    newFinancials.map(data => {
      if (data.Account !== 4001 && data.Account !== 5001) {
        return forecastFinancials.push(data);
      }
    });

    annualBudget.map(data => {
      if (
        data.GLCo === 10 &&
        data.Mth >= new Date(endYear, month + 1, 1) &&
        data.Mth <= new Date(fiscalYear, 9, 31)
      ) {
        return forecastFinancials.push(data);
      }

      return null;
    });

    console.log(forecastFinancials);

    calcAccountTotals(incomeStatementAccounts, newFinancials, "current");
    calcAccountTotals(incomeStatementAccounts, pyFinancials, "py");
    calcAccountTotals(incomeStatementAccounts, budgetFinancials, "budget");
    calcAccountTotals(incomeStatementAccounts, annualBudget, "annual");
    calcAccountTotals(incomeStatementAccounts, forecastFinancials, "forecast");
    // Calculate Gross Profit

    incomeStatementAccounts[2].total = calcProfit(
      incomeStatementAccounts[0].total,
      incomeStatementAccounts[1].total
    );
    incomeStatementAccounts[2].annualBudget = calcProfit(
      incomeStatementAccounts[0].annualBudget,
      incomeStatementAccounts[1].annualBudget
    );
    incomeStatementAccounts[2].forecastTotal = calcProfit(
      incomeStatementAccounts[0].forecastTotal,
      incomeStatementAccounts[1].forecastTotal
    );
    incomeStatementAccounts[2].pyTotal = calcProfit(
      incomeStatementAccounts[0].pyTotal,
      incomeStatementAccounts[1].pyTotal
    );
    incomeStatementAccounts[2].budgetTotal = calcProfit(
      incomeStatementAccounts[0].budgetTotal,
      incomeStatementAccounts[1].budgetTotal
    );

    // Calculate Gross Profit Margin
    incomeStatementAccounts[3].total = calcMargin(
      incomeStatementAccounts[0].total,
      incomeStatementAccounts[2].total
    );
    incomeStatementAccounts[3].forecastTotal = calcMargin(
      incomeStatementAccounts[0].forecastTotal,
      incomeStatementAccounts[2].forecastTotal
    );
    incomeStatementAccounts[3].annualBudget = calcMargin(
      incomeStatementAccounts[0].annualBudget,
      incomeStatementAccounts[2].annualBudget
    );
    incomeStatementAccounts[3].pyTotal = calcMargin(
      incomeStatementAccounts[0].pyTotal,
      incomeStatementAccounts[2].pyTotal
    );
    incomeStatementAccounts[3].budgetTotal = calcMargin(
      incomeStatementAccounts[0].budgetTotal,
      incomeStatementAccounts[2].budgetTotal
    );
    // Calculate NOI
    incomeStatementAccounts[5].total = calcProfit(
      incomeStatementAccounts[2].total,
      incomeStatementAccounts[4].total
    );
    incomeStatementAccounts[5].forecastTotal = calcProfit(
      incomeStatementAccounts[2].forecastTotal,
      incomeStatementAccounts[4].forecastTotal
    );
    incomeStatementAccounts[5].annualBudget = calcProfit(
      incomeStatementAccounts[2].annualBudget,
      incomeStatementAccounts[4].annualBudget
    );
    incomeStatementAccounts[5].pyTotal = calcProfit(
      incomeStatementAccounts[2].pyTotal,
      incomeStatementAccounts[4].pyTotal
    );
    incomeStatementAccounts[5].budgetTotal = calcProfit(
      incomeStatementAccounts[2].budgetTotal,
      incomeStatementAccounts[4].budgetTotal
    );
    // Calculate NOP
    incomeStatementAccounts[6].total = calcMargin(
      incomeStatementAccounts[0].total,
      incomeStatementAccounts[5].total
    );
    incomeStatementAccounts[6].forecastTotal = calcMargin(
      incomeStatementAccounts[0].forecastTotal,
      incomeStatementAccounts[5].forecastTotal
    );
    incomeStatementAccounts[6].annualBudget = calcMargin(
      incomeStatementAccounts[0].annualBudget,
      incomeStatementAccounts[5].annualBudget
    );
    incomeStatementAccounts[6].pyTotal = calcMargin(
      incomeStatementAccounts[0].pyTotal,
      incomeStatementAccounts[5].pyTotal
    );
    incomeStatementAccounts[6].budgetTotal = calcMargin(
      incomeStatementAccounts[0].budgetTotal,
      incomeStatementAccounts[5].budgetTotal
    );
    // Calculate NIBT
    incomeStatementAccounts[8].total =
      incomeStatementAccounts[5].total + incomeStatementAccounts[7].total;

    incomeStatementAccounts[8].forecastTotal =
      incomeStatementAccounts[5].forecastTotal +
      incomeStatementAccounts[7].forecastTotal;

    incomeStatementAccounts[8].annualBudget =
      incomeStatementAccounts[5].annualBudget +
      incomeStatementAccounts[7].annualBudget;

    incomeStatementAccounts[8].pyTotal =
      incomeStatementAccounts[5].pyTotal + incomeStatementAccounts[7].pyTotal;

    incomeStatementAccounts[8].budgetTotal =
      incomeStatementAccounts[5].budgetTotal +
      incomeStatementAccounts[7].budgetTotal;

    // Calculate NIAT
    incomeStatementAccounts[10].total = calcProfit(
      incomeStatementAccounts[8].total,
      incomeStatementAccounts[9].total
    );

    incomeStatementAccounts[10].forecastTotal = calcProfit(
      incomeStatementAccounts[8].forecastTotal,
      incomeStatementAccounts[9].forecastTotal
    );
    incomeStatementAccounts[10].annualBudget = calcProfit(
      incomeStatementAccounts[8].annualBudget,
      incomeStatementAccounts[9].annualBudget
    );
    incomeStatementAccounts[10].pyTotal = calcProfit(
      incomeStatementAccounts[8].pyTotal,
      incomeStatementAccounts[9].pyTotal
    );
    incomeStatementAccounts[10].budgetTotal = calcProfit(
      incomeStatementAccounts[8].budgetTotal,
      incomeStatementAccounts[9].budgetTotal
    );
    // Calculate Net Profit
    incomeStatementAccounts[11].total = calcMargin(
      incomeStatementAccounts[0].total,
      incomeStatementAccounts[10].total
    );
    incomeStatementAccounts[11].forecastTotal = calcMargin(
      incomeStatementAccounts[0].forecastTotal,
      incomeStatementAccounts[10].forecastTotal
    );
    incomeStatementAccounts[11].annualBudget = calcMargin(
      incomeStatementAccounts[0].annualBudget,
      incomeStatementAccounts[10].annualBudget
    );
    incomeStatementAccounts[11].pyTotal = calcMargin(
      incomeStatementAccounts[0].pyTotal,
      incomeStatementAccounts[10].pyTotal
    );
    incomeStatementAccounts[11].budgetTotal = calcMargin(
      incomeStatementAccounts[0].budgetTotal,
      incomeStatementAccounts[10].budgetTotal
    );
  }

  return incomeStatementAccounts;
};

export const calcConsolidatedTotals = (
  financials,
  incomeStatementAccounts,
  fiscalYear,
  month,
  day
) => {
  const endYear = month >= 10 ? fiscalYear - 1 : fiscalYear;
  let jam, op, alm, alx, elx, wbs;
  let all = [];
  if (financials) {
    financials.map(data => {
      data.Mth = new Date(data.Mth);
      return (data.Mth = new Date(
        data.Mth.getFullYear(),
        data.Mth.getMonth(),
        data.Mth.getDate() + 1
      ));
    });

    jam = filterCompTotals(1, financials, fiscalYear, endYear, month, day);
    op = filterCompTotals(3, financials, fiscalYear, endYear, month, day);
    alm = filterCompTotals(4, financials, fiscalYear, endYear, month, day);
    alx = filterCompTotals(6, financials, fiscalYear, endYear, month, day);
    elx = filterCompTotals(7, financials, fiscalYear, endYear, month, day);
    wbs = filterCompTotals(10, financials, fiscalYear, endYear, month, day);
    all = jam.concat(op, alm, alx, elx, wbs);

    calcAccountTotals(incomeStatementAccounts, jam, "jam");
    calcAccountTotals(incomeStatementAccounts, op, "op");
    calcAccountTotals(incomeStatementAccounts, alm, "alm");
    calcAccountTotals(incomeStatementAccounts, alx, "alx");
    calcAccountTotals(incomeStatementAccounts, elx, "elx");
    calcAccountTotals(incomeStatementAccounts, wbs, "wbs");
    calcAccountTotals(incomeStatementAccounts, all, "all");

    console.log(incomeStatementAccounts);
  }

  // Gross Profit
  incomeStatementAccounts[2].jamTotal = calcProfit(
    incomeStatementAccounts[0].jamTotal,
    incomeStatementAccounts[1].jamTotal
  );

  incomeStatementAccounts[2].opTotal = calcProfit(
    incomeStatementAccounts[0].opTotal,
    incomeStatementAccounts[1].opTotal
  );

  incomeStatementAccounts[2].almTotal = calcProfit(
    incomeStatementAccounts[0].almTotal,
    incomeStatementAccounts[1].almTotal
  );

  incomeStatementAccounts[2].alxTotal = calcProfit(
    incomeStatementAccounts[0].alxTotal,
    incomeStatementAccounts[1].alxTotal
  );

  incomeStatementAccounts[2].elxTotal = calcProfit(
    incomeStatementAccounts[0].elxTotal,
    incomeStatementAccounts[1].elxTotal
  );

  incomeStatementAccounts[2].wbsTotal = calcProfit(
    incomeStatementAccounts[0].wbsTotal,
    incomeStatementAccounts[1].wbsTotal
  );

  incomeStatementAccounts[2].allTotal = calcProfit(
    incomeStatementAccounts[0].allTotal,
    incomeStatementAccounts[1].allTotal
  );

  // Calculate Gross Profit Margin
  incomeStatementAccounts[3].jamTotal = calcMargin(
    incomeStatementAccounts[0].jamTotal,
    incomeStatementAccounts[2].jamTotal
  );

  incomeStatementAccounts[3].opTotal = calcMargin(
    incomeStatementAccounts[0].opTotal,
    incomeStatementAccounts[2].opTotal
  );
  incomeStatementAccounts[3].almTotal = calcMargin(
    incomeStatementAccounts[0].almTotal,
    incomeStatementAccounts[2].almTotal
  );
  incomeStatementAccounts[3].alxTotal = calcMargin(
    incomeStatementAccounts[0].alxTotal,
    incomeStatementAccounts[2].alxTotal
  );
  incomeStatementAccounts[3].elxTotal = calcMargin(
    incomeStatementAccounts[0].elxTotal,
    incomeStatementAccounts[2].elxTotal
  );
  incomeStatementAccounts[3].wbsTotal = calcMargin(
    incomeStatementAccounts[0].wbsTotal,
    incomeStatementAccounts[2].wbsTotal
  );
  incomeStatementAccounts[3].allTotal = calcMargin(
    incomeStatementAccounts[0].allTotal,
    incomeStatementAccounts[2].allTotal
  );

  // Calculate NOI
  incomeStatementAccounts[5].jamTotal = calcProfit(
    incomeStatementAccounts[2].jamTotal,
    incomeStatementAccounts[4].jamTotal
  );
  incomeStatementAccounts[5].opTotal = calcProfit(
    incomeStatementAccounts[2].opTotal,
    incomeStatementAccounts[4].opTotal
  );
  incomeStatementAccounts[5].almTotal = calcProfit(
    incomeStatementAccounts[2].almTotal,
    incomeStatementAccounts[4].almTotal
  );
  incomeStatementAccounts[5].alxTotal = calcProfit(
    incomeStatementAccounts[2].alxTotal,
    incomeStatementAccounts[4].alxTotal
  );
  incomeStatementAccounts[5].elxTotal = calcProfit(
    incomeStatementAccounts[2].elxTotal,
    incomeStatementAccounts[4].elxTotal
  );
  incomeStatementAccounts[5].wbsTotal = calcProfit(
    incomeStatementAccounts[2].wbsTotal,
    incomeStatementAccounts[4].wbsTotal
  );
  incomeStatementAccounts[5].allTotal = calcProfit(
    incomeStatementAccounts[2].allTotal,
    incomeStatementAccounts[4].allTotal
  );

  // Calculate NOP
  incomeStatementAccounts[6].jamTotal = calcMargin(
    incomeStatementAccounts[0].jamTotal,
    incomeStatementAccounts[5].jamTotal
  );
  incomeStatementAccounts[6].opTotal = calcMargin(
    incomeStatementAccounts[0].opTotal,
    incomeStatementAccounts[5].opTotal
  );
  incomeStatementAccounts[6].almTotal = calcMargin(
    incomeStatementAccounts[0].almTotal,
    incomeStatementAccounts[5].almTotal
  );
  incomeStatementAccounts[6].alxTotal = calcMargin(
    incomeStatementAccounts[0].alxTotal,
    incomeStatementAccounts[5].alxTotal
  );
  incomeStatementAccounts[6].elxTotal = calcMargin(
    incomeStatementAccounts[0].elxTotal,
    incomeStatementAccounts[5].elxTotal
  );
  incomeStatementAccounts[6].wbsTotal = calcMargin(
    incomeStatementAccounts[0].wbsTotal,
    incomeStatementAccounts[5].wbsTotal
  );
  incomeStatementAccounts[6].allTotal = calcMargin(
    incomeStatementAccounts[0].allTotal,
    incomeStatementAccounts[5].allTotal
  );

  // Calculate NIBT
  incomeStatementAccounts[8].jamTotal =
    incomeStatementAccounts[5].jamTotal + incomeStatementAccounts[7].jamTotal;

  incomeStatementAccounts[8].opTotal =
    incomeStatementAccounts[5].opTotal + incomeStatementAccounts[7].opTotal;

  incomeStatementAccounts[8].almTotal =
    incomeStatementAccounts[5].almTotal + incomeStatementAccounts[7].almTotal;

  incomeStatementAccounts[8].alxTotal =
    incomeStatementAccounts[5].alxTotal + incomeStatementAccounts[7].alxTotal;

  incomeStatementAccounts[8].elxTotal =
    incomeStatementAccounts[5].elxTotal + incomeStatementAccounts[7].elxTotal;

  incomeStatementAccounts[8].wbsTotal =
    incomeStatementAccounts[5].wbsTotal + incomeStatementAccounts[7].wbsTotal;

  incomeStatementAccounts[8].allTotal =
    incomeStatementAccounts[5].allTotal + incomeStatementAccounts[7].allTotal;

  // Calculate NIAT
  incomeStatementAccounts[10].jamTotal = calcProfit(
    incomeStatementAccounts[8].jamTotal,
    incomeStatementAccounts[9].jamTotal
  );
  incomeStatementAccounts[10].opTotal = calcProfit(
    incomeStatementAccounts[8].opTotal,
    incomeStatementAccounts[9].opTotal
  );
  incomeStatementAccounts[10].almTotal = calcProfit(
    incomeStatementAccounts[8].almTotal,
    incomeStatementAccounts[9].almTotal
  );
  incomeStatementAccounts[10].alxTotal = calcProfit(
    incomeStatementAccounts[8].alxTotal,
    incomeStatementAccounts[9].alxTotal
  );
  incomeStatementAccounts[10].elxTotal = calcProfit(
    incomeStatementAccounts[8].elxTotal,
    incomeStatementAccounts[9].elxTotal
  );
  incomeStatementAccounts[10].wbsTotal = calcProfit(
    incomeStatementAccounts[8].wbsTotal,
    incomeStatementAccounts[9].wbsTotal
  );
  incomeStatementAccounts[10].allTotal = calcProfit(
    incomeStatementAccounts[8].allTotal,
    incomeStatementAccounts[9].allTotal
  );

  // Calculate Net Profit
  incomeStatementAccounts[11].jamTotal = calcMargin(
    incomeStatementAccounts[0].jamTotal,
    incomeStatementAccounts[10].jamTotal
  );
  incomeStatementAccounts[11].opTotal = calcMargin(
    incomeStatementAccounts[0].opTotal,
    incomeStatementAccounts[10].opTotal
  );
  incomeStatementAccounts[11].almTotal = calcMargin(
    incomeStatementAccounts[0].almTotal,
    incomeStatementAccounts[10].almTotal
  );
  incomeStatementAccounts[11].alxTotal = calcMargin(
    incomeStatementAccounts[0].alxTotal,
    incomeStatementAccounts[10].alxTotal
  );
  incomeStatementAccounts[11].elxTotal = calcMargin(
    incomeStatementAccounts[0].elxTotal,
    incomeStatementAccounts[10].elxTotal
  );
  incomeStatementAccounts[11].wbsTotal = calcMargin(
    incomeStatementAccounts[0].wbsTotal,
    incomeStatementAccounts[10].wbsTotal
  );
  incomeStatementAccounts[11].allTotal = calcMargin(
    incomeStatementAccounts[0].allTotal,
    incomeStatementAccounts[10].allTotal
  );
  return incomeStatementAccounts;
};

const calcProfit = (account1, account2) => account1 - account2;
const calcMargin = (account1, account2) =>
  account1 !== 0 ? account2 / account1 : 0;

const calcAccountTotals = (accounts, financials, type) => {
  accounts.map(section => {
    let sectionTotal = 0;
    if (section.type === "accounts") {
      section.accounts.map(account => {
        let accountTotal = 0;

        financials.map(data => {
          if (account.glacct.includes(data.Account)) {
            if (
              section.section === "Revenue" ||
              section.section === "Other Income (Expenses)"
            ) {
              accountTotal -= data.Amount;
            } else {
              accountTotal += data.Amount;
            }
          }
          return data;
        });

        switch (type) {
          case "current":
            account.total = accountTotal;
            break;
          case "py":
            account.pyTotal = accountTotal;
            break;
          case "annual":
            account.annualBudget = accountTotal;
            break;
          case "budget":
            account.budgetTotal = accountTotal;
            break;
          case "forecast":
            account.forecastTotal = accountTotal;
            break;
          case "jam":
            account.jamTotal = accountTotal;
            break;
          case "op":
            account.opTotal = accountTotal;
            break;
          case "alm":
            account.almTotal = accountTotal;
            break;
          case "alx":
            account.alxTotal = accountTotal;
            break;
          case "elx":
            account.elxTotal = accountTotal;
            break;
          case "wbs":
            account.wbsTotal = accountTotal;
            break;
          case "all":
            account.allTotal = accountTotal;
            break;
          default:
            return null;
        }
        sectionTotal += accountTotal;
        return account;
      });
    }
    switch (type) {
      case "current":
        section.total = sectionTotal;
        break;
      case "py":
        section.pyTotal = sectionTotal;
        break;
      case "annual":
        section.annualBudget = sectionTotal;
        break;
      case "budget":
        section.budgetTotal = sectionTotal;
        break;
      case "forecast":
        section.forecastTotal = sectionTotal;
        break;
      case "jam":
        section.jamTotal = sectionTotal;
        break;
      case "op":
        section.opTotal = sectionTotal;
        break;
      case "alm":
        section.almTotal = sectionTotal;
        break;
      case "alx":
        section.alxTotal = sectionTotal;
        break;
      case "elx":
        section.elxTotal = sectionTotal;
        break;
      case "wbs":
        section.wbsTotal = sectionTotal;
        break;
      case "all":
        section.allTotal = sectionTotal;
        break;
      default:
        return null;
    }
    return section;
  });
};

const filterCompTotals = (
  comp,
  financials,
  fiscalYear,
  endYear,
  month,
  day
) => {
  return financials.filter(
    data =>
      data.GLCo === comp &&
      data.Mth >= new Date(fiscalYear - 1, 10, 1) &&
      data.Mth <= new Date(endYear, month, day) &&
      data.Type === "actual"
  );
  // } else {
  //   financials.filter(
  //     data =>
  //       data.Mth >= new Date(fiscalYear - 1, 10, 1) &&
  //       data.Mth <= new Date(endYear, month, day) &&
  //       data.Type === "actual"
  //   );
  // }
};
