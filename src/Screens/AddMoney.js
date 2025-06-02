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
  Platform
} from "react-native"
import { FontAwesome} from "@expo/vector-icons"
import { SavedPaymentMethods } from "../Data/Data"
import { useNavigation } from "@react-navigation/native"

export default function AddMoneyScreen() {
  const [amount, setAmount] = useState("")
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [saveCard, setSaveCard] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardholderName, setCardholderName] = useState("")
  const navigation=useNavigation()

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\D/g, "")
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ")
    return formatted.slice(0, 19)
  }

  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/\D/g, "")
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
    }
    return cleaned
  }

  const handleAddMoney = () => {
    console.log({
      amount,
      selectedMethod,
      cardDetails: selectedMethod ? null : { cardNumber, expiryDate, cvv, cardholderName, saveCard },
    })
    alert(`$${amount} will be added to your account`)
  }

  const getCardIcon = (type) => {
    switch (type) {
      case "visa":
        return <FontAwesome name="cc-visa" size={24} color="#1434CB" />
      case "mastercard":
        return <FontAwesome name="cc-mastercard" size={24} color="#EB001B" />
      default:
        return <FontAwesome name="credit-card" size={24} color="#666" />
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
                onPress={() => setAmount("10")}
              >
                <Text style={styles.quickAmountText}>$10</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickAmountButton}
                onPress={() => setAmount("25")}
              >
                <Text style={styles.quickAmountText}>$25</Text>
              </TouchableOpacity>
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
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Payment Method</Text>

              {SavedPaymentMethods.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.paymentMethodItem,
                    selectedMethod === method.id && styles.selectedPaymentMethod,
                  ]}
                  onPress={() => setSelectedMethod(method.id)}
                >
                  <View style={styles.paymentMethodIcon}>{getCardIcon(method.type)}</View>
                  <View style={styles.paymentMethodDetails}>
                    <Text style={styles.paymentMethodTitle}>
                      {method.type.charAt(0).toUpperCase() + method.type.slice(1)} •••• {method.lastFour}
                    </Text>
                    <Text style={styles.paymentMethodSubtitle}>Expires {method.expiryDate}</Text>
                  </View>
                  <View style={styles.radioButton}>
                    {selectedMethod === method.id && <View style={styles.radioButtonInner} />}
                  </View>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={[
                  styles.paymentMethodItem,
                  selectedMethod === null && styles.selectedPaymentMethod,
                ]}
                onPress={() => setSelectedMethod(null)}
              >
                <View style={[styles.paymentMethodIcon, { backgroundColor: "#f3f4f6" }]}>
                  <FontAwesome name="plus" size={20} color="#dc2626" />
                </View>
                <View style={styles.paymentMethodDetails}>
                  <Text style={styles.paymentMethodTitle}>Add New Card</Text>
                  <Text style={styles.paymentMethodSubtitle}>Add a new credit or debit card</Text>
                </View>
                <View style={styles.radioButton}>
                  {selectedMethod === null && <View style={styles.radioButtonInner} />}
                </View>
              </TouchableOpacity>
            </View>

            {selectedMethod === null && (
              <View style={styles.cardFormContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Card Number</Text>
                  <View style={styles.cardNumberContainer}>
                    <TextInput
                      style={styles.cardNumberInput}
                      value={cardNumber}
                      onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                      placeholder="1234 5678 9012 3456"
                      keyboardType="number-pad"
                      maxLength={19}
                    />
                    <View style={styles.cardTypeIcon}>
                      <FontAwesome name="credit-card" size={20} color="#666" />
                    </View>
                  </View>
                </View>

                <View style={styles.rowContainer}>
                  <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
                    <Text style={styles.inputLabel}>Expiry Date</Text>
                    <TextInput
                      style={styles.input}
                      value={expiryDate}
                      onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                      placeholder="MM/YY"
                      keyboardType="number-pad"
                      maxLength={5}
                    />
                  </View>
                  <View style={[styles.inputContainer, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>CVV</Text>
                    <TextInput
                      style={styles.input}
                      value={cvv}
                      onChangeText={setCvv}
                      placeholder="123"
                      keyboardType="number-pad"
                      maxLength={3}
                      secureTextEntry
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Cardholder Name</Text>
                  <TextInput
                    style={styles.input}
                    value={cardholderName}
                    onChangeText={setCardholderName}
                    placeholder="John Doe"
                  />
                </View>

                <TouchableOpacity
                  style={styles.saveCardContainer}
                  onPress={() => setSaveCard(!saveCard)}
                >
                  <View style={styles.checkbox}>
                    {saveCard && <FontAwesome name="check" size={14} color="#fff" />}
                  </View>
                  <Text style={styles.saveCardText}>Save this card for future payments</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.feeContainer}>
              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>Processing Fee</Text>
                <Text style={styles.feeValue}>$0.00</Text>
              </View>
              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>Total Amount</Text>
                <Text style={styles.feeTotalValue}>
                  ${amount ? (parseFloat(amount) + 0).toFixed(2) : "0.00"}
                </Text>
              </View>
            </View>

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

            <View style={styles.securityNoteContainer}>
              <FontAwesome name="lock" size={16} color="#666" style={styles.securityIcon} />
              <Text style={styles.securityNoteText}>
                Your payment information is encrypted and secure. We never store your full card details.
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
