import { View, Text, StyleSheet, Button } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const ErrorOverlay = ({ message, onConfirm }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An errror occured!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm} title={'Okay'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 20,

  }

})

export default ErrorOverlay;