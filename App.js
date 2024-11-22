import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductScreen from './screens/ProductScreen';
import ShoppingCart from './screens/ShoppingCart';

const Stack = createStackNavigator();

const App = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const productIndex = prevCart.findIndex(item => item.product.id === product.id);
      if (productIndex === -1) {
        return [...prevCart, { product, quantity: 1 }];
      } else {
        const updatedCart = [...prevCart];
        updatedCart[productIndex].quantity += 1;
        return updatedCart;
      }
    });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductScreen">
        <Stack.Screen
          name="ProductScreen"
          component={ProductScreen}
          initialParams={{ cart, onAddToCart: handleAddToCart }}
        />
        <Stack.Screen
          name="ShoppingCart"
          component={ShoppingCart}
          initialParams={{ cart }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
