import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

const RecentExpenses = () => {
  const ExpensesCtx = useContext(ExpensesContext)

  const recentExpences = ExpensesCtx.expenses.filter(expense => {
    const today = new Date()
    const date7DaysAgo = getDateMinusDays(today, 7)
    return expense.date > date7DaysAgo
  })

  return (
    <ExpensesOutput expenses={recentExpences} expensesPeriod={'Last 7 days'} />
  );
};

export default RecentExpenses;