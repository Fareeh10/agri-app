import React, { useState } from 'react';
import {
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Missing details', 'Please enter your email and password.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Incorrect password', 'Your password must contain at least 6 characters.');
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Login failed. Please check your credentials.');
      }
    
      const obj = await response.json();
      console.log('Login successful:', obj);
      await AsyncStorage.setItem('user', JSON.stringify(obj));
      navigation.navigate('Main', {
        screen: 'Profile',
        params: { user: obj },
       });
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login failed', error.message);
    } finally {
      setLoading(false);
    }
  };
   
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <View style={styles.logoCircle}>
            <Ionicons name="leaf" size={38} color="#35AA47" />
          </View>

          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Log in to your AgriMithra account</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Email address</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#7A857B" />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#9AA39B"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                accessibilityLabel="Email address"
              />
            </View>

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#7A857B" />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#9AA39B"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                textContentType="password"
                accessibilityLabel="Password"
              />
              <Pressable
                onPress={() => setShowPassword((visible) => !visible)}
                accessibilityRole="button"
                accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                hitSlop={8}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={21}
                  color="#7A857B"
                />
              </Pressable>
            </View>

            <Pressable
              style={({ pressed }) => [styles.loginButton, pressed && styles.buttonPressed]}
              onPress={handleLogin}
              disabled={loading}
              accessibilityRole="button"
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.loginButtonText}>Log In</Text>
              )}
            </Pressable>
          </View>

          <View style={styles.signupRow}>
            <Text style={styles.signupPrompt}>Don't have an account? </Text>
            <Pressable onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupLink}>Sign up</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 24,
  },
  logoCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#EAF7EC',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2D20',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#778078',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 34,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#344236',
    marginBottom: 8,
    marginTop: 16,
  },
  inputContainer: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DCE5DD',
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#FAFCFA',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#263528',
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  loginButton: {
    minHeight: 54,
    backgroundColor: '#35AA47',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
  },
  signupPrompt: {
    fontSize: 14,
    color: '#778078',
  },
  signupLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#35AA47',
  },
});
