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

const crops = [
  {
    id: 'rice',
    name: 'Rice',
    image: require('../assets/crops/rice.png'),
  },
  {
    id: 'tomato',
    name: 'Tomato',
    image: require('../assets/crops/tomato.png'),
  },
  {
    id: 'banana',
    name: 'Banana',
    image: require('../assets/crops/banana.png'),
  },
  {
    id: 'barley',
    name: 'Barley',
    image: require('../assets/crops/barley.png'),
  },
  {
    id: 'coconut',
    name: 'Coconut',
    image: require('../assets/crops/coconut.png'),
  },
  {
    id: 'rubber',
    name: 'Rubber',
    image: require('../assets/crops/rubber.png'),
  },
  
];

export default function CropsScreen({ navigation }) {
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
                <Text style={styles.title}>Crops</Text>

                <Text style={styles.subtitle}>
                Explore and learn about different crops
                </Text>
            </View>

        </View>

        <View style={styles.cropsList}>
          {crops.map((crop) => (
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
        backgroundColor: '#ffffff00',
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
        fontSize: 28,
        fontWeight: '700',
        color: '#111',
    },

    subtitle: {
        fontSize: 15,
        color: '#777',
        marginTop: 6,
    },

    cropsList: {
        paddingHorizontal: 25,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 16,
    },
});