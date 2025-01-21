import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

import { auth } from './screens/Firebase'; // Use this if you're using Firebase Web SDK

// Import your screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import Recorder from './screens/Recorder'; // Ensure this is the correct path
import VoiceNoteList from './screens/VoiceNoteList'; // Ensure this is the correct path
import Settings from './screens/Settings'; // Ensure this is the correct path

// Create the navigation stack
const Stack = createStackNavigator();

const App = () => {
  const [user, setUser ] = useState(null);  // State to store user info
  const [voiceNotes, setVoiceNotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [recordingQuality, setRecordingQuality] = useState('HIGH');

  // Load notes from AsyncStorage
  const loadNotes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@voice_notes');
      if (jsonValue) {
        setVoiceNotes(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Error loading notes:', e);
    }
  };

  // Save notes to AsyncStorage
  const saveNotes = async (notes) => {
    try {
      const jsonValue = JSON.stringify(notes);
      await AsyncStorage.setItem('@voice_notes', jsonValue);
    } catch (e) {
      console.error('Error saving notes:', e);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser );  // Listen for authentication changes
    loadNotes(); // Load notes when the app starts
    return () => {
      unsubscribe();  // Clean up the subscription on unmount
    };
  }, []);

  useEffect(() => {
    saveNotes(voiceNotes); // Save notes whenever voiceNotes changes
  }, [voiceNotes]);

  const addVoiceNote = (uri) => {
    const newNote = {
      id: voiceNotes.length + 1,
      name: `Note ${voiceNotes.length + 1}`,
      date: new Date().toLocaleString(),
      uri,
    };
    setVoiceNotes((prev) => [...prev, newNote]);
  };

  const deleteVoiceNote = (id) => {
    setVoiceNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const playVoiceNote = async (uri) => {
    const sound = new Audio.Sound();
    await sound.loadAsync({ uri });
    await sound.playAsync();
  };

  const filteredNotes = voiceNotes.filter(
    (note) =>
      note.name.toLowerCase().includes(searchText.toLowerCase()) ||
      note.date.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Profile' : 'Register'}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Profile">
          {() => (
            <ProfileScreen
              user={user}
              voiceNotes={filteredNotes}
              onDelete={deleteVoiceNote}
              onPlay={playVoiceNote}
              onQualityChange={setRecordingQuality}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Recorder">
          {() => (
            <Recorder
              onRecordingComplete={addVoiceNote}
              recordingQuality={recordingQuality}
              voiceNotes={filteredNotes}
              onDelete={deleteVoiceNote}
              onPlay={playVoiceNote}
              onQualityChange={setRecordingQuality}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="VoiceNoteList">
          {() => (
            <VoiceNoteList
              voiceNotes={filteredNotes}
              onDelete={deleteVoiceNote}
              onPlay={playVoiceNote}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Settings">
          {() => <Settings onQualityChange={setRecordingQuality} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;