import React from 'react';
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

          <View style={styles.twoFactorQrContainer}>
            <View style={styles.twoFactorQrCode}>
              <Text style={styles.twoFactorQrPlaceholder}>QR Code</Text>
            </View>
            <Text style={styles.twoFactorInstructions}>1. Open your authenticator app</Text>
            <Text style={styles.twoFactorInstructions}>2. Scan this QR code or enter the code below</Text>
            <View style={styles.twoFactorSecretContainer}>
              <Text style={styles.twoFactorSecret}>ABCD-EFGH-IJKL-MNOP</Text>
            </View>
            <Text style={styles.twoFactorInstructions}>3. Enter the 6-digit verification code</Text>
          </View>

          <View style={styles.verificationCodeContainer}>
            <TextInput
              style={styles.verificationCodeInput}
              value={verificationCode}
              onChangeText={setVerificationCode}
              placeholder="Enter 6-digit code"
              keyboardType="number-pad"
              maxLength={6}
            />
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelModalButton} onPress={onClose}>
              <Text style={styles.cancelModalButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.confirmModalButton,
                (!verificationCode || verificationCode.length !== 6) && styles.disabledButton,
              ]}
              onPress={handleSetupTwoFactor}
              disabled={!verificationCode || verificationCode.length !== 6}
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
