import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

const CartListItem = ({ cartItem, onIncreaseQuantity, onDecreaseQuantity }) => {
  const increaseQuantity = () => {
    onIncreaseQuantity(cartItem.product);
  };

  const decreaseQuantity = () => {
    onDecreaseQuantity(cartItem.product);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: cartItem.product.image }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{cartItem.product.name}</Text>
        <Text style={styles.size}>Size {cartItem.size}</Text>
        <View style={styles.footer}>
          <Pressable onPress={decreaseQuantity}>
            <Feather color="gray" name="minus-circle" size={24} />
          </Pressable>
          <Text style={styles.quantity}>{cartItem.quantity}</Text>
          <Pressable onPress={increaseQuantity}>
            <Feather color="gray" name="plus-circle" size={24} />
          </Pressable>
          <Text style={styles.itemTotal}>${cartItem.product.price * cartItem.quantity}</Text>
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { padding: 10, paddingHorizontal: 20, flexDirection: 'row' },
  contentContainer: { flex: 1, marginLeft: 10 },
  image: { width: '40%', aspectRatio: 1 },
  name: { fontWeight: '500', fontSize: 18 },
  size: { fontSize: 16, color: 'gray' },
  quantity: { marginHorizontal: 10, fontWeight: 'bold', color: 'gray' },
  footer: { marginTop: 'auto', flexDirection: 'row', alignItems: 'center' },
  itemTotal: { fontSize: 16, marginLeft: 'auto', fontWeight: '500' },
});

export default CartListItem;
