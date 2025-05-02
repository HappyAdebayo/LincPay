import { useState } from "react"
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

export default function LoginScreen() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigation=useNavigation()

  const handleLogin = () => {
    navigation.navigate('BottomTab')
    console.log({ username, password })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <View style={styles.topRightCorner} />
          <View style={styles.bottomLeftCorner} />

          <View style={styles.content}>
            <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
            <   Text style={styles.signUpText}>SIGN UP</Text>
            </TouchableOpacity>
            <Text style={styles.loginTitle}>Login</Text>
            <Text style={styles.loginDescription}>
            Login to track your spending, save for what matters, and take control of your finances.
            </Text>

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

              <View style={styles.forgotPasswordContainer}>
                <TouchableOpacity onPress={()=>navigation.navigate('ResetEmailScreen')}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.loginButtonContainer}>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                  <Text style={styles.loginButtonText}>LOGIN</Text>
                </TouchableOpacity>
              </View>
            </View>

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
  },
  formContainer: {
    backgroundColor: "#fff",
    overflow: "hidden",
    height:'100%'
  },
  topRightCorner: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 80,
    height: 80,
    backgroundColor: "#dc2626",
    borderBottomLeftRadius: 80,
  },
  bottomLeftCorner: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 80,
    height: 80,
    backgroundColor: "#dc2626",
    borderTopRightRadius: 80,
  },
  content: {
    padding: 24,
    zIndex: 1,
  },
  signUpText: {
    color: "#dc2626",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  loginTitle: {
    color: "#dc2626",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
  },
  loginDescription: {
    color: "#666",
    fontSize: 14,
    marginTop: 8,
    marginBottom: 24,
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
  },
  forgotPasswordContainer: {
    alignItems: "flex-start",
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: "#666",
    fontSize: 14,
  },
  loginButtonContainer: {
    alignItems: "flex-end",
  },
  loginButton: {
    backgroundColor: "#dc2626",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  socialLoginContainer: {
    marginTop: 40,
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
