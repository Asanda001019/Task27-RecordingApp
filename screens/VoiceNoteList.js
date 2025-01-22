import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, TextInput } from 'react-native';

const VoiceNoteList = ({ voiceNotes, onDelete, onPlay, onUpdate }) => {
  const handleUpdateName = (item) => {
    Alert.prompt(
      'Update Audio Name',
      'Enter a new name for the audio:',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (newName) => {
            if (newName) {
              onUpdate(item.id, newName); // Call the update function with the new name
            }
          },
        },
      ],
      'plain-text',
      item.name // Default value
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={voiceNotes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.noteContainer}>
            <Text style={styles.noteName}>{item.name}</Text>
            <Text style={styles.noteDate}>{item.date}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => onPlay(item.uri)}>
                <Text style={styles.buttonText}>Play</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleUpdateName(item)}>
                <Text style={styles.buttonText}>Update Name</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => onDelete(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '100%',
  },
  noteContainer: {
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#4F46E5', // Tailwind indigo-700
    borderRadius: 8,
    backgroundColor: '#E0F2FE', // Tailwind indigo-100
  },
  noteName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4F46E5', // Tailwind indigo-500
  },
  noteDate: {
    fontSize: 14,
    color: '#6B7280', // Tailwind gray-500
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#4F46E5', // Tailwind indigo-700
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5, // Space between buttons
  },
  buttonText: {
    color: '#FFFFFF', // White
    fontWeight: 'bold',
  },
});

export default VoiceNoteList;