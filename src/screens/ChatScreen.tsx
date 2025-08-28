import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function ChatScreen() {
  const [text, setText] = useState('');

  const onSend = () => {
    const msg = text.trim();
    if (!msg) return;
    // Luego esto llamará a la Cloud Function classifySymptoms
    Alert.alert('Demo', 'Especialidad sugerida: cardiología\nUrgencia: 2/5');
    setText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Describe tus síntomas</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej.: dolor de pecho leve al esfuerzo"
        multiline
        value={text}
        onChangeText={setText}
      />
      <Button title="Consultar" onPress={onSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 18, fontWeight: '600' },
  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
  },
});
