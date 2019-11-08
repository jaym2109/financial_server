const viewpointQuery = () => {
  return `    SELECT		a.GLCo, 
                      LEFT(a.GLAcct,4) as Account, 
                      c.Mth, 
                      SUM(c.Amount) as Amount, 
                      'actual' as Type
              FROM GLAC a
              LEFT OUTER JOIN HQCO b
              ON a.GLCo = b.HQCo
              LEFT OUTER JOIN GLDT c
              ON a.GLCo = c.GLCo and a.GLAcct = c.GLAcct
              WHERE a.GLCo < 10 and a.GLCo <> 6
              GROUP BY a.GLCo, LEFT(a.GLAcct,4), c.Mth
              HAVING SUM(c.Amount) <> 0
              UNION ALL
              SELECT		a.GLCo, 
                      LEFT(a.GLAcct,4) as Account, 
                      c.Mth, 
                      SUM(c.Amount) as Amount, 
                      'actual' as Type
              FROM GLAC a
              LEFT OUTER JOIN HQCO b
              ON a.GLCo = b.HQCo
              LEFT OUTER JOIN GLDT c
              ON a.GLCo = c.GLCo and a.GLAcct = c.GLAcct
              WHERE a.GLCo = 6 and c.Mth < '2018-11-01'
              GROUP BY a.GLCo, LEFT(a.GLAcct,4), c.Mth
              HAVING SUM(c.Amount) <> 0
              UNION ALL
              SELECT	a.GLCo, 
                      LEFT(a.GLAcct, 4) as Account, 
                      a.Mth, 
                      SUM(a.BudgetAmt) as Amount, 
                      'budget' as Type
              FROM GLBD a
              WHERE BudgetAmt <> 0 and BudgetCode NOT LIKE '%.1%' and a.GLCo < 10
              GROUP BY a.GLCo, LEFT(a.GLAcct, 4), a.Mth
              UNION ALL
              SELECT	a.GLCo, 
                      LEFT(a.GLAcct, 4) as Account, 
                      a.Mth, 
                      SUM(a.BudgetAmt) as Amount, 
                      'forecast' as Type
              FROM GLBD a
              WHERE BudgetAmt <> 0 and BudgetCode LIKE '%.1%' and a.GLCo < 10
              GROUP BY a.GLCo, LEFT(a.GLAcct, 4), a.Mth
              `;
};

const spruceQuery = () => {
  const actual = `  
                    SELECT 10 as GLCo, b.GLAcct as Account, 1 as PostCycleNumber, 2013 as PostFiscalYear, a.GLATotEndBal as Amount, 'actual' as Type
                    FROM GLAccountTotalsActual a
                    JOIN GLAccounts b
                      ON a.GLIDInternal = b.GLIDInternal
                    WHERE a.GLATotFY = 2013 and b.GLCategory = 3
                    UNION ALL
                    SELECT 10 as GLCo, b.GLAcct as Account, c.PostCycleNumber, c.PostFiscalYear, SUM(a.GLDebAmt - a.GLCredAmt) as Amount, 'actual' as Type
                    FROM GLJournalDtl a 
                    LEFT OUTER JOIN GLAccounts b
                      ON a.GLID = b.GLIDInternal
                    LEFT OUTER JOIN GLJournalHdr c
                      ON a.DocIDInternal = c.DocIDInternal
                    WHERE c.PostCycleNumber <> 13 and c.PostFiscalYear < 2019
                    GROUP BY b.GLAcct, c.PostFiscalYear, c.PostCycleNumber
                    UNION ALL
                    SELECT 10 as GLCo, b.GLAcct as Account, c.PostCycleNumber, c.PostFiscalYear, SUM(a.GLDebAmt - a.GLCredAmt) as Amount, 'actual' as Type
                      FROM GLJournalDtl a
                      LEFT OUTER JOIN GLAccounts b
                        ON a.GLID = b.GLIDInternal
                      LEFT OUTER JOIN GLJournalHdr c
                        ON a.DocIDInternal = c.DocIDInternal
                      WHERE c.PostCycleNumber < 1 and c.PostFiscalYear = 2019
                      GROUP BY b.GLAcct, c.PostFiscalYear, c.PostCycleNumber`;

  let budget = "";

  for (let i = 1; i < 13; i++) {
    budget += ` UNION ALL
                SELECT '10' as GLCo, GLAcct as Account, '${i}' as PostCycleNumber, GLBTotFY as PostFiscalYear, CASE WHEN GLAcct < 50000 OR (GLAcct > 80000 AND GLAcct < 90000) THEN - GLBCycleAmount${i} ELSE GLBCycleAmount${i} END as Amount, 'budget' as Type
                FROM GLAccountTotalsBudget a
                LEFT OUTER JOIN GLAccounts b 
                  ON a.GLIDInternal = b.GLIDInternal
                WHERE a.GLBTotAmount <> 0 and GLBTotFY < 2020
                `;
  }

  return `${actual} ${budget} ORDER BY PostFiscalYear DESC, PostCycleNumber DESC`;
};

const dynamicsQuery = () => {
  return `SELECT  b.ACTNUMBR_1 as Company, 
                  TRXDATE as Mth, 
                  CAST(LEFT(b.ACTNUMBR_2,4) as nvarchar) + '99' as Account, a.DEBITAMT - a.CRDTAMNT as Amount, 'actual' as Type
  FROM GL20000 a
  JOIN GL00100 b
    ON a.ACTINDX = b.ACTINDX
    WHERE TRXDATE > '2018-10-31'   
  UNION ALL
  SELECT b.ACTNUMBR_1 as Company, TRXDATE as Mth, CAST(LEFT(b.ACTNUMBR_2,4) as nvarchar) + '99' as Account, a.DEBITAMT - a.CRDTAMNT as Amount, 'actual' as Type
  FROM GL30000 a
  JOIN GL00100 b
    ON a.ACTINDX = b.ACTINDX
    WHERE TRXDATE > '2018-10-31'
    `;
};

module.exports = { viewpointQuery, spruceQuery, dynamicsQuery };
