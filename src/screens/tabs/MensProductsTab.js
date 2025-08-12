import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, SectionList, StyleSheet, Text, View } from 'react-native';
import ProductCard from '../../components/ProductCard';
import { getProductsByCategory } from '../../services/api';

const MensProductsTab = ({ navigation }) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const categories = ['mens-shirts', 'mens-shoes', 'mens-watches'];
      
      const promises = categories.map(async (category) => {
        const products = await getProductsByCategory(category);
        return {
          title: category.replace(/-/g, ' ').toUpperCase(),
          data: products, // A 'data' aqui é a lista de produtos da seção
        };
      });
      
      const allSections = await Promise.all(promises);
      // O 'data' de cada seção agora é um array com um único item: a própria lista de produtos.
      // Isso força o renderItem a ser chamado apenas uma vez por seção.
      const formattedSections = allSections
        .filter(section => section.data.length > 0)
        .map(section => ({ ...section, data: [section.data] }));

      setSections(formattedSections);

    } catch (err) {
      setError('Falha ao carregar os produtos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color="#008080" /></View>;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>{error}</Text>
        <Button title="Tentar Novamente" onPress={loadProducts} />
      </View>
    );
  }

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => 'section-' + index}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
      // O renderItem agora recebe a lista completa de produtos da seção
      renderItem={({ item }) => (
        <View style={styles.gridContainer}>
          {item.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
            />
          ))}
        </View>
      )}
      stickySectionHeadersEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
    color: '#008080',
    textTransform: 'uppercase',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // Distribui os cards no espaço
    paddingHorizontal: 5,
  }
});

export default MensProductsTab;