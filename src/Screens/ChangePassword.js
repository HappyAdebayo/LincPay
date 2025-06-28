import { useState } from "react"
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert,Platform } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { useNavigation,useRoute } from "@react-navigation/native"
import { useApi } from "../hooks/useApi"

export default function ResetPasswordScreen() {
  const route =useRoute();
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigation=useNavigation()
  const { loading, error, data, callApi } = useApi('http://192.168.155.1:8080/lincpay_backend/api/user_api.php?action=reset_password_code', 'POST');
  const { code } = route.params;

  const handleResetPassword = async () => {
    if (newPassword.length < 8) {
      Alert.alert("Password Too Short", "Your password must be at least 8 characters long")
      return
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Passwords Don't Match", "Please make sure your passwords match")
      return
    }

        try {
     
      const payload = {
        code,
        new_password:newPassword
      };

      const response = await callApi({ payload });
       console.log('response', response);
       
      if (response && response.status === 'success') {
        navigation.navigate('PasswordResetSuccessScreen')
        Alert.alert("Success", response?.message || "Transfer Success");
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <View style={styles.topLeftCorner} />

          <TouchableOpacity style={styles.loginLink} onPress={()=>navigation.navigate('Login')}>
            <Text style={styles.loginLinkText}>LOGIN</Text>
          </TouchableOpacity>

          <View style={styles.content}>
            <Text style={styles.title}>New Password</Text>
            <Text style={styles.description}>
              Create a new password for your account. Make sure it's strong and secure.
            </Text>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>New Password</Text>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                    <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <FontAwesome name={showConfirmPassword ? "eye" : "eye-slash"} size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.strengthContainer}>
                <Text style={styles.strengthText}>Password strength:</Text>
                <View style={styles.strengthIndicator}>
                  <View
                    style={[
                      styles.strengthBar,
                      {
                        width: `${Math.min(newPassword.length * 10, 100)}%`,
                        backgroundColor:
                          newPassword.length < 4 ? "#f87171" : newPassword.length < 8 ? "#fbbf24" : "#34d399",
                      },
                    ]}
                  />
                </View>
                <Text style={styles.strengthHint}>
                  {newPassword.length < 4 ? "Weak" : newPassword.length < 8 ? "Medium" : "Strong"}
                </Text>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={loading}>
                <Text style={styles.buttonText}>RESET PASSWORD</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.requirementsContainer}>
              <Text style={styles.requirementsTitle}>Password Requirements:</Text>
              <View style={styles.requirementItem}>
                <FontAwesome
                  name={newPassword.length >= 8 ? "check-circle" : "circle-o"}
                  size={16}
                  color={newPassword.length >= 8 ? "#34d399" : "#666"}
                  style={styles.requirementIcon}
                />
                <Text style={styles.requirementText}>At least 8 characters</Text>
              </View>
              <View style={styles.requirementItem}>
                <FontAwesome
                  name={/[A-Z]/.test(newPassword) ? "check-circle" : "circle-o"}
                  size={16}
                  color={/[A-Z]/.test(newPassword) ? "#34d399" : "#666"}
                  style={styles.requirementIcon}
                />
                <Text style={styles.requirementText}>At least one uppercase letter</Text>
              </View>
              <View style={styles.requirementItem}>
                <FontAwesome
                  name={/[0-9]/.test(newPassword) ? "check-circle" : "circle-o"}
                  size={16}
                  color={/[0-9]/.test(newPassword) ? "#34d399" : "#666"}
                  style={styles.requirementIcon}
                />
                <Text style={styles.requirementText}>At least one number</Text>
              </View>
            </View>

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
    marginTop:30
  },
  title: {
    color: "#dc2626",
    fontSize: 28,
    fontSize: Platform.OS === 'ios' ? 20 : 28, 
    fontWeight: "bold",
    marginTop: 8,
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
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: Platform.OS === 'ios' ? 10 : 16,
  },
  eyeIcon: {
    padding: 12,
  },
  strengthContainer: {
    marginBottom: 16,
  },
  strengthText: {
    color: "#666",
    fontSize: Platform.OS === 'ios' ? 10 : 14, 
    marginBottom: 4,
  },
  strengthIndicator: {
    height: 6,
    backgroundColor: "#e2e8f0",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 4,
  },
  strengthBar: {
    height: "100%",
  },
  strengthHint: {
    color: "#666",
    fontSize: Platform.OS === 'ios' ? 10 : 12,
    textAlign: "right",
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
  requirementsContainer: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 6,
    marginBottom: 24,
  },
  requirementsTitle: {
    color: "#333",
    fontSize: Platform.OS === 'ios' ? 10 : 14, 
    fontWeight: "600",
    marginBottom: 8,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  requirementIcon: {
    marginRight: 8,
  },
  requirementText: {
    color: "#666",
    fontSize: Platform.OS === 'ios' ? 10 : 14,
  },
  termsText: {
    fontSize: Platform.OS === 'ios' ? 10 : 12,
    color: "#666",
    textAlign: "center",
  },
  termsLink: {
    fontWeight: "600",
    color: "#333",
  },
})
