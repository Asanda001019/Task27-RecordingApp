import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const VoiceNoteList = ({ voiceNotes, onDelete, onPlay }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={voiceNotes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.noteContainer}>
            <Text>{item.name}</Text>
            <Text>{item.date}</Text>
            <Button title="Play" onPress={() => onPlay(item.uri)} />
            <Button title="Delete" onPress={() => onDelete(item.id)} />
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
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default VoiceNoteList;