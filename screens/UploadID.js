import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function UploadID({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ID‑Verifizierung</Text>
      <Text style={styles.subtitle}>
        Bitte lade ein Foto deiner ID hoch, um Inhalte auf MOTION CARTEL zu veröffentlichen.
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>ID hochladen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate("CreatorApplication")}
      >
        <Text style={styles.nextText}>Weiter zur Creator‑Bewerbung</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20, justifyContent: "center" },
  title: { color: "#fff", fontSize: 32, fontWeight: "bold", marginBottom: 20 },
  subtitle: { color: "#aaa", fontSize: 16, marginBottom: 40 },
  button: {
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: { color: "#fff", textAlign: "center" },
  nextButton: {
    backgroundColor: "#ff0066",
    padding: 15,
    borderRadius: 10,
  },
  nextText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});