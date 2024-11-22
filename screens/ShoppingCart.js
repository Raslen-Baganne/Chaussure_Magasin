import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartListItem from '../src/Components/CartListItem';

const ShoppingCart = ({ route, navigation }) => {
  const [cart, setCart] = useState(route.params.cart); // Copier le panier depuis les paramètres

  // Sauvegarder le panier dans AsyncStorage
  const saveCartToStorage = async (newCart) => {
    try {
      await AsyncStorage.setItem('@cart', JSON.stringify(newCart)); // Sauvegarder le panier
    } catch (e) {
      console.error('Erreur lors de la sauvegarde du panier:', e);
    }
  };

  // Fonction pour augmenter la quantité d'un produit
  const handleIncreaseQuantity = (product) => {
    const newCart = cart.map(item =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(newCart);
    saveCartToStorage(newCart); // Sauvegarder après modification
  };

  // Fonction pour diminuer la quantité d'un produit
  const handleDecreaseQuantity = (product) => {
    const newCart = cart
      .map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0); // Supprimer si la quantité est 0
    setCart(newCart);
    saveCartToStorage(newCart); // Sauvegarder après modification
  };

  // Fonction pour retirer un produit du panier
  const handleRemoveFromCart = (product) => {
    const newCart = cart.filter(item => item.product.id !== product.id);
    setCart(newCart);
    saveCartToStorage(newCart); // Sauvegarder après modification
  };

  // Mise à jour du panier lors du retour
  useEffect(() => {
    navigation.setParams({ cart });
  }, [cart]);

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Votre panier est vide</Text>
      ) : (
        <FlatList
          data={cart}
          renderItem={({ item }) => (
            <CartListItem
              cartItem={item}
              onIncreaseQuantity={handleIncreaseQuantity}
              onDecreaseQuantity={handleDecreaseQuantity}
              onRemoveFromCart={handleRemoveFromCart} // Passer la fonction de suppression
            />
          )}
          keyExtractor={(item) => item.product.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ShoppingCart;
