import React, { useRef } from 'react';
import { Modal, View, Button, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

export default function PaymentWebView({ visible, url, onClose }) {
  const hasVerifiedRef = useRef(false);

  const verifyPayment = async (reference) => {
    try {
      const response = await fetch(`http://192.168.74.1/lincpay_backend/api/verify_payment.php?reference=${reference}`);
      const responseText = await response.text();
      console.log('Verify payment response text:', responseText);

      const result = JSON.parse(responseText);

      if (result.status === 'success' && result.payment_status === 'success') {
        Alert.alert('Payment Successful', 'Thank you for your payment!');
      } else if (result.payment_status === 'failed') {
        Alert.alert('Payment Failed', 'The payment was not successful.');
      } else {
        Alert.alert('Payment Incomplete', 'The payment could not be verified.');
      }
    } catch (error) {
      console.error('Verify payment error:', error);
      Alert.alert('Verification Error', 'Could not verify payment.');
    }
  };

  const handleNavigationChange = async (navState) => {
    const currentUrl = navState.url;
    console.log('WebView URL changed:', currentUrl);

    if (currentUrl.includes('payment_api.php?action=validate')) {
      const urlObj = new URL(currentUrl);
      const reference = urlObj.searchParams.get('reference');
      const paymentStatus = urlObj.searchParams.get('status'); // if Paystack ever adds this in callback

      if (!hasVerifiedRef.current && reference) {
        hasVerifiedRef.current = true;

        // Verify via backend to confirm status
        await verifyPayment(reference);
        onClose();
      }
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1 }}>
        <Button
          title="Close"
          onPress={() => {
            hasVerifiedRef.current = false;
            onClose();
          }}
        />
        <WebView
          source={{ uri: url }}
          style={{ flex: 1 }}
          onNavigationStateChange={handleNavigationChange}
        />
      </View>
    </Modal>
  );
}
