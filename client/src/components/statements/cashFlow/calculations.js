import { getCompNumber } from "../../../utils/formatting"; 

export const calculateCFTotals = (
    financials, 
    cashFlowAccounts, 
    company, 
    fiscalYear, 
    month, 
    day
) => {
    const endYear = month >= 10 ? fiscalYear - 1: fiscalYear; 
    let co = getCompNumber(company); 
    let cashFlows; 
    if (financials) {
        if (co !== 99) {
            cashFlows = financials.filter(
                data => 
                    data.GLCo === co && 
                    data.Mth <= new Date(endYear, month, day) && 
                    data.Type === 'actual'
            ); 
        } else {
            cashFlows = financials.filter(
                data => 
                    data.Mth <= new Date(endYear, month, day) &&
                    data.Type === "actual"
            ); 
        }
        calcAccountTotals(cashFlowAccounts, cashFlows, "current");
    }
    return cashFlowAccounts; 
}


const calcAccountTotals = (accounts, financials, type) => {
    accounts.map(section => {
      let sectionTotal = 0; 
      if (section.type === "accounts")
        section.accounts.map(account => {
            let accountTotal = 0;
            financials.map(data => {
                if (account.glacct.includes(data.Account)){
                    accountTotal += data.Amount; 
                }
                return data; 
            })
            account.total = accountTotal;
            sectionTotal += accountTotal; 
            return account;   
        });
        section.total = sectionTotal; 
        return section; 
    });
};