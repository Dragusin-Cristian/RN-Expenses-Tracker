import { StyleSheet, View, Text, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormatedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = ({ onCancel, onSubmit, submitButtonLabel, defaultValues }) => {

  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormatedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  })

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setInputs(oldState => (
      {
        ...oldState,
        [inputIdentifier]: { value: enteredValue, isValid: true }
      }))
  }

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value || ''),
      description: inputs.description.value,
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid = expenseData.date?.toString() !== 'Invalid Date'
    const descriptionIdValid = expenseData.description.trim().length > 0

    if (!amountIsValid || !dateIsValid || !descriptionIdValid) {
      setInputs(oldState => ({
        amount: {
          value: oldState.amount.value,
          isValid: amountIsValid,
        },
        date: {
          value: oldState.date.value,
          isValid: dateIsValid,
        },
        description: {
          value: oldState.description.value,
          isValid: descriptionIdValid,
        }
      }))
      return
    }

    onSubmit(expenseData)
  }

  const formIsInvalid = !inputs.amount.isValid || !inputs.description.isValid || !inputs.date.isValid

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your expense</Text>
      <View style={styles.inputsRow}>
        <Input
          invalid={!inputs.amount.isValid}
          label={'Amount'}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputs.amount.value,
          }}
          style={styles.rowInput}
        />
        <Input
          invalid={!inputs.date.isValid}
          label={'Date'}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputs.date.value,
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        invalid={!inputs.description.isValid}
        label={'Description'}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, 'description'),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && <Text style={styles.errorText}>Invalid input values. Please check your entered data.</Text>}
      <View style={styles.buttons}>
        <Button
          mode={'flat'}
          onPress={onCancel}
          style={styles.button}
        >
          Cancel
        </Button>
        <Button
          onPress={submitHandler}
          style={styles.button}
        >
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
})

export default ExpenseForm;