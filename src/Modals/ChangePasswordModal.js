import { Modal,ActivityIndicator, View, Text, TextInput, TouchableOpacity,Platform, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const ChangePasswordModal = ({
  visible,
  onClose,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  handleChangePassword,
  loading
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
          <Text style={styles.modalTitle}>Change Password</Text>

          <View style={styles.passwordInputContainer}>
            <Text style={styles.passwordInputLabel}>Current Password</Text>
            <TextInput
              style={styles.passwordInput}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              placeholder="Enter current password"
            />
          </View>

          <View style={styles.passwordInputContainer}>
            <Text style={styles.passwordInputLabel}>New Password</Text>
            <TextInput
              style={styles.passwordInput}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              placeholder="Enter new password"
            />
          </View>

          <View style={styles.passwordInputContainer}>
            <Text style={styles.passwordInputLabel}>Confirm New Password</Text>
            <TextInput
              style={styles.passwordInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="Confirm new password"
            />
          </View>

          <View style={styles.passwordRequirements}>
            <Text style={styles.passwordRequirementsTitle}>Password Requirements:</Text>

            <View style={styles.passwordRequirement}>
              <FontAwesome
                name={newPassword.length >= 8 ? "check-circle" : "circle-o"}
                size={14}
                color={newPassword.length >= 8 ? "#16a34a" : "#666"}
                style={styles.passwordRequirementIcon}
              />
              <Text style={styles.passwordRequirementText}>At least 8 characters</Text>
            </View>

            <View style={styles.passwordRequirement}>
              <FontAwesome
                name={/[A-Z]/.test(newPassword) ? "check-circle" : "circle-o"}
                size={14}
                color={/[A-Z]/.test(newPassword) ? "#16a34a" : "#666"}
                style={styles.passwordRequirementIcon}
              />
              <Text style={styles.passwordRequirementText}>At least one uppercase letter</Text>
            </View>

            <View style={styles.passwordRequirement}>
              <FontAwesome
                name={/[0-9]/.test(newPassword) ? "check-circle" : "circle-o"}
                size={14}
                color={/[0-9]/.test(newPassword) ? "#16a34a" : "#666"}
                style={styles.passwordRequirementIcon}
              />
              <Text style={styles.passwordRequirementText}>At least one number</Text>
            </View>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelModalButton} onPress={onClose}>
              <Text style={styles.cancelModalButtonText}>Cancel</Text>
            </TouchableOpacity>

           {loading ? (
              <View style={{alignItems: 'center',flex:1,marginLeft: 8 }}>
                <ActivityIndicator size="large" color="#dc2626" />
              </View>
            ) : (
            <TouchableOpacity
              style={[
                styles.confirmModalButton,
                (!currentPassword || !newPassword || !confirmPassword) && styles.disabledButton,
              ]}
              onPress={handleChangePassword}
              disabled={!currentPassword || !newPassword || !confirmPassword}
            >
              <Text style={styles.confirmModalButtonText}>Change Password</Text>
            </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

export default ChangePasswordModal

const styles = StyleSheet.create({
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
        fontSize: Platform.OS === 'ios' ? 15 : 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
        textAlign: "center",
      },
      passwordInputContainer: {
        marginBottom: 16,
      },
      passwordInputLabel: {
        fontSize: Platform.OS === 'ios' ? 11 : 14,
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
        fontSize: Platform.OS === 'ios' ? 10 :14,
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
        fontSize: Platform.OS === 'ios' ? 10 : 12,
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
        fontSize: Platform.OS === 'ios' ? 13 : 16,
        fontWeight: "500",
        color: "#666",
      },
      confirmModalButton: {
        flex: 1,
        paddingVertical:Platform.OS === 'ios' ? 0 : 12,
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
})
