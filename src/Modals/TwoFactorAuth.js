import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';

const TwoFactorModal = ({
  visible,
  onClose,
  verificationCode,
  setVerificationCode,
  handleSetupTwoFactor,
  styles,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
          <Text style={styles.modalTitle}>Set Up Two-Factor Authentication</Text>

    
          <View style={styles.verificationCodeContainer}>
            <TextInput
              style={styles.verificationCodeInput}
              value={verificationCode}
              onChangeText={setVerificationCode}
              placeholder="Enter 4-digit code"
              keyboardType="number-pad"
              maxLength={4}
            />
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelModalButton} onPress={onClose}>
              <Text style={styles.cancelModalButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.confirmModalButton,
                (!verificationCode || verificationCode.length !== 4) && styles.disabledButton,
              ]}
              onPress={handleSetupTwoFactor}
              disabled={!verificationCode || verificationCode.length !== 4}
            >
              <Text style={styles.confirmModalButtonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default TwoFactorModal;
