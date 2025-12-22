import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { COLORS } from "../constants/Colors";

export default function FoodList({ items, onAdd, onRemove, disabled }) {
  const [newItem, setNewItem] = useState("");

  const handleAdd = () => {
    if (newItem.trim()) {
      onAdd(newItem.trim());
      setNewItem("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>รายการอาหาร ({items.length})</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={newItem}
          onChangeText={setNewItem}
          placeholder="เพิ่มเมนู..."
          maxLength={20}
          editable={!disabled}
          onSubmitEditing={handleAdd}
        />
        <TouchableOpacity
          style={[styles.addButton, disabled && styles.disabled]}
          onPress={handleAdd}
          disabled={disabled}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {items.map((item, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.itemLeft}>
              <View
                style={[
                  styles.colorDot,
                  { backgroundColor: COLORS[index % COLORS.length] },
                ]}
              />
              <Text style={styles.itemText} numberOfLines={1}>
                {item}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => onRemove(index)}
              disabled={disabled}
              style={styles.removeButton}
            >
              <Text style={styles.removeText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))}
        {items.length === 0 && (
          <Text style={styles.emptyText}>ยังไม่มีรายการอาหาร เพิ่มเลย!</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 8,
  },
  inputRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#22c55e",
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  addButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  disabled: {
    backgroundColor: "#d1d5db",
  },
  list: {
    maxHeight: 300,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f9fafb",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 8,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  itemText: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "500",
    flex: 1,
  },
  removeButton: {
    padding: 4,
  },
  removeText: {
    fontSize: 18,
  },
  emptyText: {
    textAlign: "center",
    color: "#9ca3af",
    fontSize: 14,
    paddingVertical: 20,
  },
});
