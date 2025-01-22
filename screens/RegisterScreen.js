import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { auth, createUserWithEmailAndPassword } from '../screens/Firebase';  // Import from the firebaseConfig.js file
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError('');
      navigation.navigate('Login'); // Navigate to login page after successful registration
    } catch (e) {
      setError('Registration failed! ' + e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register to Get the Best Voice Recording App!</Text>
      <View style={styles.innerContainer}>
        <View style={styles.iconContainer}>
          <Icon name="microphone" size={50} color="#4F46E5" style={styles.icon} /> {/* Microphone Icon */}
        </View>
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
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerLink}>Already have an account? Log in</Text>
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
    padding: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  innerContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#E0F2FE', // Tailwind indigo-100
    borderRadius: 10,
    padding: 20,
    alignSelf: 'center',
    alignItems: 'center', // Center items horizontally
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35, // Make it circular
    backgroundColor: '#E5E7EB', // Light gray background
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Space between icon and inputs
  },
  icon: {
    transform: [{ rotate: '15deg' }], // Tilt the microphone icon
  },
  label: {
    marginBottom: 8,
    alignSelf: 'flex-start', // Align labels to the start
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

export default RegisterScreen;