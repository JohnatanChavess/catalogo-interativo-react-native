import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../styles/colors'; // Importa nosso arquivo de cores

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: colors.primary, // Usa a cor primária do nosso tema
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: colors.white, // Usa a cor branca do nosso tema
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;