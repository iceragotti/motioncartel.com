import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CreatorApplication({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Creator‑Bewerbung</Text>

      <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Alter" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Wohnort" placeholderTextColor="#888" />
      <TextInput
        style={styles.input}
        placeholder="Warum möchtest du Creator werden?"
        placeholderTextColor="#888"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CreatorUpload")}
      >
        <Text style={styles.buttonText}>Bewerbung abschicken</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20, justifyContent: "center" },
  title: { color: "#fff", fontSize: 28, fontWeight: "bold", marginBottom: 30 },
  input: {
    backgroundColor: "#111",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
  },
  button: {
    backgroundColor: "#ff0066",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});