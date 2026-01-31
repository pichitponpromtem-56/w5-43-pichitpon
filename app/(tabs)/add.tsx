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
  const [allSnack, setAllSnack] = useState("");

  useEffect(() => {
    loadSnack();
  }, [allSnack]);

  async function loadSnack() {
    const data = await AsyncStorage.getItem("snack");
    if (data != null) {
      setAllSnack(JSON.parse(data));
    }
  }

  async function addSnack() {
    const snack = {
      snackName: name,
      snackPrice: price,
      snackDes: des,
    };

    console.log(snack);

    const newSnack = [...allSnack, snack];
    await AsyncStorage.setItem("snack", JSON.stringify(newSnack));
    setName("");
    setPrice("");
    setDes("");
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>
        เพิ่มข้อมูลใหม่ {name} | {price}{" "}
      </Text>

      <View style={styles.cardForm}>
        {/* ส่วนกรอกข้อความ */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>หัวข้อ</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="ชื่อ"
            placeholderTextColor="#C1C1C1"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>ราคา</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="ราคา"
            placeholderTextColor="#C1C1C1"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>รายละเอียด</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={des}
            onChangeText={setDes}
            placeholder="ใส่รายละเอียดที่นี่..."
            multiline
            placeholderTextColor="#C1C1C1"
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
    padding: 25,
  },
  header: {
    fontSize: 26,
    fontWeight: "800",
    color: "#333333", // เปลี่ยนเป็นสีเทาเข้ม (อ่านง่ายและดูแพง)
    marginBottom: 20,
    marginTop: 10,
  },
  cardForm: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555555", // สีเทากลางๆ ไม่แย่งสายตา
    marginBottom: 8,
  },
  imageContainer: {
    width: "100%",
    height: 180,
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
  },
  placeholderText: {
    color: "#999",
    fontSize: 14,
  },
  selectedImage: {
    width: "100%",
    height: "100%",
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#EEF2EE", // ขอบเขียวอ่อนจางๆ มากๆ
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#444444", // สีข้อความใน Input เป็นสีเทาเข้ม
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#4CAF50", // ปุ่มสีเขียวสำหรับ Action หลัก
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
});
