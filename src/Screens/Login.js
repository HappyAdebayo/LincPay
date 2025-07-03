import { useState } from "react"
import { StyleSheet,Alert, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView,Platform ,ActivityIndicator} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useApi } from "../hooks/useApi"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigation=useNavigation()

  const { loading, data, callApi } = useApi('http://192.168.77.1:8080/lincpay_backend/api/auth_api.php?action=login', 'POST');

  const handleLogin =async () => {
    if (!username || !password) {
      Alert.alert('Validation Error', 'Username and password are required.');
      return;
    }
    
    const response = await callApi({
      payload: { username, password },
    });
    console.log(response);
    
    if (response?.status === 'success') {
       if (response?.user?.is_2fa == 1) {
          console.log("✅ User has 2FA enabled");
          await AsyncStorage.setItem('user_id', String(response.user.id));
          navigation.navigate('Auth');
        }else{
        await AsyncStorage.setItem('user', JSON.stringify(response.user));
        Alert.alert('Success', 'Login successful!');
        navigation.replace('BottomTab')
      }
    }else if(response?.status =="not_validated"){
       try {
      await AsyncStorage.setItem('user_id', String(response.user_id));
      navigation.navigate('ProfileSetupScreen')
    } catch (error) {
      alert('Failed to save user ID locally');
    }
    } 
    else if (response?.message) {
      Alert.alert('Login Failed', response.message);
    }
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
                {loading ? (
                  <View style={{ marginVertical: 20, alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#dc2626" />
                  </View>
                ) : (
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                  <Text style={styles.loginButtonText}>LOGIN</Text>
                </TouchableOpacity>
                )}
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
    fontWeight: "600",
    textTransform: "uppercase",
    fontSize: Platform.OS === 'ios' ? 10 : 12, 
  },
  loginTitle: {
    color: "#dc2626",
    fontSize: Platform.OS === 'ios' ? 23 : 28, 
    fontWeight: "bold",
    marginTop: 20,
  },
  loginDescription: {
    color: "#666",
    fontSize: Platform.OS === 'ios' ? 10 : 14, 
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
  },
  forgotPasswordContainer: {
    alignItems: "flex-start",
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: "#666",
    fontSize: Platform.OS === 'ios' ? 10 : 14, 
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
    fontSize: Platform.OS === 'ios' ? 10 : 16, 
    fontWeight: "600",
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
    color: "#666",
    textAlign: "center",
    fontSize: Platform.OS === 'ios' ? 10 : 12, 

  },
  termsLink: {
    fontWeight: "600",
    color: "#333",
  },
})
