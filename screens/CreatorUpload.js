import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CreatorUpload() {
  const [file, setFile] = useState(null);

  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ['images', 'videos'],
      quality: 1,
    });

    if (!result.canceled) {
      setFile(result.assets[0].uri);
    }
  };

  const submitContent = () => {
    if (!file) return;
    console.log("Exklusiver Inhalt eingereicht:", file);
    alert("Dein exklusiver Inhalt wurde eingereicht!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exklusiven Inhalt einreichen</Text>
      <Text style={styles.subtitle}>Fotos oder Videos hochladen (18+ erlaubt)</Text>

      <TouchableOpacity style={styles.pickButton} onPress={pickMedia}>
        <Text style={styles.pickText}>Medien auswählen</Text>
      </TouchableOpacity>

      {file && <Image source={{ uri: file }} style={styles.preview} />}

      <TouchableOpacity style={styles.submitButton} onPress={submitContent}>
        <Text style={styles.submitText}>Inhalt einreichen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  title: { color: "#fff", fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  subtitle: { color: "#aaa", marginBottom: 30 },
  pickButton: {
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  pickText: { color: "#fff", textAlign: "center" },
  preview: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#ff0066",
    padding: 15,
    borderRadius: 10,
  },
  submitText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});