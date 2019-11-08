import { getCompNumber } from "../../../utils/formatting";

export const calculateBalances = (
  financials,
  balanceSheetAccounts,
  company,
  fiscalYear,
  month,
  day
) => {
  const endYear = month >= 10 ? fiscalYear - 1 : fiscalYear;
  let co = getCompNumber(company);
  let balances, pyBalances;
  if (financials) {
    if (co !== 99) {
      balances = financials.filter(
        data =>
          data.GLCo === co &&
          data.Mth <= new Date(endYear, month, day) &&
          data.Type === "actual"
      );
      pyBalances = financials.filter(
        data =>
          data.GLCo === co &&
          data.Mth <= new Date(endYear - 1, month, day) &&
          data.Type === "actual"
      );
    } else {
      balances = financials.filter(
        data =>
          data.Mth <= new Date(endYear, month, day) && data.Type === "actual"
      );
      pyBalances = financials.filter(
        data =>
          data.Mth <= new Date(endYear - 1, month, day) &&
          data.Type === "actual"
      );
    }
    calcAccountTotals(balanceSheetAccounts, balances, "current");
    calcAccountTotals(balanceSheetAccounts, pyBalances, "py");
  }

  balanceSheetAccounts[3].total =
    balanceSheetAccounts[1].total + balanceSheetAccounts[2].total;

  balanceSheetAccounts[4].total =
    balanceSheetAccounts[0].total - balanceSheetAccounts[3].total;

  balanceSheetAccounts[3].pyTotal =
    balanceSheetAccounts[1].pyTotal + balanceSheetAccounts[2].pyTotal;

  balanceSheetAccounts[4].pyTotal =
    balanceSheetAccounts[0].pyTotal - balanceSheetAccounts[3].pyTotal;

  return balanceSheetAccounts;
};

const calcAccountTotals = (accounts, financials, type) => {
  accounts.map(section => {
    let sectionTotal = 0;
    if (section.type === "accounts")
      section.subsections.map(subsection => {
        let subsectionTotal = 0;
        subsection.accounts.map(account => {
          let accountTotal = 0;

          financials.map(data => {
            if (account.glacct.includes(data.Account)) {
              if (section.section === "Assets") {
                accountTotal += data.Amount;
              } else {
                accountTotal -= data.Amount;
              }
            }
            return data;
          });

          if (type === "current") {
            account.total = accountTotal;
          } else {
            account.pyTotal = accountTotal;
          }
          subsectionTotal += accountTotal;
          return account;
        });

        if (type === "current") {
          subsection.total = subsectionTotal;
        } else {
          subsection.pyTotal = subsectionTotal;
        }

        sectionTotal += subsectionTotal;
        return subsection;
      });

    if (type === "current") {
      section.total = sectionTotal;
    } else {
      section.pyTotal = sectionTotal;
    }

    return section;
  });
};
