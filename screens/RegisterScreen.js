// screens/RegisterScreen.js

import React, { useState } from 'react';
import { TextInput, Button, Text, View } from 'react-native';
import { auth, createUserWithEmailAndPassword } from '../screens/Firebase';  // Import from the firebaseConfig.js file
import { useNavigation } from '@react-navigation/native';


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
    <View >
      <TextInput
       label="name"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text >{error}</Text> : null}
      <Button title="Register" onPress={handleRegister} />

      <Text onPress={() => navigation.navigate('Login')}>
        Already have an account? Log in
      </Text>
      
    </View>
  );
};

export default RegisterScreen;
