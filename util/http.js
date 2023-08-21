import axios from "axios"
import { REACT_APP_REALTIME_DATABASE_LINK } from '@env'

const expensesRoot = `${REACT_APP_REALTIME_DATABASE_LINK}/expenses`

export const storeExpense = async (expenseData) => {
  const response = await axios.post(
    expensesRoot + '.json',
    expenseData
  )
  const id = response.data.name
  return id
}

export const fetchExpenses = async () => {
  const response = await axios.get(expensesRoot + '.json')

  const expenses = []

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    }
    expenses.push(expenseObj)
  }

  return expenses
}

export const updateExpense = (id, expenseData) => {
  return axios.put(`${expensesRoot}/${id}.json`, expenseData)
}

export const deleteExpense = (id) => {
  return axios.delete(`${expensesRoot}/${id}.json`)
}
