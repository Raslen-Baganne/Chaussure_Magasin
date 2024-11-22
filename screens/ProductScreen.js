import React, { useState } from 'react';
import { StyleSheet, View, Image, FlatList, Text, useWindowDimensions, ScrollView, Pressable, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Pour l'icône du panier
import products from '../src/data/products'; // Assurez-vous d'avoir votre fichier de données de produits

const ProductDetailsScreen = ({ product, onClose, onAddToCart, onRemoveFromCart, cartItem }) => {
    const { width } = useWindowDimensions();

    const addToCart = () => {
        Alert.alert("Ajout au panier", `${product.name} a été ajouté au panier!`);
        onAddToCart(product);
    };

    const removeFromCart = () => {
        onRemoveFromCart(product.id);
    };

    return (
        <View style={styles.detailsContainer}>
            <ScrollView>
                <FlatList
                    data={product.images}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={[styles.image, { width }]} />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.detailsContent}>
                    <Text style={styles.title}>{product.name}</Text>
                    <Text style={styles.price}>${product.price}</Text>
                    <Text style={styles.description}>{product.description}</Text>
                </View>
            </ScrollView>

            <Pressable style={styles.button} onPress={onClose}>
                <Text style={styles.buttonText}>Retour à la liste</Text>
            </Pressable>

            <Pressable onPress={addToCart} style={styles.addToCartButton}>
                <Text style={styles.buttonText}>Ajouter au panier</Text>
            </Pressable>

            {cartItem && (
                <Pressable onPress={removeFromCart} style={styles.removeFromCartButton}>
                    <Text style={styles.buttonText}>Retirer du panier</Text>
                </Pressable>
            )}
        </View>
    );
};

const ProductScreen = ({ navigation }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState([]); // Ajouter l'état pour le panier

    const handleAddToCart = (product) => {
        const productExists = cart.find(item => item.product.id === product.id);

        if (productExists) {
            // Si le produit existe déjà, on augmente la quantité
            setCart(cart.map(item =>
                item.product.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            // Sinon, on ajoute le produit avec une quantité initiale de 1
            setCart([...cart, { product, quantity: 1 }]);
        }
    };

    const handleIncreaseQuantity = (product) => {
        setCart(prevCart => prevCart.map(item =>
            item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        ));
    };

    const handleDecreaseQuantity = (product) => {
        setCart(prevCart => prevCart.map(item =>
            item.product.id === product.id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        ));
    };

    const handleRemoveFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    };

    const navigateToCart = () => {
        navigation.navigate('ShoppingCart', { cart }); // Passer le panier en paramètre
    };

    if (selectedProduct) {
        const cartItem = cart.find(item => item.product.id === selectedProduct.id);
        return (
            <ProductDetailsScreen
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                cartItem={cartItem}
            />
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Pressable style={styles.cartButton} onPress={navigateToCart}>
                <Feather name="shopping-cart" size={24} color="black" />
                <Text style={styles.cartItemCount}>{cart.length}</Text>
            </Pressable>

            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <Pressable onPress={() => setSelectedProduct(item)} style={styles.itemContainer}>
                        <Image source={{ uri: item.image }} style={styles.thumbnail} />
                        <Text style={styles.productName}>{item.name}</Text>
                    </Pressable>
                )}
                numColumns={2}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        width: "50%",
        padding: 1,
    },
    thumbnail: {
        width: '100%',
        aspectRatio: 1,
    },
    productName: {
        textAlign: 'center',
        paddingVertical: 5,
    },
    detailsContainer: {
        flex: 1,
    },
    image: {
        height: 300,
        resizeMode: 'cover',
    },
    detailsContent: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 20,
        color: '#888',
        marginVertical: 10,
    },
    description: {
        fontSize: 16,
        lineHeight: 22,
        color: '#555',
    },
    button: {
        backgroundColor: '#000',
        padding: 15,
        alignItems: 'center',
        marginVertical: 5,
    },
    addToCartButton: {
        backgroundColor: '#008CBA',
        padding: 15,
        alignItems: 'center',
        marginVertical: 5,
    },
    removeFromCartButton: {
        backgroundColor: '#FF6347',
        padding: 15,
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cartButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        zIndex: 1,
    },
    cartItemCount: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red',
        color: 'white',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 12,
    },
});

export default ProductScreen;
