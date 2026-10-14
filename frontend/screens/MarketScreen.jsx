import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const CATEGORIES = [
  { key: 'Pesticides', icon: 'bug-outline' },
  { key: 'Fertilizers', icon: 'flask-outline' },
  { key: 'Seeds', icon: 'leaf-outline' },
];

const PRODUCTS = [
  {
    id: '1',
    name: 'Agriventure Ameen Herbicide',
    subtitle: 'Selective weed control',
    brand: 'R K Chemicals',
    category: 'Pesticides',
    visual: '🧴',
    originalPrice: 399,
    price: 210,
    sizes: 5,
  },
  {
    id: '2',
    name: 'Agriventure Maxico Fungicide',
    subtitle: 'Protects crops from fungal diseases',
    brand: 'R K Chemicals',
    category: 'Pesticides',
    visual: '🛍️',
    originalPrice: 950,
    price: 529,
    sizes: 5,
  },
  {
    id: '3',
    name: 'Crop Shield Insecticide',
    subtitle: 'For common crop pests',
    brand: 'GreenGrow',
    category: 'Pesticides',
    visual: '🧪',
    originalPrice: 620,
    price: 420,
    sizes: 3,
  },
  {
    id: '4',
    name: 'Organic Growth Compost',
    subtitle: 'Supports healthy soil',
    brand: 'Nature Farm',
    category: 'Fertilizers',
    visual: '🌱',
    originalPrice: 500,
    price: 350,
    sizes: 4,
  },
  {
    id: '5',
    name: 'NPK Balanced Fertilizer',
    subtitle: 'Balanced plant nutrition',
    brand: 'AgriPlus',
    category: 'Fertilizers',
    visual: '🪴',
    originalPrice: 780,
    price: 599,
    sizes: 3,
  },
  {
    id: '6',
    name: 'Premium Vegetable Seeds',
    subtitle: 'Selected vegetable seed mix',
    brand: 'SeedWorks',
    category: 'Seeds',
    visual: '🌾',
    originalPrice: 180,
    price: 120,
    sizes: 2,
  },
  {
    id: '7',
    name: 'Hybrid Tomato Seeds',
    subtitle: 'Suitable for home and field gardens',
    brand: 'SeedWorks',
    category: 'Seeds',
    visual: '🍅',
    originalPrice: 250,
    price: 175,
    sizes: 3,
  },
];

export default function MarketScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Pesticides');
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchesCategory = product.category === selectedCategory;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.subtitle.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  const formatPrice = (price) => `₹${price.toLocaleString('en-IN')}`;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Market</Text>
        <Pressable
          style={styles.menuButton}
          onPress={() => {}}
          accessibilityRole="button"
          accessibilityLabel="More market options"
        >
          <Ionicons name="ellipsis-vertical" size={23} color="#28332B" />
        </Pressable>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={22} color="#66736A" />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search products, crops or brands"
          placeholderTextColor="#8B958D"
          autoCapitalize="none"
          returnKeyType="search"
          accessibilityLabel="Search market products"
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch('')} accessibilityLabel="Clear search">
            <Ionicons name="close-circle" size={20} color="#8B958D" />
          </Pressable>
        )}
      </View>

      <View style={styles.categoryBar}>
        {CATEGORIES.map((category) => {
          const active = selectedCategory === category.key;
          return (
            <Pressable
              key={category.key}
              style={[styles.categoryTab, active && styles.categoryTabActive]}
              onPress={() => setSelectedCategory(category.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
            >
              <Ionicons
                name={category.icon}
                size={20}
                color={active ? '#237A32' : '#303A32'}
              />
              <Text style={[styles.categoryText, active && styles.categoryTextActive]}>
                {category.key}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{selectedCategory}</Text>
          <Text style={styles.productCount}>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </Text>
        </View>

        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const discount = Math.round(
              ((product.originalPrice - product.price) / product.originalPrice) * 100,
            );
            return (
              <Pressable
                key={product.id}
                style={({ pressed }) => [styles.productCard, pressed && styles.cardPressed]}
                onPress={() => {}}
                accessibilityRole="button"
                accessibilityLabel={`${product.name}, from ${formatPrice(product.price)}`}
              >
                <View style={styles.productVisual}>
                  <Text style={styles.productEmoji}>{product.visual}</Text>
                  <View style={styles.visualLabel}>
                    <Text style={styles.visualLabelText}>{product.category}</Text>
                  </View>
                </View>

                <View style={styles.productInfo}>
                  <View style={styles.productCategoryRow}>
                    <Ionicons
                      name={CATEGORIES.find((item) => item.key === product.category)?.icon ?? 'leaf-outline'}
                      size={14}
                      color="#647268"
                    />
                    <Text style={styles.productCategory}>{product.category.slice(0, -1) === 'Fertilizer' ? 'Fertilizer' : product.category.slice(0, -1) === 'Pesticide' ? 'Pesticide' : 'Seeds'}</Text>
                  </View>
                  <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                  <Text style={styles.brand}>{product.brand}</Text>
                  <Text style={styles.productSubtitle} numberOfLines={1}>{product.subtitle}</Text>

                  <View style={styles.priceRow}>
                    <Text style={styles.originalPrice}>{formatPrice(product.originalPrice)}</Text>
                    <Text style={styles.discountBadge}>-{discount}%</Text>
                  </View>
                  <Text style={styles.currentPrice}>From {formatPrice(product.price)}</Text>
                  <Text style={styles.sizes}>{product.sizes} sizes available</Text>
                </View>
              </Pressable>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={36} color="#9AA69C" />
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptyDescription}>Try another search or choose a different category.</Text>
            <Pressable onPress={() => setSearch('')} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Clear search</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F5F3',
  },
  header: {
    minHeight: 68,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 27,
    fontWeight: '700',
    color: '#202923',
  },
  menuButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 14,
    marginBottom: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#D2DAD3',
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#263329',
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  categoryBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E7E2',
  },
  categoryTab: {
    flex: 1,
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingHorizontal: 5,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  categoryTabActive: {
    backgroundColor: '#EAF5EB',
    borderBottomColor: '#35AA47',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#303A32',
  },
  categoryTextActive: {
    color: '#237A32',
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  productList: {
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 28,
  },
  sectionHeader: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: '700',
    color: '#202923',
  },
  productCount: {
    fontSize: 15,
    color: '#737E75',
    marginTop: 4,
  },
  productCard: {
    minHeight: 218,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D6DE D7'.replace(' ', ''),
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.9,
  },
  productVisual: {
    width: '36%',
    minHeight: 190,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F7F1',
    borderRadius: 14,
    marginRight: 13,
    padding: 6,
  },
  productEmoji: {
    fontSize: 58,
  },
  visualLabel: {
    marginTop: 12,
    backgroundColor: '#E2F0E3',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  visualLabelText: {
    color: '#367640',
    fontSize: 10,
    fontWeight: '600',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 3,
  },
  productCategoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 6,
  },
  productCategory: {
    fontSize: 12,
    color: '#68756B',
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 21,
    color: '#202923',
  },
  brand: {
    fontSize: 13,
    color: '#69756C',
    marginTop: 5,
  },
  productSubtitle: {
    fontSize: 11,
    color: '#8A958C',
    marginTop: 3,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  originalPrice: {
    fontSize: 13,
    color: '#68736A',
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7844A2',
    backgroundColor: '#F1E2FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 14,
    overflow: 'hidden',
  },
  currentPrice: {
    fontSize: 17,
    fontWeight: '700',
    color: '#202923',
    marginTop: 6,
  },
  sizes: {
    fontSize: 12,
    color: '#78837A',
    marginTop: 7,
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#303A32',
    marginTop: 14,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#758078',
    textAlign: 'center',
    marginTop: 7,
    lineHeight: 20,
  },
  clearButton: {
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#E5F3E7',
  },
  clearButtonText: {
    color: '#237A32',
    fontSize: 14,
    fontWeight: '700',
  },
});