import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { auth, signInWithEmailAndPassword } from '../screens/Firebase';  // Import from the firebaseConfig.js file
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
      navigation.navigate('Profile');  // Navigate to profile page after successful login
    } catch (e) {
      setError('Login failed! ' + e.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#6B7280" // Tailwind gray-500
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#6B7280" // Tailwind gray-500
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.footerLink}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F46E5', // Tailwind indigo-700
    justifyContent: 'center',
  },
  innerContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#E0F2FE', // Tailwind indigo-100
    borderRadius: 10,
    padding: 20,
    alignSelf: 'center',
  },
  label: {
    marginBottom: 8,
    color: '#4F46E5', // Tailwind indigo-500
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#4F46E5', // Tailwind indigo-500
    color: '#4B5563', // Tailwind gray-700
    backgroundColor: '#E5E7EB', // Tailwind gray-300
  },
  button: {
    width: '100%',
    backgroundColor: '#4F46E5', // Tailwind indigo-700
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF', // White
    fontWeight: 'bold',
  },
  footerLink: {
    color: '#4F46E5', // Tailwind indigo-700
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;