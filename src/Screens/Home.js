import { StyleSheet, View, Text,Platform, TouchableOpacity, ScrollView} from "react-native"
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"
import {RecentTransactions, QuickActions} from "../Data/Data";
import { PaymentOptions } from "../Data/Data";
import { useNavigation } from "@react-navigation/native";
import { useState,useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default HomeScreen = ({ setActiveTab }) => {
  const navigation = useNavigation()
  
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          setUsername(user.username);
        }
      } catch (error) {
        console.error('Failed to load username', error);
      }
    };

    fetchUsername();
  }, []);

  const handleQuickAction = (action) => {
    if (action.screen === 'transactions' || action.screen === 'profile') {
      setActiveTab(action.screen);
    } else {
      navigation.navigate(action.screen);
    }
  };
  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{username}</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton} onPress={()=>navigation.navigate('NotificationScreen')}>
          <FontAwesome name="bell" size={24} color="#333" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.balanceCard}>
        <View style={styles.balanceTopCorner} />
        <View style={styles.balanceContent}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>$1,245.80</Text>
          <View style={styles.balanceActions}>
            <TouchableOpacity style={styles.balanceActionButton} onPress={()=>navigation.navigate('TransferMoneyScreen')}>
              <FontAwesome name="arrow-up" size={16} color="#fff" />
              <Text style={styles.balanceActionText}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.balanceActionButton} onPress={()=>navigation.navigate('WithdrawMoneyScreen')}>
              <FontAwesome name="arrow-down" size={16} color="#fff" />
              <Text style={styles.balanceActionText}>Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          {QuickActions.map((action) => (
            <TouchableOpacity key={action.id} style={styles.quickActionItem}  onPress={() => handleQuickAction(action)}>
              <View style={styles.quickActionIcon}>
                <FontAwesome name={action.icon} size={20} color="#dc2626" />
              </View>
              <Text style={styles.quickActionText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.paymentsContainer}>
        <Text style={styles.sectionTitle}>College Payments</Text>
        <View style={styles.paymentOptionsGrid}>
          {PaymentOptions.map((option) => (
            <TouchableOpacity key={option.id} style={styles.paymentOption} onPress={()=>navigation.navigate('TransferMoneyScreen',{
              account_number:option.account_number,
              bank_name:option.bank_name,
              fee_name:option.title
            })}>
              <View style={styles.paymentOptionIcon}>
                <MaterialIcons name={option.icon} size={24} color="#dc2626" />
              </View>
              <Text style={styles.paymentOptionText}>{option.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.recentTransactionsContainer}>
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => setActiveTab("transactions")}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        {RecentTransactions.slice(0, 3).map((transaction) => (
          <TouchableOpacity key={transaction.id} style={styles.transactionItem}>
            <View style={styles.transactionIconContainer}>
              <FontAwesome
                name={transaction.type === "expense" ? "arrow-up" : "arrow-down"}
                size={16}
                color={transaction.type === "expense" ? "#ef4444" : "#10b981"}
              />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>{transaction.title}</Text>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
            </View>
            <Text
              style={[
                styles.transactionAmount,
                {
                  color: transaction.type === "expense" ? "#ef4444" : "#10b981",
                },
              ]}
            >
              {transaction.type === "expense" ? "-" : "+"}${Math.abs(transaction.amount).toFixed(2)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Financial Tips */}
      <View style={styles.tipsContainer}>
        <Text style={styles.sectionTitle}>Financial Tips</Text>
        <View style={styles.tipCard}>
          <View style={styles.tipIconContainer}>
            <FontAwesome name="lightbulb-o" size={24} color="#dc2626" />
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Save on Textbooks</Text>
            <Text style={styles.tipText}>
              Check the library or look for used books before buying new ones to save up to 70% on your textbook
              expenses.
            </Text>
          </View>
        </View>
      </View>

      <View style={{ height: 80 }} />
    </ScrollView>
  )
}




const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingVertical:Platform.OS === 'ios' ? 0 : 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  welcomeText: {
    fontSize: Platform.OS === 'ios' ? 10 : 16,
    color: "#666",
  },
  userName: {
    fontSize: Platform.OS === 'ios' ? 14 : 20,
    fontWeight: "bold",
    color: "#333",
  },
  notificationButton: {
    position: "relative",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  notificationBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#dc2626",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadgeText: {
    color: "#fff",
    fontSize: Platform.OS === 'ios' ? 8 : 10,
    fontWeight: "bold",
  },
  balanceCard: {
    backgroundColor: "#dc2626",
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 10,
    padding: 20,
    position: "relative",
    overflow: "hidden",
  },
  balanceTopCorner: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 80,
    height: 80,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderBottomLeftRadius: 80,
  },
  balanceContent: {
    zIndex: 1,
  },
  balanceLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontSize: Platform.OS === 'ios' ? 13 : 14,
  },
  balanceAmount: {
    color: "#fff",
    fontSize: Platform.OS === 'ios' ? 20 : 32,
    fontWeight: "bold",
    marginVertical: 8,
  },
  balanceActions: {
    flexDirection: "row",
    marginTop: 16,
  },
  balanceActionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 12,
  },
  balanceActionText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "500",
  },
  quickActionsContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: Platform.OS === 'ios' ? 13 : 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickActionItem: {
    alignItems: "center",
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quickActionText: {
    fontSize: Platform.OS === 'ios' ? 10 : 12,
    color: "#666",
  },
  paymentsContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  paymentOptionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  paymentOption: {
    width: "30%",
    alignItems: "center",
    marginBottom: 16,
  },
  paymentOptionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  paymentOptionText: {
    fontSize: Platform.OS === 'ios' ? 10 : 12,
    color: "#666",
    textAlign: "center",
  },
  recentTransactionsContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  viewAllText: {
    color: "#dc2626",
    fontSize: Platform.OS === 'ios' ? 10 : 14,
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
    fontSize: Platform.OS === 'ios' ? 10 : 16,
    fontWeight: "500",
    color: "#333",
  },
  transactionDate: {
    fontSize: Platform.OS === 'ios' ? 10 : 12,
    color: "#666",
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: Platform.OS === 'ios' ? 10 : 16,
    fontWeight: "600",
  },
  tipsContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
    marginBottom: 55,
  },
  tipCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  tipIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fef2f2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: Platform.OS === 'ios' ? 13 : 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  tipText: {
    fontSize: Platform.OS === 'ios' ? 10 : 14,
    color: "#666",
    lineHeight: Platform.OS === 'ios' ? 15 : 20,
  },
})
