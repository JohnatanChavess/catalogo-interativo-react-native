import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getProductById } from '../services/api';
import { colors } from '../styles/colors';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route }) => {
  const { productId } = route.params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(productId);
        setProduct(data);
      } catch (err) {
        setError('Falha ao carregar os detalhes do produto.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);
  
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }).current;
  
  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color={colors.primary} /></View>;
  }

  if (error) {
    return <View style={styles.centered}><Text style={styles.errorText}>{error}</Text></View>;
  }

  if (!product) {
    return <View style={styles.centered}><Text>Produto não encontrado.</Text></View>;
  }
  
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={product.images}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <View style={styles.pagination}>
        {product.images.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === activeIndex ? styles.dotActive : {}]}
          />
        ))}
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <View style={styles.priceRow}>
            <Text style={styles.discountedPrice}>R$ {discountedPrice.toFixed(2).replace('.', ',')}</Text>
            <Text style={styles.originalPrice}>R$ {product.price.toFixed(2).replace('.', ',')}</Text>
        </View>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: width, 
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.borderColor,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    fontFamily: 'Poppins_700Bold',
    color: colors.text,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  discountedPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginRight: 10,
    fontFamily: 'Poppins_700Bold',
  },
  originalPrice: {
    fontSize: 16,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
    fontFamily: 'Poppins_400Regular',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    fontFamily: 'Poppins_400Regular',
  },
  errorText: {
    color: colors.error,
  },
});

export default ProductDetailScreen;