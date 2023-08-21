import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
  const ExpensesCtx = useContext(ExpensesContext)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () => {
      setIsFetching(true)
      try {
        const expenses = await fetchExpenses()
        ExpensesCtx.setExpenses(expenses)
      } catch (e) {
        setError('Could not fetch expenses')
      }
      setIsFetching(false)
    })()
  }, [])

  const errorHandler = () => {
    setError(null)
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

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