import { useState } from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
} from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import ChangePasswordModal from "../Modals/ChangePasswordModal"
import TwoFactorModal from "../Modals/TwoFactorAuth"
import { useNavigation } from "@react-navigation/native"

export default function SecurityScreen() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false)
  const navigation=useNavigation()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [verificationCode, setVerificationCode] = useState("")

  const handleToggleTwoFactor = () => {
    if (!twoFactorEnabled) {
      setShowTwoFactorModal(true)
    } else {
      Alert.alert(
        "Disable Two-Factor Authentication",
        "Are you sure you want to disable two-factor authentication? This will make your account less secure.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Disable",
            style: "destructive",
            onPress: () => {
              setTwoFactorEnabled(false)
              Alert.alert(
                "Two-Factor Authentication Disabled",
                "Two-factor authentication has been disabled for your account.",
              )
            },
          },
        ],
      )
    }
  }

  const handleChangePassword = () => {
    if (!currentPassword) {
      Alert.alert("Error", "Please enter your current password")
      return
    }

    if (!newPassword) {
      Alert.alert("Error", "Please enter a new password")
      return
    }

    if (newPassword.length < 8) {
      Alert.alert("Error", "New password must be at least 8 characters long")
      return
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match")
      return
    }

    Alert.alert("Password Changed", "Your password has been successfully updated.", [
      {
        text: "OK",
        onPress: () => {
          setShowPasswordModal(false)
          setCurrentPassword("")
          setNewPassword("")
          setConfirmPassword("")
        },
      },
    ])
  }

  const handleSetupTwoFactor = () => {
    if (!verificationCode || verificationCode.length !== 6) {
      Alert.alert("Error", "Please enter a valid 6-digit verification code")
      return
    }

    Alert.alert("Two-Factor Authentication Enabled", "Your account is now protected with two-factor authentication.", [
      {
        text: "OK",
        onPress: () => {
          setShowTwoFactorModal(false)
          setTwoFactorEnabled(true)
          setVerificationCode("")
        },
      },
    ])
  }

  const handleLogoutAllDevices = () => {
    Alert.alert(
      "Log Out All Devices",
      "Are you sure you want to log out of all devices? You will need to log in again on all your devices.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log Out All",
          style: "destructive",
          onPress: () => {
            Alert.alert("Success", "You have been logged out of all devices.")
          },
        },
      ],
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
          <FontAwesome name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Security</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.topLeftCorner} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Password</Text>

            <TouchableOpacity style={styles.securityOption} onPress={() => setShowPasswordModal(true)}>
              <View style={styles.securityOptionContent}>
                <FontAwesome name="lock" size={20} color="#dc2626" style={styles.securityOptionIcon} />
                <View>
                  <Text style={styles.securityOptionTitle}>Change Password</Text>
                  <Text style={styles.securityOptionDescription}>Last changed 30 days ago</Text>
                </View>
              </View>
              <FontAwesome name="chevron-right" size={16} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Two-Factor Authentication</Text>

            <View style={styles.securityToggleOption}>
              <View style={styles.securityOptionContent}>
                <FontAwesome name="key" size={20} color="#dc2626" style={styles.securityOptionIcon} />
                <View>
                  <Text style={styles.securityOptionTitle}>Two-Factor Authentication</Text>
                  <Text style={styles.securityOptionDescription}>
                    {twoFactorEnabled
                      ? "Adds an extra layer of security to your account"
                      : "Enable for additional account security"}
                  </Text>
                </View>
              </View>
              <Switch
                value={twoFactorEnabled}
                onValueChange={handleToggleTwoFactor}
                trackColor={{ false: "#e5e7eb", true: "#fee2e2" }}
                thumbColor={twoFactorEnabled ? "#dc2626" : "#f4f3f4"}
              />
            </View>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Notifications</Text>

            <View style={styles.securityToggleOption}>
              <View style={styles.securityOptionContent}>
                <FontAwesome name="bell" size={20} color="#dc2626" style={styles.securityOptionIcon} />
                <View>
                  <Text style={styles.securityOptionTitle}>Security Alerts</Text>
                  <Text style={styles.securityOptionDescription}>Get notified about important security events</Text>
                </View>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#e5e7eb", true: "#fee2e2" }}
                thumbColor={notificationsEnabled ? "#dc2626" : "#f4f3f4"}
              />
            </View>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Device Management</Text>

            <TouchableOpacity style={[styles.securityOption, styles.logoutOption]} onPress={handleLogoutAllDevices}>
              <View style={styles.securityOptionContent}>
                <FontAwesome name="sign-out" size={20} color="#dc2626" style={styles.securityOptionIcon} />
                <View>
                  <Text style={styles.securityOptionTitle}>Log Out All Devices</Text>
                  <Text style={styles.securityOptionDescription}>Sign out from all devices where you're logged in</Text>
                </View>
              </View>
              <FontAwesome name="chevron-right" size={16} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.securityTipsCard}>
            <View style={styles.securityTipsHeader}>
              <FontAwesome name="lightbulb-o" size={20} color="#dc2626" />
              <Text style={styles.securityTipsTitle}>Security Tips</Text>
            </View>
            <View style={styles.securityTip}>
              <FontAwesome name="check-circle" size={16} color="#16a34a" style={styles.securityTipIcon} />
              <Text style={styles.securityTipText}>Use a strong, unique password</Text>
            </View>
            <View style={styles.securityTip}>
              <FontAwesome name="check-circle" size={16} color="#16a34a" style={styles.securityTipIcon} />
              <Text style={styles.securityTipText}>Enable two-factor authentication</Text>
            </View>
            <View style={styles.securityTip}>
              <FontAwesome name="check-circle" size={16} color="#16a34a" style={styles.securityTipIcon} />
              <Text style={styles.securityTipText}>Keep your email address up to date</Text>
            </View>
            <View style={styles.securityTip}>
              <FontAwesome name="check-circle" size={16} color="#16a34a" style={styles.securityTipIcon} />
              <Text style={styles.securityTipText}>Be cautious of suspicious links and emails</Text>
            </View>
          </View>
        </View>
      </ScrollView>



      <TwoFactorModal
        visible={showTwoFactorModal}
        onClose={() => setShowTwoFactorModal(false)}
        verificationCode={verificationCode}
        setVerificationCode={setVerificationCode}
        handleSetupTwoFactor={handleSetupTwoFactor}
        styles={styles}
        />

      <ChangePasswordModal
        visible={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        currentPassword={currentPassword}
        setCurrentPassword={setCurrentPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        handleChangePassword={handleChangePassword}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingVertical:30
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
    fontSize: 20,
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
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  securityOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  logoutOption: {
    borderBottomWidth: 0,
  },
  securityOptionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  securityOptionIcon: {
    marginRight: 16,
    width: 24,
    textAlign: "center",
  },
  securityOptionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  securityOptionDescription: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
    width:200
  },
  securityToggleOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  securityTipsCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  securityTipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  securityTipsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  securityTip: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  securityTipIcon: {
    marginRight: 10,
  },
  securityTipText: {
    fontSize: 14,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  passwordInputContainer: {
    marginBottom: 16,
  },
  passwordInputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    marginBottom: 8,
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  passwordRequirements: {
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  passwordRequirementsTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  passwordRequirement: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  passwordRequirementIcon: {
    marginRight: 8,
  },
  passwordRequirementText: {
    fontSize: 12,
    color: "#666",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelModalButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    marginRight: 8,
  },
  cancelModalButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  confirmModalButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#dc2626",
    borderRadius: 8,
    marginLeft: 8,
  },
  confirmModalButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  disabledButton: {
    backgroundColor: "#f3f4f6",
  },
  twoFactorQrContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  twoFactorQrCode: {
    width: 160,
    height: 160,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  twoFactorQrPlaceholder: {
    fontSize: 16,
    color: "#666",
  },
  twoFactorInstructions: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    textAlign: "center",
  },
  twoFactorSecretContainer: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  twoFactorSecret: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    letterSpacing: 1,
  },
  verificationCodeContainer: {
    marginBottom: 20,
  },
  verificationCodeInput: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    textAlign: "center",
    letterSpacing: 8,
  },
})
