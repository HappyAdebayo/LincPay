import { StyleSheet,View,Text,TouchableOpacity,FlatList,Platform } from "react-native"
import {RecentTransactions} from "../Data/Data"
import { FontAwesome } from "@expo/vector-icons"
import { useState } from "react"

export default TransactionsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredTransactions = RecentTransactions.filter((item) => {
    if (selectedFilter === "all") {
      return true;
    } else {
      return item.type === selectedFilter;
    }
  });

  return (
    <View style={styles.screenContainer}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Transactions</Text>
      </View>

      <View style={styles.transactionFilters}>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === "all" && styles.activeFilterButton]}
          onPress={() => setSelectedFilter("all")}
        >
          <Text style={selectedFilter === "all" ? styles.activeFilterText : styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === "income" && styles.activeFilterButton]}
          onPress={() => setSelectedFilter("income")}
        >
          <Text style={selectedFilter === "income" ? styles.activeFilterText : styles.filterText}>Income</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === "expense" && styles.activeFilterButton]}
          onPress={() => setSelectedFilter("expense")}
        >
          <Text style={selectedFilter === "expense" ? styles.activeFilterText : styles.filterText}>Expense</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.transactionItemFull}>
            <View style={styles.transactionIconContainer}>
              <FontAwesome
                name={item.type === "expense" ? "arrow-up" : "arrow-down"}
                size={16}
                color={item.type === "expense" ? "#ef4444" : "#10b981"}
              />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>{item.title}</Text>
              <Text style={styles.transactionDate}>{item.date}</Text>
            </View>
            <View style={styles.transactionRightContent}>
              <Text
                style={[
                  styles.transactionAmount,
                  {
                    color: item.type === "expense" ? "#ef4444" : "#10b981",
                  },
                ]}
              >
                {item.type === "expense" ? "-" : "+"}${Math.abs(item.amount).toFixed(2)}
              </Text>
              <Text style={styles.transactionCategory}>{item.category}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: "#f5f5f5",
      paddingVertical:Platform.OS === 'ios' ? 0 : 30,
    },
    screenHeader: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
      },
      screenTitle: {
        fontSize:Platform.OS === 'ios' ? 15 : 20,
        fontWeight: "bold",
        color: "#333",
      },
      transactionFilters: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: "#fff",
        marginBottom: 8,
      },
      filterButton: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
      },
      activeFilterButton: {
        backgroundColor: "#dc2626",
      },
      filterText: {
        color: "#666",
      },
      activeFilterText: {
        color: "#fff",
        fontWeight: "500",
      },
      transactionItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
      },
      transactionIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#f3f4f6",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
      },
      transactionDetails: {
        flex: 1,
      },
      transactionTitle: {
        fontSize:Platform.OS === 'ios' ? 13 : 16,
        fontWeight: "500",
        color: "#333",
      },
      transactionDate: {
        fontSize:Platform.OS === 'ios' ? 10 : 12,
        color: "#666",
        marginTop: 2,
      },
      transactionAmount: {
        fontSize:Platform.OS === 'ios' ? 10 : 16,
        fontWeight: "600",
      },
      transactionItemFull: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
        marginBottom: 1,
      },
      transactionRightContent: {
        alignItems: "flex-end",
      },
      transactionCategory: {
        fontSize:Platform.OS === 'ios' ? 10 : 12,
        color: "#666",
        marginTop: 2,
      },
})