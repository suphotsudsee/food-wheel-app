import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import WheelCanvas from "./components/WheelCanvas";
import FoodList from "./components/FoodList";
import ResultModal from "./components/ResultModal";

export default function App() {
  const [items, setItems] = useState([
    "ข้าวกะเพรา",
    "ก๋วยเตี๋ยว",
    "ส้มตำ",
    "ข้าวมันไก่",
    "แกงเขียวหวาน",
    "ผัดไทย",
  ]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const rotationAccum = useRef(0);

  const spinWheel = () => {
    if (isSpinning || items.length < 2) return;

    setIsSpinning(true);
    setWinner(null);
    setShowModal(false);

    const randomDegree = Math.floor(Math.random() * 360);
    const totalRotation = rotationAccum.current + 1800 + randomDegree;

    Animated.timing(rotateAnim, {
      toValue: totalRotation,
      duration: 4000,
      easing: Easing.bezier(0.1, 0.7, 0.1, 1),
      useNativeDriver: true,
    }).start(() => {
      setIsSpinning(false);
      calculateWinner(totalRotation);
      rotationAccum.current = totalRotation % 360;
      rotateAnim.setValue(rotationAccum.current);
      setShowModal(true);
    });
  };

  const calculateWinner = (finalRotation) => {
    const degreePerSlice = 360 / items.length;
    const normalizedRotation = finalRotation % 360;
    const effectiveAngle = (360 - normalizedRotation) % 360;
    const winningIndex = Math.floor(effectiveAngle / degreePerSlice);
    setWinner(items[winningIndex]);
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient colors={["#f97316", "#dc2626"]} style={styles.header}>
          <Text style={styles.headerTitle}>🍽️ กินอะไรดี?</Text>
          <Text style={styles.headerSubtitle}>วงล้อสุ่มอาหารแห่งโชคชะตา</Text>
        </LinearGradient>

        <View style={styles.wheelSection}>
          <View style={styles.wheelContainer}>
            <View style={styles.pointer} />

            <Animated.View
              style={[styles.wheel, { transform: [{ rotate: rotation }] }]}
            >
              <WheelCanvas items={items} size={320} />
            </Animated.View>

            <View style={styles.centerHub}>
              <Text style={styles.centerEmoji}>😋</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.spinButton,
              (isSpinning || items.length < 2) && styles.spinButtonDisabled,
            ]}
            onPress={spinWheel}
            disabled={isSpinning || items.length < 2}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={
                isSpinning || items.length < 2
                  ? ["#9ca3af", "#9ca3af"]
                  : ["#f97316", "#dc2626"]
              }
              style={styles.spinButtonGradient}
            >
              <Text style={styles.spinButtonText}>
                {isSpinning ? "กำลังหมุน... 🔄" : "สุ่มเลย! 🎲"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.listSection}>
          <FoodList
            items={items}
            onAdd={(item) => setItems([...items, item])}
            onRemove={(index) =>
              setItems(items.filter((_, i) => i !== index))
            }
            disabled={isSpinning}
          />
        </View>
      </ScrollView>

      <ResultModal
        visible={showModal}
        winner={winner}
        onClose={() => setShowModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    padding: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#fed7aa",
    textAlign: "center",
    marginTop: 4,
  },
  wheelSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  wheelContainer: {
    width: 320,
    height: 320,
    position: "relative",
    marginBottom: 32,
  },
  pointer: {
    position: "absolute",
    right: -15,
    top: "50%",
    marginTop: -15,
    width: 0,
    height: 0,
    borderTopWidth: 15,
    borderTopColor: "transparent",
    borderRightWidth: 30,
    borderRightColor: "#1f2937",
    borderBottomWidth: 15,
    borderBottomColor: "transparent",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  wheel: {
    width: 320,
    height: 320,
    borderRadius: 160,
    borderWidth: 4,
    borderColor: "white",
    overflow: "hidden",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  centerHub: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -32,
    marginTop: -32,
    width: 64,
    height: 64,
    backgroundColor: "white",
    borderRadius: 32,
    borderWidth: 4,
    borderColor: "#fed7aa",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  centerEmoji: {
    fontSize: 32,
  },
  spinButton: {
    borderRadius: 999,
    shadowColor: "#f97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  spinButtonDisabled: {
    shadowColor: "#9ca3af",
  },
  spinButtonGradient: {
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 999,
  },
  spinButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  listSection: {
    paddingHorizontal: 20,
  },
});
