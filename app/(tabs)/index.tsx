import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Snack = {
  snackName: string;
  snackPrice: string;
  snackDes: string;
};

export default function ListScreen() {
  const [allSnack, setAllSnack] = useState<Snack[]>([]);

  useEffect(() => {
    loadSnack();
  }, [allSnack]);

  async function loadSnack() {
    const data = await AsyncStorage.getItem("snack");
    if (data != null) {
      setAllSnack(JSON.parse(data));
    }
  }

  async function removeSnack(index: number) {
    const newSnack = allSnack.filter((_, i) => i != index);
    setAllSnack(newSnack);
    await AsyncStorage.setItem("snack", JSON.stringify(newSnack));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>รายการทั้งหมด</Text>
      <FlatList
        data={allSnack}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.snackName.toString()}</Text>
              <Text style={styles.cardPrice}>
                ฿{item.snackPrice.toString()}
              </Text>
            </View>
            <Text style={styles.cardDes}>{item.snackDes.toString()}</Text>
            <TouchableOpacity onPress={() => removeSnack(index)}>
              <Text style={styles.deleteText}>ลบรายการ</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>ไม่มีข้อมูล</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#333",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,

    elevation: 6,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  cardDes: {
    color: "#666",
    marginTop: 5,
  },
  deleteText: {
    color: "#FF5252",
    marginTop: 10,
    fontWeight: "600",
    textAlign: "right",
  },
  empty: {
    textAlign: "center",
    color: "#999",
    marginTop: 50,
  },
});
