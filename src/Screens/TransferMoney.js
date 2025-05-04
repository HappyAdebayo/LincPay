import { useState } from "react"
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

export default function TransferMoneyScreen() {
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const navigation=useNavigation()
  const [accountNumber, setAccountNumber] = useState("")
  const [bankName, setBankName] = useState("")

  const handleTransfer = () => {
    if (!amount || Number.parseFloat(amount) <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount to transfer")
      return
    }

    if (Number.parseFloat(amount) > 1245.8) {
      Alert.alert("Insufficient Funds", "You don't have enough funds to transfer this amount")
      return
    }

    if (!accountNumber) {
      Alert.alert("Account Number Required", "Please input an account number")
      return
    }

    Alert.alert("Confirm Transfer", `Are you sure you want to transfer $${amount} to this No. ${accountNumber}?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => {
          setTimeout(() => {
            Alert.alert(
              "Transfer Successful",
              `You have successfully transferred $${amount} to this No. ${accountNumber}.`,
              [
                {
                  text: "OK",
                  onPress: () => {
                    // Reset form
                    setAmount("")
                    setAccountNumber("")
                    setBankName("")
                    setNote("")
                  },
                },
              ],
            )
          }, 1000)
        },
      },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
            <FontAwesome name="arrow-left" size={20} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Transfer Money</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.topLeftCorner} />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            <View style={styles.amountContainer}>
              <Text style={styles.amountLabel}>Amount</Text>
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
              <TouchableOpacity style={styles.quickAmountButton} onPress={() => setAmount("10")}>
                <Text style={styles.quickAmountText}>$10</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickAmountButton} onPress={() => setAmount("25")}>
                <Text style={styles.quickAmountText}>$25</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickAmountButton} onPress={() => setAmount("50")}>
                <Text style={styles.quickAmountText}>$50</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickAmountButton} onPress={() => setAmount("100")}>
                <Text style={styles.quickAmountText}>$100</Text>
              </TouchableOpacity>
            </View>

          <View style={styles.cardFormContainer}>
                         <View style={styles.inputContainer}>
                           <Text style={styles.inputLabel}>Account Number</Text>
                           <View style={styles.cardNumberContainer}>
                             <TextInput
                               style={styles.cardNumberInput}
                               value={accountNumber}
                               onChangeText={(text) => setAccountNumber(text)}
                               placeholder="3091 5670 76"
                               keyboardType="number-pad"
                               maxLength={19}
                             />
                             <View style={styles.cardTypeIcon}>
                               <FontAwesome name="credit-card" size={20} color="#666" />
                             </View>
                           </View>
                         </View>
         
                         <View style={styles.inputContainer}>
                           <Text style={styles.inputLabel}>Bank Name</Text>
                           <TextInput
                             style={styles.input}
                             value={bankName}
                             onChangeText={setBankName}
                             placeholder="FirstBank"
                           />
                         </View>
                       </View>

            <View style={styles.noteSection}>
              <Text style={styles.sectionTitle}>Note (Optional)</Text>
              <TextInput
                style={styles.noteInput}
                placeholder="Add a note for this transfer"
                value={note}
                onChangeText={setNote}
                multiline
                numberOfLines={2}
                textAlignVertical="top"
              />
            </View>


            <View style={styles.feeContainer}>
              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>Transfer Fee</Text>
                <Text style={styles.feeValue}>$0.00</Text>
              </View>
              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>Total Amount</Text>
                <Text style={styles.feeTotalValue}>
                  ${amount ? (Number.parseFloat(amount) + 0).toFixed(2) : "0.00"}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.transferButton,
                (!amount || Number.parseFloat(amount) <= 0 || !accountNumber || !bankName) && styles.disabledButton,
              ]}
              onPress={handleTransfer}
              disabled={!amount || Number.parseFloat(amount) <= 0 || !accountNumber || !bankName}
            >
              <Text style={styles.transferButtonText}>TRANSFER MONEY</Text>
            </TouchableOpacity>

            <View style={styles.securityNoteContainer}>
              <FontAwesome name="lock" size={16} color="#666" style={styles.securityIcon} />
              <Text style={styles.securityNoteText}>
                All transfers are secure and encrypted. Transfers between Lincpay users are instant and free.
              </Text>
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
    fontSize: 20,
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
  scrollContainer: {
    flexGrow: 1,
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
    fontSize: 16,
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginRight: 5,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  balanceText: {
    fontSize: 14,
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
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  recipientSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  clearButton: {
    padding: 5,
  },
  selectedContactContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  selectedContactInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedContactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#dc2626",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  selectedContactName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  selectedContactUsername: {
    fontSize: 14,
    color: "#666",
  },
  changeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#f3f4f6",
  },
  changeButtonText: {
    fontSize: 14,
    color: "#666",
  },
  contactsContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  recentContactsSection: {
    marginBottom: 16,
  },
  recentContactsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  allContactsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  contactsList: {
    maxHeight: 300,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  selectedContactItem: {
    backgroundColor: "#fee2e2",
    borderRadius: 8,
    borderBottomWidth: 0,
    padding: 8,
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  selectedContactAvatar: {
    backgroundColor: "#dc2626",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  contactUsername: {
    fontSize: 14,
    color: "#666",
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
  noResultsContainer: {
    padding: 20,
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 14,
    color: "#666",
  },
  noteSection: {
    marginBottom: 20,
  },
  noteInput: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#333",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    height: 80,
  },
  recurringSection: {
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
  recurringHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleTrack: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#e5e7eb",
    padding: 2,
  },
  toggleTrackActive: {
    backgroundColor: "#dc2626",
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  toggleThumbActive: {
    transform: [{ translateX: 20 }],
  },
  recurringOptions: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  recurringLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    marginBottom: 8,
  },
  frequencyButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  frequencyButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginHorizontal: 4,
    borderRadius: 8,
  },
  activeFrequencyButton: {
    backgroundColor: "#dc2626",
    borderColor: "#dc2626",
  },
  frequencyButtonText: {
    fontSize: 14,
    color: "#666",
  },
  activeFrequencyButtonText: {
    color: "#fff",
    fontWeight: "600",
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
    fontSize: 14,
    color: "#666",
  },
  feeValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  feeTotalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  transferButton: {
    backgroundColor: "#dc2626",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: "#f3f4f6",
  },
  transferButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  securityNoteContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  securityIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  securityNoteText: {
    fontSize: 12,
    color: "#666",
    flex: 1,
    lineHeight: 18,
  },
  cardNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  cardNumberInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
  },
  cardTypeIcon: {
    marginLeft: 8,
  },
  cardFormContainer: {
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
    fontSize: 14,
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
    fontSize: 16,
    color: "#333",
  },

})
