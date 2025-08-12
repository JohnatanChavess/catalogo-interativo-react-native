import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

import MensProductsTab from './tabs/MensProductsTab';
import WomensProductsTab from './tabs/WomensProductsTab';

const Tab = createMaterialTopTabNavigator();

const ProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => dispatch(logout())} title="Sair" color="red" />
      ),
    });
  }, [navigation, dispatch]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <Tab.Navigator>
        <Tab.Screen name="Masculino" component={MensProductsTab} />
        <Tab.Screen name="Feminino" component={WomensProductsTab} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default ProductsScreen;