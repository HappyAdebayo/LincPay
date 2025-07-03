import { useState,useEffect } from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
  Platform
} from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import ChangePasswordModal from "../Modals/ChangePasswordModal"
import TwoFactorModal from "../Modals/TwoFactorAuth"
import { useNavigation } from "@react-navigation/native"
import { useApi } from "../hooks/useApi"
import AsyncStorage from "@react-native-async-storage/async-storage"


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
  const { callApi, loading, error, data } = useApi('http://192.168.77.1:8080/lincpay_backend/api/user_api.php?action=change_password', 'POST');
  const { callApi: callApi2fa, loading: loading2fa, error: error2fa, data: data2fa } = useApi('http://192.168.77.1:8080/lincpay_backend/api/auth_api.php?action=create_2fa', 'POST');

  useEffect(() => {
    const fetchIs2FA = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          console.log('user',userData);
          
          setTwoFactorEnabled(user.is_2fa === 1 ? true : false);
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    fetchIs2FA();
  }, []);

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
              handleDisableTwoFactor()
              
            },
          },
        ],
      )
    }
  }

 const handleChangePassword = async () => {
  try {
    const userData = await AsyncStorage.getItem('user');
    const parsedUser = JSON.parse(userData);
    const user_id = parsedUser?.id;

    if (!user_id) {
      Alert.alert('Error', 'User not found in storage');
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Validation Error', 'All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Validation Error', 'New password and confirmation do not match');
      return;
    }

    const response = await callApi({
      payload: {
        user_id,
        old_password: currentPassword,
        new_password: newPassword,
      },
    });

    if (response?.status === 'success') {
      Alert.alert('Success', response.message, [
        {
          text: 'OK',
          onPress: () => {
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setShowPasswordModal(false);
          },
        },
      ]);
    } else {
      Alert.alert('Error', response?.message || 'Password update failed');
    }
  } catch (err) {
    console.error(err);
    Alert.alert('Error', 'Something went wrong while changing password');
  }
};


const handleSetupTwoFactor = async () => {
  if (!verificationCode || verificationCode.length !== 4 || verificationCode.trim() === '') {
    Alert.alert("Error", "Please enter a valid 4-digit verification code");
    return;
  }

  if (!/^\d+$/.test(verificationCode)) {
    Alert.alert("Error", "Verification code must be numeric.");
    return;
  }

  try {
    const userData = await AsyncStorage.getItem('user');
    const parsedUser = JSON.parse(userData);
    const user_id = parsedUser?.id;

    if (!user_id) {
      Alert.alert('Error', 'User not found in storage');
      return;
    }
    console.log('verification code', verificationCode);
    
    const payload = {
      user_id,
      verificationCode: verificationCode.trim(),
    };

    const result = await callApi2fa({ payload });

    if (result?.status === 'success') {
      const updatedUser = { ...parsedUser, is_2fa: 1 };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

      Alert.alert("Two-Factor Authentication Enabled", "Your account is now protected with two-factor authentication.", [
        {
          text: "OK",
          onPress: () => {
            setShowTwoFactorModal(false);
            setTwoFactorEnabled(true);
            setVerificationCode("");
          },
        },
      ]);
    } else {
      Alert.alert("Error", result?.message || 'Verification failed. Please try again.');
    }
  } catch (error) {
    Alert.alert("Network Error", "Please try again.");
  }
};


const handleDisableTwoFactor = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (!userData) {
        Alert.alert('Error', 'User data not found');
        return;
      }

      const user = JSON.parse(userData);

      const response = await fetch('http://192.168.77.1:8080/lincpay_backend/api/auth_api.php?action=delete_2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setTwoFactorEnabled(false)
        const updatedUser = { ...user, is_2fa: 0 };
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        setTwoFactorEnabled(false);
        Alert.alert('Success', 'Two-factor authentication disabled.');
        setShowTwoFactorModal(false);
      } else {
        Alert.alert('Error', result.message || 'Failed to disable two-factor authentication.');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error, please try again.');
    }
  };


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
        loading={loading}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingVertical:Platform.OS === 'ios' ? 0 : 30,
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
    fontSize: Platform.OS === 'ios' ? 15 : 20,
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
    fontSize: Platform.OS === 'ios' ? 12 : 16,
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
    fontSize: Platform.OS === 'ios' ? 12 : 16,
    fontWeight: "500",
    color: "#333",
  },
  securityOptionDescription: {
    fontSize: Platform.OS === 'ios' ? 10 : 12,
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
    fontSize: Platform.OS === 'ios' ? 12 :16,
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
    fontSize: Platform.OS === 'ios' ? 10 : 14,
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
    fontSize: Platform.OS === 'ios' ? 13 : 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  passwordInputContainer: {
    marginBottom: 16,
  },
  passwordInputLabel: {
    fontSize: Platform.OS === 'ios' ? 10 : 14,
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
    fontSize: Platform.OS === 'ios' ? 12 : 16,
  },
  passwordRequirements: {
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  passwordRequirementsTitle: {
    fontSize:Platform.OS === 'ios' ? 10 : 14,
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
    fontSize: Platform.OS === 'ios' ? 10 :12,
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
    fontSize: Platform.OS === 'ios' ? 13 :16,
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
    fontSize: Platform.OS === 'ios' ? 13 : 16,
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
    fontSize: Platform.OS === 'ios' ? 12 :16,
    color: "#666",
  },
  twoFactorInstructions: {
    fontSize:Platform.OS === 'ios' ? 10 : 14,
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
    fontSize: Platform.OS === 'ios' ? 12 : 16,
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
    fontSize: Platform.OS === 'ios' ? 12 : 16,
    textAlign: "center",
    letterSpacing: 8,
  },
})
