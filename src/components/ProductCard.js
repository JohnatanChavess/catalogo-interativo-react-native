import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../styles/colors';

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 15;

const ProductCard = ({ product, onPress }) => {
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{product.description}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.discountedPrice}>R$ {discountedPrice.toFixed(2).replace('.', ',')}</Text>
          <Text style={styles.originalPrice}>R$ {product.price.toFixed(2).replace('.', ',')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: colors.white,
    borderRadius: 8,
    margin: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'Poppins_700Bold',
    color: colors.text,
  },
  description: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
    height: 32,
    fontFamily: 'Poppins_400Regular',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountedPrice: {
    fontSize: 14,
    color: colors.primary, 
    marginRight: 8,
    fontFamily: 'Poppins_700Bold',
  },
  originalPrice: {
    fontSize: 12,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
    fontFamily: 'Poppins_400Regular',
  },
});

export default ProductCard;