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
    if (data) {
      setAllSnack(JSON.parse(data));
    }
  }

  async function removeSnack(index: number) {
    const newSnack = allSnack.filter((_, i) => i !== index);
    setAllSnack(newSnack);
    await AsyncStorage.setItem("snack", JSON.stringify(newSnack));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>🍿 รายการทั้งหมด</Text>

      <FlatList
        data={allSnack}
        keyExtractor={(_, i) => i.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.snackName}</Text>

              <View style={styles.priceBadge}>
                <Text style={styles.cardPrice}>฿{item.snackPrice}</Text>
              </View>
            </View>

            <Text style={styles.cardDes}>{item.snackDes}</Text>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => removeSnack(index)}
            >
              <Text style={styles.deleteText}>ลบรายการ</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyEmoji}>📭</Text>
            <Text style={styles.empty}>ยังไม่มีรายการ</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F4F6F8",
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#222",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E7D32",
  },

  priceBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  cardPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#388E3C",
  },

  cardDes: {
    color: "#555",
    marginTop: 8,
    lineHeight: 20,
  },

  deleteBtn: {
    alignSelf: "flex-end",
    marginTop: 12,
    backgroundColor: "#FFEAEA",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },

  deleteText: {
    color: "#E53935",
    fontWeight: "600",
    fontSize: 14,
  },

  emptyBox: {
    alignItems: "center",
    marginTop: 80,
  },

  emptyEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },

  empty: {
    color: "#999",
    fontSize: 16,
  },
});
