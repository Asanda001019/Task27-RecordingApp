// screens/LoginScreen.js

import React, { useState } from 'react';
import { TextInput, Button, Text, View } from 'react-native';
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
    <View >
      <TextInput
        
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
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
