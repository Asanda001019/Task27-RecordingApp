import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import VoiceNoteList from './VoiceNoteList'; // Ensure this is the correct path
import Settings from './Settings'; // Ensure this is the correct path
import { auth } from '../screens/Firebase'; // Ensure this imports your initialized Firebase app

const Recorder = ({ onRecordingComplete, voiceNotes, onDelete, onPlay, onQualityChange, userEmail, navigation }) => {
  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('');
  const [sound, setSound] = useState();

  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        Alert.alert('Permission to access microphone is required.');
        return;
      }

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      setRecordingStatus('Recording...');
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording:', err);
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    if (recording) {
      try {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecording(null);
        setRecordingStatus('Recording stopped');
        onRecordingComplete(uri);
        console.log('Recording stopped, URI:', uri);
      } catch (err) {
        console.error('Failed to stop recording:', err);
        Alert.alert('Error', 'Failed to stop recording. Please try again.');
      }
    }
  };

  const playSound = async (uri) => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri });
      setSound(sound);
      await sound.playAsync();
      console.log('Playing sound from URI:', uri);
    } catch (error) {
      console.error("Error playing sound:", error);
      Alert.alert("Error", "Failed to play sound. Please check the audio file.");
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      setSound(null);
      console.log('Sound stopped');
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigation.navigate('Login');
  };

  // Filter voice notes by the user's email
  const userVoiceNotes = voiceNotes.filter(note => note.email === userEmail);

  return (
    <View style={styles.container}>
      <Text style={styles.recordingStatus}>{recordingStatus}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={recording ? stopRecording : startRecording}
      >
        <Text style={styles.buttonText}>{recording ? 'Stop Recording' : 'Start Recording'}</Text>
      </TouchableOpacity>
      {sound && (
        <TouchableOpacity
          style={[styles.button, styles.playButton]}
          onPress={stopSound}
        >
          <Text style={styles.buttonText}>Stop Playing</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
      <Settings onQualityChange={onQualityChange} />
      <Text style={styles.voiceNoteListTitle}>Your Recordings:</Text>
      <VoiceNoteList
        voiceNotes={userVoiceNotes}
        onDelete={onDelete}
        onPlay={onPlay}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E0F2FE', // Tailwind indigo-100
    alignItems: 'center',
  },
  recordingStatus: {
    fontSize: 18,
    marginBottom: 20,
    color: '#4F46E5', // Tailwind indigo-500
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
  voiceNoteListTitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    color: '#4F46E5', // Tailwind indigo-500
  },
});

export default Recorder;