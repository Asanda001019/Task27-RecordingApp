// screens/ProfileScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import auth from 'firebase/auth';

const ProfileScreen = () => {
  const currentuser = auth().currentUser;

  return (
    <View>
      <Text>Name: {currentuser.displayName}</Text>
      <Text>Email: {currentuser.email}</Text>
      <Button title="Logout" onPress={() => auth().signOut()} />
    </View>
  );
};

export default ProfileScreen;