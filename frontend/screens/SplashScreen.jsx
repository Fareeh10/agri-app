import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({ navigation }) {

  useEffect(() => {
    let cancelled = false;

    const restoreSession = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      try {
        const savedUser = await AsyncStorage.getItem('user');
        if (cancelled) return;

        if (savedUser) {
          navigation.replace('Main', {
            screen: 'Home',
            params: { user: JSON.parse(savedUser) },
          });
        } else {
          navigation.replace('Main');
        }
      } catch (error) {
        console.warn('Could not restore saved session:', error);
        if (!cancelled) navigation.replace('Main');
      }
    };

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/image.png')}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(53, 170, 71)', //rgb(21, 120, 63)
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#fff',
    marginTop: 10,
  },

  logo: {
    width: 150,
    height: 150
  },
});