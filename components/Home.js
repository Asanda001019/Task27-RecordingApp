// components/HomeScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import AudioRecorder from './AudioRecorder';
import VoiceNoteList from './VoiceNoteList';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to the Audio Recording App!</Text>
      <AudioRecorder />
      <VoiceNoteList />
    </View>
  );
};

export default HomeScreen;