import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import CustomButton from '../components/CustomButton';
import { loginSuccess } from '../store/authSlice';
import { colors } from '../styles/colors';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // 1. Simulação de credenciais corretas
    const correctUsername = 'aluno';
    const correctPassword = '123';

    // 2. Validação de campos vazios
    if (!username || !password) {
      setError('Campo obrigatório');
      return;
    }

    // 3. AQUI ESTÁ A NOVA VALIDAÇÃO
    // Verifica se os dados digitados são diferentes dos corretos
    if (username !== correctUsername || password !== correctPassword) {
      setError('Username ou senha inválidos'); // Define o erro do Figma
      return;
    }
    
    // Se passar por todas as validações, limpa o erro e faz o login
    setError('');
    const fakeUserData = { name: username };
    dispatch(loginSuccess(fakeUserData));
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Bem-vindo de volta!</Text>
        <Text style={styles.subtitle}>Insira seus dados para entrar na sua conta.</Text>
        
        {/* Mostra a mensagem de erro geral acima dos campos */}
        {error === 'Username ou senha inválidos' && <Text style={styles.generalErrorText}>{error}</Text>}

        <TextInput
          style={[styles.input, (error === 'Campo obrigatório' && !username) && styles.inputError]}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        {error === 'Campo obrigatório' && !username && <Text style={styles.fieldErrorText}>Campo obrigatório</Text>}

        <TextInput
          style={[styles.input, (error === 'Campo obrigatório' && !password) && styles.inputError]}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error === 'Campo obrigatório' && !password && <Text style={styles.fieldErrorText}>Campo obrigatório</Text>}

        
        <CustomButton title="Entrar" onPress={handleLogin} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  title: { 
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: colors.white,
    height: 55,
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 5,
    fontSize: 16,
  },
  inputError: {
    borderColor: colors.error,
  },
  fieldErrorText: {
    width: '100%',
    color: colors.error,
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'left',
  },
  generalErrorText: {
    color: colors.error,
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  }
});

export default LoginScreen;