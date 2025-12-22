import React from "react";
import { StyleSheet, Text, View } from "react-native";

import WheelCanvas from "./WheelCanvas";

export default function WheelSpinner() {
  return (
    <View style={styles.container}>
      <WheelCanvas />
      <Text style={styles.hint}>Tap spin to decide</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  hint: {
    color: "#444444",
    fontSize: 14,
  },
});
