// screens/ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../screens/Firebase'; // Ensure this imports your initialized Firebase app

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState(null);
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, set user details
        setUserDetails({
          email: user.email,
          displayName: user.displayName || 'No Name', // Optional: Fetch display name if available
          uid: user.uid,
        });
        setDisplayName(user.displayName || ''); // Set initial display name
      } else {
        // No user is signed in, navigate to login
        navigation.navigate('Login');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigation]);

  const handleLogout = async () => {
    await auth.signOut();
    navigation.navigate('Login');
  };

  const handleUpdateProfile = async () => {
    const user = auth.currentUser ;
    if (user) {
      try {
        await user.updateProfile({
          displayName: displayName,
        });
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          displayName: displayName,
        }));
        Alert.alert('Profile updated successfully!');
      } catch (error) {
        Alert.alert('Error updating profile:', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      {userDetails ? (
        <>
          <Text style={styles.welcomeText}>Welcome, {userDetails.displayName}</Text>
          <Text>Email: {userDetails.email}</Text>
          <Text>User ID: {userDetails.uid}</Text>
          <TextInput
            style={styles.input}
            placeholder="Update Display Name"
            value={displayName}
            onChangeText={setDisplayName}
          />
          <Button title="Update Profile" onPress={handleUpdateProfile} />
          <Button title="Log Out" onPress={handleLogout} />
          <Button title="Go to Recording" onPress={() => navigation.navigate('Recorder')} />
        </>
      ) : (
        <Text>Loading user details...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
  },
});

export default ProfileScreen;