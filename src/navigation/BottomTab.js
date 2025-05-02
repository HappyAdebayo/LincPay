import TransactionsScreen from "../Screens/TransactionScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import HomeScreen from "../Screens/Home";
import { View,Text,StyleSheet,TouchableOpacity,SafeAreaView } from "react-native";
import { FontAwesome } from "@expo/vector-icons"
import { useState } from "react";

export default function BottomTab() {
  const [activeTab, setActiveTab] = useState("home")

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen />
      case "transactions":
        return <TransactionsScreen />
      case "profile":
        return <ProfileScreen />
      default:
        return <HomeScreen />
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderScreen()}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab("home")}>
          <FontAwesome name="home" size={24} color={activeTab === "home" ? "#dc2626" : "#666"} />
          <Text style={[styles.tabLabel, { color: activeTab === "home" ? "#dc2626" : "#666" }]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab("transactions")}>
          <FontAwesome name="exchange" size={24} color={activeTab === "transactions" ? "#dc2626" : "#666"} />
          <Text style={[styles.tabLabel, { color: activeTab === "transactions" ? "#dc2626" : "#666" }]}>
            Transactions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab("profile")}>
          <FontAwesome name="user" size={24} color={activeTab === "profile" ? "#dc2626" : "#666"} />
          <Text style={[styles.tabLabel, { color: activeTab === "profile" ? "#dc2626" : "#666" }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
      },
      tabBar: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      tabItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      tabLabel: {
        fontSize: 12,
        marginTop: 4,
      },
})