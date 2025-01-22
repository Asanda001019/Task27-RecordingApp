import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../screens/Firebase'; // Ensure this imports your initialized Firebase app

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, set user details
        setUserDetails({
          email: user.email,
          uid: user.uid,
        });
      } else {
        // No user is signed in, navigate to login
        navigation.navigate('Login');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigation]);

  return (
    <ImageBackground 
      source={require('../assets/Microphen.jpg')} // Adjust the path to your image
      style={styles.background}
      resizeMode="cover"
    >
      
      <View style={styles.container}>
        {userDetails ? (
          <>
            <Text style={styles.welcomeText}>Welcome to the Seamless Voice Recording App!</Text>
            <Text style={styles.infoText}>Thank you for logging in: {userDetails.email}</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Recorder')}>
              <Text style={styles.buttonText}>Go to Recording</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.loadingText}>Loading user details...</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%', // Use percentage for responsiveness
    maxWidth: 400, // Maximum width for larger screens
    backgroundColor: 'rgba(224, 242, 254, 0.8)', // Semi-transparent background for better readability
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 10,
    color: '#4F46E5', // Tailwind indigo-500
    textAlign: 'center', // Center text
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#4B5563', // Tailwind gray-700
    textAlign: 'center', // Center text
  },
  button: {
    width: '100%',
    backgroundColor: '#4F46E5', // Tailwind indigo-700
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF', // White
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 16,
    color: '#4B5563', // Tailwind gray-700
    textAlign: 'center', // Center text
  },
});

export default ProfileScreen;