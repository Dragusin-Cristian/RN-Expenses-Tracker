import { useLayoutEffect, useContext } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

const ManageExpense = ({ route, navigation }) => {
  const ExpensesCtx = useContext(ExpensesContext)
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId

  const selectedExpense = ExpensesCtx.expenses.find(expense => expense.id === editedExpenseId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit expense' : 'Add expense',
    })
  }, [navigation, isEditing])

  const deleteExpenseHanlder = () => {
    ExpensesCtx.deleteExpense(editedExpenseId)
    navigation.goBack()
  }

  const cancelHandler = () => {
    navigation.goBack()
  }

  const confirmHandler = (expenseData) => {
    if (isEditing) {
      ExpensesCtx.updateExpense(editedExpenseId, expenseData)
    } else {
      ExpensesCtx.addExpense(expenseData)
    }
    navigation.goBack()
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