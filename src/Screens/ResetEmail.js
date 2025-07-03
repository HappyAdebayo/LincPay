import { useState } from "react"
import { StyleSheet,Platform, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useApi } from "../hooks/useApi"

export default function ResetEmailScreen() {
  const [email, setEmail] = useState("")
  const navigation=useNavigation()
  const { loading, error, data, callApi } = useApi('http://192.168.77.1:8080/lincpay_backend/api/user_api.php?action=reset_password', 'POST');
  
const handleSendCode = async () => {
  if (!email || !email.includes("@")) {
    Alert.alert("Invalid Email", "Please enter a valid email address");
    return;
  }

  try {
    const payload = { email };
    const response = await callApi({ payload }); // Make sure this is POST

    console.log('response', response);

    if (response?.status === 'success') {
      Alert.alert("Verification Code Sent", response.message || "Code sent successfully");
      navigation.navigate('VerifyResetCode', { email });
    } else {
      Alert.alert("Error", response?.message || "Request failed");
    }
  } catch (error) {
    console.error("Send Code Error:", error);
    Alert.alert("Error", "An unexpected error occurred.");
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <View style={styles.topLeftCorner} />

          <TouchableOpacity style={styles.loginLink} onPress={()=>navigation.navigate('Login')}>
            <Text style={styles.loginLinkText}>LOGIN</Text>
          </TouchableOpacity>

          <View style={styles.content}>
            <Text style={styles.title}>Verify Email</Text>
            <Text style={styles.description}>
              Enter your email address to receive a verification code. This helps us ensure your account security.
            </Text>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Email Address"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity style={styles.button} onPress={handleSendCode} disabled={loading}>
                <Text style={styles.buttonText}>SEND VERIFICATION CODE</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.infoContainer}>
              <FontAwesome name="info-circle" size={16} color="#666" style={styles.infoIcon} />
              <Text style={styles.infoText}>
                Didn't receive a code? Check your spam folder or try again in a few minutes.
              </Text>
            </View>

            {/* Terms */}
            <Text style={styles.termsText}>
              By continuing, you agree to our <Text style={styles.termsLink}>Terms and Conditions</Text> and have read
              our <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical:30,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    position: "relative",
    overflow: "hidden",
  },
  topLeftCorner: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 80,
    height: 80,
    backgroundColor: "#dc2626",
    borderBottomRightRadius: 80,
  },
  loginLink: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 10,
  },
  loginLinkText: {
    color: "#dc2626",
    fontSize: Platform.OS === 'ios' ? 10 : 14, 
    fontWeight: "600",
  },
  content: {
    padding: 24,
    paddingTop: 40,
    zIndex: 1,
  },
  title: {
    color: "#dc2626",
    fontSize: Platform.OS === 'ios' ? 23 : 28, 
    fontWeight: "bold",
    marginTop: 120,
  },
  description: {
    color: "#666",
    fontSize: Platform.OS === 'ios' ? 10 : 14,
    marginTop: 8,
    marginBottom: 24,
    maxWidth: "90%",
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: "#dc2626",
    fontSize: Platform.OS === 'ios' ? 10 : 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 6,
    padding: 12,
    fontSize: Platform.OS === 'ios' ? 10 : 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#dc2626",
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: Platform.OS === 'ios' ? 10 : 16, 
    fontWeight: "600",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 6,
    marginBottom: 24,
  },
  infoIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  infoText: {
    color: "#666",
    fontSize: Platform.OS === 'ios' ? 10 : 14,
    flex: 1,
  },
  termsText: {
    fontSize: 12,
    fontSize: Platform.OS === 'ios' ? 10 : 12, 
    color: "#666",
    textAlign: "center",
  },
  termsLink: {
    fontWeight: "600",
    color: "#333",
  },
})
