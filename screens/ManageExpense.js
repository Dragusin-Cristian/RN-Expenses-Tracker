import { useLayoutEffect, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpense = ({ route, navigation }) => {
  const ExpensesCtx = useContext(ExpensesContext)
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [error, setError] = useState(null)
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId

  const selectedExpense = ExpensesCtx.expenses.find(expense => expense.id === editedExpenseId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit expense' : 'Add expense',
    })
  }, [navigation, isEditing])

  const deleteExpenseHanlder = async () => {
    setIsSubmiting(true)
    try {
      await deleteExpense(editedExpenseId)
      ExpensesCtx.deleteExpense(editedExpenseId)
      navigation.goBack()
    } catch (e) {
      setError('Could not delete expense - please try again later.')
    }
    setIsSubmiting(false)
  }

  const cancelHandler = () => {
    navigation.goBack()
  }

  const confirmHandler = async (expenseData) => {
    setIsSubmiting(true)
    try {
      if (isEditing) {
        ExpensesCtx.updateExpense(editedExpenseId, expenseData)
        await updateExpense(editedExpenseId, expenseData)
      } else {
        const id = await storeExpense(expenseData)
        ExpensesCtx.addExpense({ ...expenseData, id: id })
      }
      navigation.goBack()
    } catch (e) {
      setError('Could not save data - please try again later')
      setIsSubmiting(false)
    }
  }

  const errorHandler = () => {
    setError(null)
  }

  if (error && !isSubmiting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }

  if (isSubmiting) {
    return <LoadingOverlay />
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        defaultValues={selectedExpense}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
      />
      {isEditing &&
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHanlder}
          />
        </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
})

export default ManageExpense;