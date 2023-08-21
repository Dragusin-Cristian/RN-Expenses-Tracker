import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

const RecentExpenses = () => {
  const ExpensesCtx = useContext(ExpensesContext)

  useEffect(() => {
    (async () => {
      const expenses = await fetchExpenses()
      ExpensesCtx.setExpenses(expenses)
    })()
  }, [])

  const recentExpences = ExpensesCtx.expenses.filter(expense => {
    const today = new Date()
    const date7DaysAgo = getDateMinusDays(today, 7)
    return (expense.date > date7DaysAgo) && (expense.date <= today)
  })

  return (
    <ExpensesOutput
      expenses={recentExpences}
      expensesPeriod={'Last 7 days'}
      fallback={'No expences registered for the last 7 days.'}
    />
  );
};

export default RecentExpenses;