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
  ActivityIndicator
} from "react-native"
import { FontAwesome} from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useApi } from "../hooks/useApi"
import PaymentWebView from "../Modals/paymentModal"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function AddMoneyScreen() {
  const [amount, setAmount] = useState("")
  const navigation=useNavigation()
  const { loading, error, data, callApi } = useApi('http://192.168.209.1:8080/lincpay_backend/api/payment_api.php?action=transfer', 'POST');
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddMoney = async () => {

    if (!amount || Number.parseFloat(amount) <= 0) {
        Alert.alert("Invalid amount", "Please enter a valid amount greater than zero.");
        return;
      }

          try {
            const userDataJSON = await AsyncStorage.getItem('user');
            if (!userDataJSON) {
              Alert.alert("User data missing", "Please login again.");
              return;
            }
            const userData = JSON.parse(userDataJSON);
            console.log('userdata',userData);
            
            const user_id = userData.id;
            const email =userData.email
            if (!user_id) {
              Alert.alert("User ID missing", "Please login again.");
              return;
            }
      
            const payload = {
              amount: Number.parseFloat(amount),
              user_id,
              email
            };
      
            const response = await callApi({ payload });
             console.log('response', response);
             
            if (response && response.status === 'success') {
               setPaymentUrl(response.data.authorization_url);
            setModalVisible(true);
              setAmount('');
            } else {
              Alert.alert("Error", response?.message || "Transfer failed");
            }
          } catch (e) {
            Alert.alert("Error", "An unexpected error occurred.");
            console.error(e);
          }
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
            <Text style={styles.headerTitle}>Add Money</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.topLeftCorner} />

          <View style={styles.content}>
            <View style={styles.amountContainer}>
              <Text style={styles.amountLabel}>Amount</Text>
              <View style={styles.amountInputContainer}>
                <Text style={styles.currencySymbol}>₦</Text>
                <TextInput
                  style={styles.amountInput}
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="0.00"
                  keyboardType="decimal-pad"
                  placeholderTextColor="#999"
                />
              </View>
              {/* <Text style={styles.balanceText}>Available Balance: ₦1,245.80</Text> */}
            </View>

            <View style={styles.quickAmountContainer}>
              <TouchableOpacity
                style={styles.quickAmountButton}
                onPress={() => setAmount("10")}
              >
                <Text style={styles.quickAmountText}>₦10</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickAmountButton}
                onPress={() => setAmount("25")}
              >
                <Text style={styles.quickAmountText}>₦25</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickAmountButton}
                onPress={() => setAmount("50")}
              >
                <Text style={styles.quickAmountText}>₦50</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickAmountButton}
                onPress={() => setAmount("100")}
              >
                <Text style={styles.quickAmountText}>₦100</Text>
              </TouchableOpacity>
            </View>

            
            {loading ? (
                              <View style={{  alignItems: 'center' }}>
                                <ActivityIndicator size="large" color="#dc2626" />
                              </View>
                            ) : (
            <TouchableOpacity
              style={[
                styles.addMoneyButton,
                (!amount || parseFloat(amount) <= 0) && styles.disabledButton,
              ]}
              onPress={handleAddMoney}
              disabled={!amount || parseFloat(amount) <= 0}
            >
              <Text style={styles.addMoneyButtonText}>ADD MONEY</Text>
            </TouchableOpacity>
                            )}

            <View style={styles.securityNoteContainer}>
              <FontAwesome name="lock" size={16} color="#666" style={styles.securityIcon} />
              <Text style={styles.securityNoteText}>
                Your payment information is encrypted and secure. We never store your full card details.
              </Text>
            </View>
          </View>

            {modalVisible && (
                  <PaymentWebView 
                    visible={modalVisible} 
                    url={paymentUrl} 
                    onClose={() => setModalVisible(false)}
                    // verifyPayment={verifyPayment} 
                  />
                )}
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
    fontSize:Platform.OS === 'ios' ? 12: 16,
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
    fontSize:Platform.OS === 'ios' ? 15: 24,
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
    fontSize: Platform.OS === 'ios' ? 10:14,
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
    fontSize: Platform.OS === 'ios' ? 10:14,
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
  paymentMethodItem: {
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
  selectedPaymentMethod: {
    borderWidth: 2,
    borderColor: "#dc2626",
  },
  paymentMethodIcon: {
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
  paymentMethodDetails: {
    flex: 1,
  },
  paymentMethodTitle: {
    fontSize: Platform.OS === 'ios' ? 12:16,
    fontWeight: "600",
    color: "#333",
  },
  paymentMethodSubtitle: {
    fontSize: Platform.OS === 'ios' ? 10:14,
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
    fontSize: Platform.OS === 'ios' ? 12:16,
    color: "#333",
  },
  cardTypeIcon: {
    marginLeft: 8,
  },
  rowContainer: {
    flexDirection: "row",
  },
  saveCardContainer: {
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
    // backgroundColor: saveCard => (saveCard ? "#dc2626" : "transparent"),
  },
  saveCardText: {
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
    fontSize: Platform.OS === 'ios' ? 10:14,
    fontWeight: "500",
    color: "#333",
  },
  feeTotalValue: {
    fontSize: Platform.OS === 'ios' ? 12:16,
    fontWeight: "bold",
    color: "#333",
  },
  addMoneyButton: {
    backgroundColor: "#dc2626",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: "#f3f4f6",
  },
  addMoneyButtonText: {
    color: "#fff",
    fontSize: Platform.OS === 'ios' ? 12:16,
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
    fontSize: Platform.OS === 'ios' ? 10:12,
    color: "#666",
    flex: 1,
    lineHeight: 18,
  },
})
