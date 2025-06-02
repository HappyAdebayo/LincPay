import { StyleSheet, Platform, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

export default function PasswordResetSuccessScreen() {
  const navigation= useNavigation()
  const handleGoToLogin = () => {
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <View style={styles.topLeftCorner} />

          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <FontAwesome name="check" size={50} color="#fff" />
              </View>
            </View>

            <Text style={styles.title}>Success!</Text>
            <Text style={styles.description}>
              Your password has been changed successfully. You can now log in with your new password.
            </Text>

            <View style={styles.nextStepsContainer}>
              <Text style={styles.nextStepsTitle}>What happens next?</Text>

              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <Text style={styles.stepText}>You'll be redirected to the login page</Text>
              </View>

              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <Text style={styles.stepText}>Use your email and new password to log in</Text>
              </View>

              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <Text style={styles.stepText}>You'll have full access to your account</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleGoToLogin}>
              <Text style={styles.buttonText}>GO TO LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.helpContainer}>
              <FontAwesome name="question-circle" size={16} color="#666" style={styles.helpIcon} />
              <Text style={styles.helpText}>Need help? Contact support</Text>
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
    // justifyContent: "center",
    // paddingVertical: 30,
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
  content: {
    padding: 24,
    paddingTop: 40,
    zIndex: 1,
    alignItems: "center",
  },
  iconContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#dc2626",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#dc2626",
    fontSize: Platform.OS === 'ios' ? 20 : 28, 
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },
  description: {
    color: "#666",
    fontSize: Platform.OS === 'ios' ? 10 : 16,
    marginTop: 8,
    marginBottom: 24,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  nextStepsContainer: {
    width: "100%",
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  nextStepsTitle: {
    color: "#333",
    fontSize: Platform.OS === 'ios' ? 10 : 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#dc2626",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  stepNumberText: {
    color: "#fff",
    fontSize: Platform.OS === 'ios' ? 10 : 14,
    fontWeight: "bold",
  },
  stepText: {
    color: "#666",
    fontSize: Platform.OS === 'ios' ? 10 : 14,
    flex: 1,
  },
  button: {
    backgroundColor: "#dc2626",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: Platform.OS === 'ios' ? 10 : 16,
    fontWeight: "600",
  },
  helpContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  helpIcon: {
    marginRight: 8,
  },
  helpText: {
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
