
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
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

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert('Missing details', 'Please fill in all fields.');
      return;
    }

    if (name.trim().length < 4 || name.trim().length > 30) {
      Alert.alert('Invalid name', 'Please enter a name between 4 and 30 characters.');
      return;
    }

    if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(name.trim())) {
      Alert.alert('Invalid name', 'Name must start with a letter and contain only letters, numbers, or underscores.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak password', 'Your password must contain at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Please make sure both passwords match.');
      return;
    }

    if (!API_URL) {
      Alert.alert('Configuration error', 'The API URL is not configured.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // headers tell the server what kind of data is being sent. In this case, it's JSON. headers can also include other information like authentication tokens, content type, etc.
        body: JSON.stringify({ // This converts your JavaScript object into a plain string in JSON format.
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      console.log('Signup response :', response); // This logs the HTTP status code of the response to the console. It helps in debugging by showing whether the request was successful (e.g., 200 OK) or if there was an error (e.g., 400 Bad Request, 500 Internal Server Error).
      const data = await response.json(); // response would contain the server's response, which is expected to be in JSON format. This line converts that JSON string into a JavaScript object for easier manipulation.

      if (!response.ok) {
        throw new Error(data.message || 'Could not create your account.');
      }

      // Alert.alert(title, message, buttons, options);
      Alert.alert('Account created', 'Your account has been created. Please log in.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Signup failed', error.message || 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView // KeyboardAvoidingView is a component that automatically adjusts its position or padding when the keyboard appears, preventing the keyboard from covering input fields. This is especially useful on mobile devices where the on-screen keyboard can obscure parts of the UI.
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} // On iOS, it adds padding to the bottom of the view when the keyboard is visible. On Android, it does nothing (undefined), as Android handles this automatically.
      >
        <View style={styles.content}>
          <View style={styles.logoCircle}>
            <Ionicons name="leaf" size={34} color="#35AA47" />
          </View>

          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>Join the AgriMithra community</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Full name</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#7A857B" />
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#9AA39B"
                value={name}
                onChangeText={setName}
                autoCapitalize="words" // Ensures that the first letter of each word is capitalized, which is common for names.
                autoCorrect={false}
                textContentType="name"
                accessibilityLabel="Full name"
              />
            </View>

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
                placeholder="At least 6 characters"
                placeholderTextColor="#9AA39B"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                textContentType="newPassword"
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

            <Text style={styles.label}>Confirm password</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#7A857B" />
              <TextInput
                style={styles.input}
                placeholder="Re-enter your password"
                placeholderTextColor="#9AA39B"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                textContentType="newPassword"
                accessibilityLabel="Confirm password"
              />
              <Pressable
                onPress={() => setShowConfirmPassword((visible) => !visible)}
                accessibilityRole="button"
                accessibilityLabel={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                hitSlop={8}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={21}
                  color="#7A857B"
                />
              </Pressable>
            </View>

            <Pressable
              style={({ pressed }) => [styles.signupButton, pressed && styles.buttonPressed]}
              onPress={handleSignup}
              disabled={loading}
              accessibilityRole="button"
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.signupButtonText}>Create Account</Text>
              )}
            </Pressable>
          </View>

          <View style={styles.loginRow}>
            <Text style={styles.loginPrompt}>Already have an account? </Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Log in</Text>
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
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 20,
  },
  logoCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#EAF7EC',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#1F2D20',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#778078',
    textAlign: 'center',
    marginTop: 7,
    marginBottom: 16,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#344236',
    marginTop: 12,
    marginBottom: 7,
  },
  inputContainer: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DCE5DD',
    borderRadius: 12,
    paddingHorizontal: 13,
    backgroundColor: '#FAFCFA',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#263528',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  signupButton: {
    minHeight: 52,
    backgroundColor: '#35AA47',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  loginPrompt: {
    fontSize: 14,
    color: '#778078',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#35AA47',
  },
});