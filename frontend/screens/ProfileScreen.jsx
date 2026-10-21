// npx expo install @react-native-async-storage/async-storage

import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation, route }) { 
  // route - Provides information about the current screen, including parameters passed to it
  // navigation - Provides information about the current screen, including parameters passed to it
  const [user, setUser] = useState(route?.params?.user ?? null); // route conrtains the parameters passed to the screen. other than params there is key, name, path etc. 
  const [loading, setLoading] = useState(!route?.params?.user);

  useEffect(() => {
    let cancelled = false;

    const loadUser = async () => {
        try {
        if (route?.params?.user) {
            setUser(route.params.user);
        } 
        else {
            const savedUser = await AsyncStorage.getItem('user');

            if (!cancelled) {
                setUser(savedUser ? JSON.parse(savedUser) : null);
            }
        }
        } 
        catch (error) {
            console.warn('Could not load saved profile:', error);
        } 
        finally {
            if (!cancelled) {
                setLoading(false);
            }
        }
    };

    loadUser();

    return () => {
        cancelled = true;
    };
  }, [route?.params?.user]);

  // Cleanup function to set isMounted to false when the component unmounts.
    // It is called when the component is about to unmount, ensuring that any asynchronous operations do not attempt to update state after the component has been removed from the DOM. This prevents potential memory leaks and errors in the application.
    // works when loadUs
    // Why was this written?
    // AsyncStorage.getItem() is asynchronous.
    // Imagine this sequence:
    // 1. The Profile screen starts loading user data.
    // 2. The user navigates away from the Profile screen.
    // 3. The AsyncStorage operation finishes.
  const openSignup = () => {
    navigation.navigate('Signup');
  };

  const openLogin = () => {
    navigation.navigate('Login');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#35AA47" />
        {/* ActivityIndicator is a built-in React Native component that displays a spinning loading animation. */}
      </SafeAreaView>
    );
  }

  if (!user) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.guestContent}>
        <View style={styles.guestIcon}>
          <Ionicons name="person-outline" size={42} color="#35AA47" />
        </View>

        <Text style={styles.title}>Welcome to AgriMithra</Text>

        <Text style={styles.description}>
          Join the AgriMithra community to connect with fellow farmers,
          share your experiences, and discover new opportunities.
        </Text>

        <Pressable
          accessibilityRole="button"
          style={styles.primaryButton}
          onPress={openSignup}
        >
          <Text style={styles.primaryButtonText}>Create an Account</Text>
        </Pressable>

        <Text style={styles.loginPrompt}>
          Already have an account?{' '}
          <Text style={styles.loginText} onPress={openLogin}>
            Log in
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

  const profileImage = user.photoURL;
  const displayName = user.name;
  const email = user.email;

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
        </View>
      <View style={styles.profileContent}>
        
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.profilePlaceholder}>
            <Ionicons name="person" size={48} color="#35AA47" />
          </View>
        )}
        <Text style={styles.name}>{displayName}</Text>
        {email && <Text style={styles.email}>{email}</Text>}
        <View style={styles.buttonContainer}>
            <Pressable style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
            </Pressable>

            <Pressable style={styles.logoutButton}
                onPress={async () => {
                    await AsyncStorage.removeItem('user');
                    navigation.navigate('Profile');
                }}
            >
             <Text style={styles.logoutButtonText}>Log out</Text>
            </Pressable>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="leaf-outline" size={22} color="#35AA47" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Welcome to AgriMithra</Text>
            <Text style={styles.infoDescription}>
              Your farming community, all in one place.
            </Text>
          </View>
        </View>

        <View style={[styles.infoCard, {marginTop : '20', borderWidth: 1, borderColor: '#40404024',}]}>
            <Ionicons name="notifications-outline" size={22} color="#35AA47" />
            <Text style={styles.infoTitle}>Notifications</Text>
        </View>

        <View style={[styles.infoCard, {marginTop : '20', borderWidth: 1, borderColor: '#40404024',}]}>
            <Ionicons name="chatbubble-outline" size={22} color="#35AA47" />
            <Text style={styles.infoTitle}>Your Posts</Text>
        </View>
        
      </View>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F6',
    justifyContent: 'center',
  },
  guestContent: {
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  guestIcon: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#E7F5E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D2A1F',
    textAlign: 'center',
  },
  description: {
    // fontSize: 15,
    lineHeight: 22,
    color: '#68736A',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 24,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#35AA47',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  loginPrompt: {
    color: '#68736A',
    fontSize: 14,
    marginTop: 18,
  },
  loginText: {
    color: '#258537',
    fontWeight: '700',
  },
  profileContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 24,
  },
  screenTitle: {
    alignSelf: 'flex-start',
    fontSize: 20,
    fontWeight: '700',
    color: '#1D2A1F',
    marginBottom: 32,
  },
  profileImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#E7F5E8',
    borderWidth: 1,
    borderColor: '#35AA47',
  },
  profilePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 56,
    backgroundColor: '#E7F5E8',
    alignItems: 'center',
    justifyContent: 'center',   
    borderWidth: 2,
    borderColor: '#35aa47ad',
  },
  name: {
    color: '#1D2A1F',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
  },
  email: {
    color: '#68736A',
    fontSize: 14,
    marginTop: 6,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    marginTop: 32,
    gap: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    color: '#1D2A1F',
    // fontSize: 15,
    fontWeight: '500',
  },
  infoDescription: {
    color: '#68736A',
    fontSize: 13,
    marginTop: 4,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap : 16,
    marginTop: 16,
  },
  editButton: {
    backgroundColor: '#35AA47',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 40,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  logoutButton: {
    // width: '100%',
    backgroundColor: '#e24736',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 40,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  header: {
    minHeight: 68,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,         
    borderBottomColor: '#bbb9b99a', 
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#202923',
  },
});