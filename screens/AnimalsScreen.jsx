import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CategoryCard from '../components/CategoryCard';

const animals = [
  {
    id: 'cow',
    name: 'Cow',
    image: require('../assets/animals/cow.png'),
  },
  {
    id: 'goat',
    name: 'Goat',
    image: require('../assets/animals/goat.png'),
  },
  {
    id: 'chicken',
    name: 'Chicken',
    image: require('../assets/animals/chicken.png'),
  },
];

export default function AnimalsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.header}>

            <Pressable
                onPress={() => navigation.goBack()}
                style={styles.backButton}
            >
                <Ionicons
                name="arrow-back"
                size={34}
                color="#111"
                />
            </Pressable>

            <View style={styles.headerText}>
                <Text style={styles.title}>Animals</Text>

                <Text style={styles.subtitle}>
                Explore and learn about different Farm Animals
                </Text>
            </View>

        </View>

        <View style={styles.animalList}>
          {animals.map((crop) => (
            <CategoryCard
                key={crop.id}
                item={crop}
                onPress={() =>
                navigation.navigate('CropDetails', {
                    crop,
                })
                }
            />
            ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    content: {
        paddingBottom: 24,
    },

    header: {
        flexDirection: 'column',
        alignItems: 'left',
        paddingHorizontal: 20,
        marginTop: 12,
        marginBottom: 24,
    },

    backButton: {
        marginVertical : 15
    },

    headerText: {
    flex: 1,
    },

    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#111',
    },

    subtitle: {
        fontSize: 15,
        color: '#777',
        marginTop: 6,
    },

    animalList: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 16,
    },
});