import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [des, setDes] = useState("");
  const [allSnack, setAllSnack] = useState<any[]>([]);

  useEffect(() => {
    loadSnack();
  }, [allSnack]);

  async function loadSnack() {
    const data = await AsyncStorage.getItem("snack");
    if (data) {
      setAllSnack(JSON.parse(data));
    }
  }

  async function addSnack() {
    if (!name || !price) return;

    const snack = {
      snackName: name,
      snackPrice: price,
      snackDes: des,
    };

    const newSnack = [...allSnack, snack];
    await AsyncStorage.setItem("snack", JSON.stringify(newSnack));

    setAllSnack(newSnack);
    setName("");
    setPrice("");
    setDes("");
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>➕ เพิ่มรายการใหม่</Text>

      <View style={styles.cardForm}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>ชื่อสินค้า</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="เช่น มันฝรั่งทอด"
            placeholderTextColor="#BDBDBD"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>ราคา (บาท)</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            placeholder="เช่น 25"
            placeholderTextColor="#BDBDBD"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>รายละเอียด</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={des}
            onChangeText={setDes}
            placeholder="ใส่รายละเอียดเพิ่มเติม..."
            multiline
            placeholderTextColor="#BDBDBD"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={addSnack}>
          <Text style={styles.saveButtonText}>บันทึกรายการ</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    padding: 24,
  },

  header: {
    fontSize: 28,
    fontWeight: "800",
    color: "#222",
    marginBottom: 24,
  },

  cardForm: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },

  inputGroup: {
    marginBottom: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#333",
  },

  textArea: {
    height: 110,
    textAlignVertical: "top",
  },

  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
