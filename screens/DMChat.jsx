import { useState } from "react";
import { Animated, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function DMChat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text.trim()) return;

    const newMessage = {
      id: Date.now(),
      text,
      sender: "me",
      glow: new Animated.Value(0),
    };

    setMessages([...messages, newMessage]);
    setText("");

    Animated.timing(newMessage.glow, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const renderMessage = ({ item }) => {
    const glowStyle = {
      shadowColor: "#ff0099",
      shadowOpacity: item.glow.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.8],
      }),
      shadowRadius: item.glow.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 12],
      }),
    };

    return (
      <Animated.View
        style={[
          styles.message,
          item.sender === "me" ? styles.myMessage : styles.otherMessage,
          glowStyle,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Heat Meter */}
      <View style={styles.heatMeter}>
        <View style={[styles.heatFill, { width: `${messages.length * 10}%` }]} />
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMessage}
        contentContainerStyle={{ padding: 20 }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nachricht schreiben..."
          placeholderTextColor="#888"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Senden</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  heatMeter: {
    height: 6,
    backgroundColor: "#222",
    width: "100%",
  },
  heatFill: {
    height: "100%",
    backgroundColor: "#ff0099",
  },

  message: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
  },
  myMessage: {
    backgroundColor: "#ff0099",
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: "#222",
    alignSelf: "flex-start",
  },
  messageText: { color: "#fff" },

  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#222",
  },
  input: {
    flex: 1,
    backgroundColor: "#111",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#ff0099",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  sendText: { color: "#fff", fontWeight: "bold" },
});