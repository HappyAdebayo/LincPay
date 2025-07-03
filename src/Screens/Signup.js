import { useState } from "react"
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView,Platform } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { ActivityIndicator } from "react-native"
import { useApi } from "../hooks/useApi"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function SignUpScreen() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigation=useNavigation()
const { loading, error, data, callApi } = useApi('http://192.168.77.1:8080/lincpay_backend/api/auth_api.php?action=register', 'POST');

const handleSignUp = async () => {

  if (!username || !password || !confirmPassword) {
    alert('Please fill in all fields');
    return;
  }
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  const result = await callApi({ payload: { username, password } });

  if (result?.status === 'success') {
     try {
      await AsyncStorage.setItem('user_id', String(result.user_id));
      alert('Signup successful!');
      navigation.navigate('ProfileSetupScreen');
    } catch (error) {
      alert('Failed to save user ID locally');
    }
  } else {
    alert(result?.message || 'Signup failed');
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
            <Text style={styles.signUpTitle}>Sign Up</Text>
            <Text style={styles.signUpDescription}>
              Sign up to find your desired job, connect with other skilled professionals, learn up and earn
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

              {loading ? (
                  <View style={{ marginVertical: 20, alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#dc2626" />
                  </View>
                ) : (
                  <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                    <Text style={styles.signUpButtonText}>SIGN UP</Text>
                  </TouchableOpacity>
                )}

                {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}

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
    paddingVertical:30,
  },
  scrollContainer: {
    justifyContent: "center",
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
  signUpTitle: {
    color: "#dc2626",
    fontSize: Platform.OS === 'ios' ? 23 : 28, 
    fontWeight: "bold",
    marginTop: 30,
  },
  signUpDescription: {
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
    fontWeight: "600",
    fontSize: Platform.OS === 'ios' ? 10 : 16, 
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
