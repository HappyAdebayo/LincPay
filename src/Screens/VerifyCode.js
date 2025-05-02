import { useState, useRef, useEffect } from "react"
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"

export default function VerifyCode() {
  const [code, setCode] = useState(["", "", "", ""])
  const inputRefs = useRef([])
  const navigation=useNavigation()

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4)
  }, [])

  const handleCodeChange = (text, index) => {
    if (!/^\d*$/.test(text)) return

    const newCode = [...code]
    newCode[index] = text
    setCode(newCode)

    if (text.length === 1 && index < 3) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && code[index] === "") {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleVerifyCode = () => {
    const verificationCode = code.join("")

    if (verificationCode.length !== 4) {
      Alert.alert("Invalid Code", "Please enter all 4 digits of your verification code")
      return
    }

    navigation.navigate('ResetPasswordScreen')
    console.log({ verificationCode })
    Alert.alert("Success", "Your email has been verified successfully!")
  }

  const handleResendCode = () => {
    Alert.alert("Code Resent", "A new verification code has been sent to your email")
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
            <Text style={styles.title}>Enter Code</Text>
            <Text style={styles.description}>Enter the 4-digit verification code we sent to your email address</Text>

            <View style={styles.codeContainer}>
              {[0, 1, 2, 3].map((index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={styles.codeInput}
                  value={code[index]}
                  onChangeText={(text) => handleCodeChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  maxLength={1}
                  keyboardType="number-pad"
                  textAlign="center"
                />
              ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
              <Text style={styles.buttonText}>VERIFY</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resendContainer} onPress={handleResendCode}>
              <Text style={styles.resendText}>
                Didn't receive a code? <Text style={styles.resendLink}>Resend</Text>
              </Text>
            </TouchableOpacity>

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
    paddingVertical: 30,
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
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    padding: 24,
    paddingTop: 40,
    zIndex: 1,
    marginTop:40
  },
  title: {
    color: "#dc2626",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 8,
  },
  description: {
    color: "#666",
    fontSize: 14,
    marginTop: 8,
    marginBottom: 32,
    maxWidth: "90%",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#dc2626",
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  resendContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  resendText: {
    color: "#666",
    fontSize: 14,
  },
  resendLink: {
    color: "#dc2626",
    fontWeight: "600",
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
