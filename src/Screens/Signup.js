import { useState } from "react"
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

export default function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigation=useNavigation()

  const handleSignUp = () => {
    console.log({ username, password, confirmPassword })
    // Add your sign up logic here
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          {/* Red corner decoration */}
          <View style={styles.topLeftCorner} />

          {/* Login link */}
          <TouchableOpacity style={styles.loginLink} onPress={()=>navigation.navigate('Login')}>
            <Text style={styles.loginLinkText}>LOGIN</Text>
          </TouchableOpacity>

          <View style={styles.content}>
            {/* Header */}
            <Text style={styles.signUpTitle}>Sign Up</Text>
            <Text style={styles.signUpDescription}>
              Sign up to find your desired job, connect with other skilled professionals, learn up and earn
            </Text>

            {/* Form */}
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Username"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Password"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>

              <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                <Text style={styles.signUpButtonText}>SIGN UP</Text>
              </TouchableOpacity>
            </View>

            {/* Social Login */}
            <View style={styles.socialLoginContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="facebook" size={20} color="#3b5998" style={styles.socialIcon} />
                <Text style={styles.socialButtonText}>Continue with Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="google" size={20} color="#db4437" style={styles.socialIcon} />
                <Text style={styles.socialButtonText}>Continue with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="apple" size={20} color="#000" style={styles.socialIcon} />
                <Text style={styles.socialButtonText}>Continue with Apple ID</Text>
              </TouchableOpacity>
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
    paddingVertical:30
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    // padding: 20,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
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
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    padding: 24,
    paddingTop: 40,
    zIndex: 1,
  },
  signUpTitle: {
    color: "#dc2626",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 30,
  },
  signUpDescription: {
    color: "#666",
    fontSize: 14,
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
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  signUpButton: {
    backgroundColor: "#dc2626",
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  socialLoginContainer: {
    marginTop: 24,
    marginBottom: 24,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
  socialIcon: {
    marginRight: 12,
  },
  socialButtonText: {
    fontSize: 16,
    color: "#333",
  },
  termsText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  termsLink: {
    fontWeight: "600",
    color: "#333",
  },
})
