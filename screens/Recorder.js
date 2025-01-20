import React, { useState, useRef } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av';

const Recorder = ({ onRecordingComplete }) => {
  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('');
  const [sound, setSound] = useState();
  const recordingRef = useRef(null);

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
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  };

  const stopRecording = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setRecordingStatus('Recording stopped');
      onRecordingComplete(uri); // Pass the recording URI to parent
    }
  };

  const playSound = async (uri) => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    setSound(sound);
    await sound.playAsync();
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      setSound(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{recordingStatus}</Text>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      {recordingStatus === 'Recording stopped' && (
        <Button
          title="Play Recorded Audio"
          onPress={() => playSound(recording.getURI())}
        />
      )}
      {sound && (
        <Button
          title="Stop Playing"
          onPress={stopSound}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
});

export default Recorder;