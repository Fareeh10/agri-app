import React from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';

export default function CategoryCard({ item, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <Image
        source={item.image}
        style={styles.image}
      />

      <Text style={styles.name}>
        {item.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',

    backgroundColor: '#fff',

    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 17,
    
    justifyContent: 'center',
    alignItems: 'center',

    padding: 40,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,

    elevation: 4,
  },

  pressed: {
    opacity: 0.75,
  },

  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  name: {
    // fontSize: 14,
    fontWeight: '500',
  },
});