import React, { useState } from "react"
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

export default function WithdrawMoneyScreen() {
  const [amount, setAmount] = useState("")
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [saveAccount, setSaveAccount] = useState(false)
  const [accountNumber, setAccountNumber] = useState("")
  const [bankName, setBankName] = useState("")
  const [accountName, setAccountName] = useState("")
  const [accountType, setAccountType] = useState("checking")
  const navigation=useNavigation()

  const formatAccountNumber = (text) => {
    const cleaned = text.replace(/\D/g, "")
    return cleaned
  }

  const handleWithdraw = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount to withdraw")
      return
    }

    if (parseFloat(amount) > 1245.8) {
      Alert.alert("Insufficient Funds", "You don't have enough funds to withdraw this amount")
      return
    }

    console.log({
      amount,
      selectedAccount,
      accountDetails: selectedAccount
        ? null
        : { accountNumber, bankName, accountName, accountType, saveAccount },
    })
    Alert.alert("Withdrawal Initiated", `$${amount} will be transferred to your account within 1-3 business days.`)
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
              <FontAwesome name="arrow-left" size={20} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Withdraw Money</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.topLeftCorner} />

          <View style={styles.content}>
            <View style={styles.amountContainer}>
              <Text style={styles.amountLabel}>Amount to Withdraw</Text>
              <View style={styles.amountInputContainer}>
                <Text style={styles.currencySymbol}>$</Text>
                <TextInput
                  style={styles.amountInput}
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="0.00"
                  keyboardType="decimal-pad"
                  placeholderTextColor="#999"
                />
              </View>
              <Text style={styles.balanceText}>Available Balance: $1,245.80</Text>
            </View>

            <View style={styles.quickAmountContainer}>
              <TouchableOpacity
                style={styles.quickAmountButton}
                onPress={() => setAmount("50")}
              >
                <Text style={styles.quickAmountText}>$50</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickAmountButton}
                onPress={() => setAmount("100")}
              >
                <Text style={styles.quickAmountText}>$100</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickAmountButton}
                onPress={() => setAmount("200")}
              >
                <Text style={styles.quickAmountText}>$200</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickAmountButton}
                onPress={() => setAmount("500")}
              >
                <Text style={styles.quickAmountText}>$500</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Withdraw To</Text>

              {/* {savedBankAccounts.map((account) => (
                <TouchableOpacity
                  key={account.id}
                  style={[
                    styles.accountItem,
                    selectedAccount === account.id && styles.selectedAccount,
                  ]}
                  onPress={() => setSelectedAccount(account.id)}
                >
                  <View style={styles.accountIcon}>
                    <FontAwesome name="bank" size={20} color="#dc2626" />
                  </View>
                  <View style={styles.accountDetails}>
                    <Text style={styles.accountTitle}>{account.bankName}</Text>
                    <Text style={styles.accountSubtitle}>
                      {account.accountType} •••• {account.lastFour}
                    </Text>
                  </View>
                  <View style={styles.radioButton}>
                    {selectedAccount === account.id && <View style={styles.radioButtonInner} />}
                  </View>
                </TouchableOpacity>
              ))} */}

              {/* <TouchableOpacity
                style={[styles.accountItem, selectedAccount === null && styles.selectedAccount]}
                onPress={() => setSelectedAccount(null)}
              >
                <View style={[styles.accountIcon, { backgroundColor: "#f3f4f6" }]}>
                  <FontAwesome name="plus" size={20} color="#dc2626" />
                </View>
                <View style={styles.accountDetails}>
                  <Text style={styles.accountTitle}>Add New Bank Account</Text>
                  <Text style={styles.accountSubtitle}>Link a new bank account for withdrawals</Text>
                </View>
                <View style={styles.radioButton}>
                  {selectedAccount === null && <View style={styles.radioButtonInner} />}
                </View>
              </TouchableOpacity> */}
            </View>

              <View style={styles.accountFormContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Account Number</Text>
                  <TextInput
                    style={styles.input}
                    value={accountNumber}
                    onChangeText={(text) => setAccountNumber(formatAccountNumber(text))}
                    placeholder="Enter account number"
                    keyboardType="number-pad"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Bank Name</Text>
                  <TextInput
                    style={styles.input}
                    value={bankName}
                    onChangeText={(text) => setBankName(formatAccountNumber(text))}
                    placeholder="Enter name of bank"
                    // keyboardType="number-pad"
                    maxLength={9}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Account Holder Name</Text>
                  <TextInput
                    style={styles.input}
                    value={accountName}
                    onChangeText={setAccountName}
                    placeholder="Enter account holder name"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Account Type</Text>
                  <View style={styles.accountTypeContainer}>
                    <TouchableOpacity
                      style={[
                        styles.accountTypeButton,
                        accountType === "checking" && styles.selectedAccountType,
                      ]}
                      onPress={() => setAccountType("checking")}
                    >
                      <Text
                        style={[
                          styles.accountTypeText,
                          accountType === "checking" && styles.selectedAccountTypeText,
                        ]}
                      >
                        Current
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.accountTypeButton,
                        accountType === "savings" && styles.selectedAccountType,
                      ]}
                      onPress={() => setAccountType("savings")}
                    >
                      <Text
                        style={[
                          styles.accountTypeText,
                          accountType === "savings" && styles.selectedAccountTypeText,
                        ]}
                      >
                        Savings
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.saveAccountContainer}
                  onPress={() => setSaveAccount(!saveAccount)}
                >
                  <View style={[styles.checkbox, saveAccount && styles.checkedCheckbox]}>
                    {saveAccount && <FontAwesome name="check" size={14} color="#fff" />}
                  </View>
                  <Text style={styles.saveAccountText}>Save this account for future withdrawals</Text>
                </TouchableOpacity>
              </View>

            <View style={styles.feeContainer}>
              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>Withdrawal Fee</Text>
                <Text style={styles.feeValue}>$0.00</Text>
              </View>
              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>Processing Time</Text>
                <Text style={styles.feeValue}>1-3 Business Days</Text>
              </View>
              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>Total Amount</Text>
                <Text style={styles.feeTotalValue}>
                  ${amount ? (parseFloat(amount) - 0).toFixed(2) : "0.00"}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.withdrawButton,
                (!amount || parseFloat(amount) <= 0) && styles.disabledButton,
              ]}
              onPress={handleWithdraw}
              disabled={!amount || parseFloat(amount) <= 0}
            >
              <Text style={styles.withdrawButtonText}>WITHDRAW MONEY</Text>
            </TouchableOpacity>

            <View style={styles.infoContainer}>
              <FontAwesome name="info-circle" size={16} color="#666" style={styles.infoIcon} />
              <Text style={styles.infoText}>
                Withdrawals are typically processed within 1-3 business days depending on your bank. There is no fee for standard withdrawals.
              </Text>
            </View>

            <View style={styles.limitsContainer}>
              <Text style={styles.limitsTitle}>Withdrawal Limits</Text>
              <View style={styles.limitItem}>
                <Text style={styles.limitLabel}>Per Transaction</Text>
                <Text style={styles.limitValue}>$5,000</Text>
              </View>
              <View style={styles.limitItem}>
                <Text style={styles.limitLabel}>Daily Limit</Text>
                <Text style={styles.limitValue}>$10,000</Text>
              </View>
              <View style={styles.limitItem}>
                <Text style={styles.limitLabel}>Monthly Limit</Text>
                <Text style={styles.limitValue}>$50,000</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingVertical:30
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: "transparent",
    zIndex: 10,
  },
  backButton: {
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
  headerTitle: {
    fontSize: Platform.OS === 'ios' ? 15:20,
    fontWeight: "bold",
    color: "#333",
  },
  topLeftCorner: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 80,
    height: 80,
    backgroundColor: "#dc2626",
    borderBottomRightRadius: 80,
    zIndex: -1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  amountContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  amountLabel: {
    fontSize: Platform.OS === 'ios' ? 12:16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 10,
    marginBottom: 10,
  },
  currencySymbol: {
    fontSize: Platform.OS === 'ios' ? 15: 24,
    fontWeight: "bold",
    color: "#333",
    marginRight: 5,
  },
  amountInput: {
    flex: 1,
    fontSize: Platform.OS === 'ios' ? 15:24,
    fontWeight: "bold",
    color: "#333",
  },
  balanceText: {
    fontSize:Platform.OS === 'ios' ? 10: 14,
    color: "#666",
  },
  quickAmountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 24,
  },
  quickAmountButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  quickAmountText: {
    fontSize: Platform.OS === 'ios' ? 10: 14,
    fontWeight: "600",
    color: "#333",
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: Platform.OS === 'ios' ? 12:18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  accountItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  selectedAccount: {
    borderWidth: 2,
    borderColor: "#dc2626",
  },
  accountIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  accountDetails: {
    flex: 1,
  },
  accountTitle: {
    fontSize:Platform.OS === 'ios' ? 12: 16,
    fontWeight: "600",
    color: "#333",
  },
  accountSubtitle: {
    fontSize:Platform.OS === 'ios' ? 10: 14,
    color: "#666",
    marginTop: 2,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#dc2626",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#dc2626",
  },
  accountFormContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: Platform.OS === 'ios' ? 10:14,
    fontWeight: "500",
    color: "#666",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: Platform.OS === 'ios' ? 12:16,
    color: "#333",
  },
  accountTypeContainer: {
    flexDirection: "row",
    marginTop: 4,
  },
  accountTypeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  accountTypeText: {
    fontSize: Platform.OS === 'ios' ? 10:14,
    color: "#666",
  },
  selectedAccountType: {
    backgroundColor: "#dc2626",
    borderColor: "#dc2626",
  },
  selectedAccountTypeText: {
    color: "#fff",
    fontWeight: "600",
  },
  saveAccountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#dc2626",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedCheckbox: {
    backgroundColor: "#dc2626",
  },
  saveAccountText: {
    fontSize:Platform.OS === 'ios' ? 10: 14,
    color: "#666",
  },
  feeContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  feeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  feeLabel: {
    fontSize: Platform.OS === 'ios' ? 10:14,
    color: "#666",
  },
  feeValue: {
    fontSize:Platform.OS === 'ios' ? 10: 14,
    fontWeight: "500",
    color: "#333",
  },
  feeTotalValue: {
    fontSize: Platform.OS === 'ios' ? 12:16,
    fontWeight: "bold",
    color: "#333",
  },
  withdrawButton: {
    backgroundColor: "#dc2626",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: "#f3f4f6",
  },
  withdrawButtonText: {
    color: "#fff",
    fontSize: Platform.OS === 'ios' ? 12:16,
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  infoIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  infoText: {
    fontSize: Platform.OS === 'ios' ? 10:12,
    color: "#666",
    flex: 1,
    lineHeight: 18,
  },
  limitsContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  limitsTitle: {
    fontSize: Platform.OS === 'ios' ? 12:16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  limitItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  limitLabel: {
    fontSize: Platform.OS === 'ios' ? 10:14,
    color: "#666",
  },
  limitValue: {
    fontSize: Platform.OS === 'ios' ? 10:14,
    fontWeight: "600",
    color: "#333",
 
  }
})