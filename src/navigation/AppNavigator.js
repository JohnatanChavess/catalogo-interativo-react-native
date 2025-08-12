import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import LoginScreen from '../screens/LoginScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProductsScreen from '../screens/ProductsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  // Lê o estado 'isLoggedIn' da nossa store Redux
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          // Se estiver logado, mostra as telas principais
          <>
            <Stack.Screen name="Products" component={ProductsScreen} options={{ title: 'Catálogo' }} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Detalhe do Produto' }} />
          </>
        ) : (
          // Se não, mostra apenas a tela de Login
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;