import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

export default function ResultModal({ visible, winner, onClose }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.topBar} />
          <Text style={styles.emoji}>🎉</Text>
          <Text style={styles.label}>วันนี้คุณควรทาน...</Text>
          <Text style={styles.winner}>{winner}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>ตกลง</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 32,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: "#f97316",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 16,
    marginTop: 8,
  },
  label: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 8,
  },
  winner: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#f97316",
    marginBottom: 32,
    textAlign: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "#f97316",
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#f97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
