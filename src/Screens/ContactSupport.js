import { useState } from "react"
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useApi } from "../hooks/useApi"

export default function ContactSupportScreen() {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const navigation=useNavigation()


 const { loading, error, data, callApi } = useApi('http://192.168.155.1:8080/lincpay_backend/api/user_api.php?action=complaint', 'POST');

  const handleSubmit = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const parsedUser = JSON.parse(userData);
      const user_id = parsedUser?.id;
     console.log('this is the usesr_id',user_id);
     
      if (!user_id) {
        Alert.alert('Error', 'User not found in storage');
        return;
      }

      if (!subject || !message) {
        Alert.alert('Validation Error', 'All fields are required');
        return;
      }

      const response = await callApi({
        payload: {
          title:subject,
          user_id,
          complaint:message,
        },
      });

      if (response?.status === 'success') {
         setTimeout(() => {
      // setIsSubmitting(false)
      Alert.alert("Success", response.message, [
        {
          text: "OK",
          onPress: () => {
            // Reset form
            setSubject("")
            setMessage("")
          },
        },
      ])
    }, 1500)
      } else {
        Alert.alert('Error', response?.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to submit complaint');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
            <FontAwesome name="arrow-left" size={20} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Contact Support</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.topLeftCorner} />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            <View style={styles.supportInfoContainer}>
              <View style={styles.supportIconContainer}>
                <FontAwesome name="headphones" size={24} color="#dc2626" />
              </View>
              <View style={styles.supportInfo}>
                <Text style={styles.supportTitle}>We're Here to Help</Text>
                <Text style={styles.supportText}>
                  Our support team is available 24/7 to assist you with any questions or issues.
                </Text>
              </View>
            </View>

            <View style={styles.contactOptionsContainer}>
              <TouchableOpacity style={styles.contactOption}>
                <View style={styles.contactOptionIcon}>
                  <FontAwesome name="phone" size={20} color="#dc2626" />
                </View>
                <View style={styles.contactOptionContent}>
                  <Text style={styles.contactOptionTitle}>Call Us</Text>
                  <Text style={styles.contactOptionText}>+1 (800) 555-1234</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.contactOption}>
                <View style={styles.contactOptionIcon}>
                  <FontAwesome name="envelope" size={20} color="#dc2626" />
                </View>
                <View style={styles.contactOptionContent}>
                  <Text style={styles.contactOptionTitle}>Email Us</Text>
                  <Text style={styles.contactOptionText}>support@lincpay.com</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.contactOption}>
                <View style={styles.contactOptionIcon}>
                  <FontAwesome name="comments" size={20} color="#dc2626" />
                </View>
                <View style={styles.contactOptionContent}>
                  <Text style={styles.contactOptionTitle}>Live Chat</Text>
                  <Text style={styles.contactOptionText}>Available 24/7</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Submit a Support Ticket</Text>

              {/* <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Category</Text>
                <View style={styles.categoriesContainer}>
                  {SupportCategories.map((category) => (
                    <TouchableOpacity
                      key={category.id}
                      style={[styles.categoryButton, selectedCategory === category.id && styles.selectedCategoryButton]}
                      onPress={() => setSelectedCategory(category.id)}
                    >
                      <Text
                        style={[
                          styles.categoryButtonText,
                          selectedCategory === category.id && styles.selectedCategoryButtonText,
                        ]}
                      >
                        {category.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View> */}

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Subject</Text>
                <TextInput
                  style={styles.input}
                  value={subject}
                  onChangeText={setSubject}
                  placeholder="Enter the subject of your inquiry"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Message</Text>
                <TextInput
                  style={styles.messageInput}
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Describe your issue in detail"
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.inputContainer}>
                {/* <View style={styles.attachmentsHeader}>
                  <Text style={styles.inputLabel}>Attachments</Text>
                  <TouchableOpacity onPress={handleAddAttachment}>
                    <Text style={styles.addAttachmentText}>+ Add File</Text>
                  </TouchableOpacity>
                </View> */}

                {/* {attachments.length > 0 ? (
                  <View style={styles.attachmentsList}>
                    {attachments.map((attachment) => (
                      <View key={attachment.id} style={styles.attachmentItem}>
                        <View style={styles.attachmentInfo}>
                          <FontAwesome name="file-image-o" size={16} color="#666" />
                          <Text style={styles.attachmentName}>{attachment.name}</Text>
                          <Text style={styles.attachmentSize}>{attachment.size}</Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => handleRemoveAttachment(attachment.id)}
                          style={styles.removeAttachmentButton}
                        >
                          <FontAwesome name="times" size={16} color="#666" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                ) : (
                  <View style={styles.noAttachmentsContainer}>
                    <Text style={styles.noAttachmentsText}>
                      Add screenshots or files to help us understand your issue better (optional)
                    </Text>
                  </View>
                )} */}
              </View>

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  (!subject.trim() || !message.trim() ) && styles.disabledButton,
                ]}
                onPress={handleSubmit}
                disabled={!subject.trim() || !message.trim()}
              >
                <Text style={styles.submitButtonText}>{loading ? "SUBMITTING..." : "SUBMIT COMPLAINT"}</Text>
              </TouchableOpacity>

              <View style={styles.responseTimeContainer}>
                <FontAwesome name="clock-o" size={16} color="#666" style={styles.responseTimeIcon} />
                <Text style={styles.responseTimeText}>We typically respond to support tickets within 24 hours</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.faqLinkContainer} onPress={()=>navigation.navigate('HelpCenterScreen')}>
              <FontAwesome name="question-circle" size={20} color="#dc2626" />
              <Text style={styles.faqLinkText}>Check our FAQ section for quick answers to common questions</Text>
              <FontAwesome name="chevron-right" size={16} color="#dc2626" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    fontSize: Platform.OS === 'ios' ? 15 :20,
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
  supportInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  supportIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fee2e2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  supportInfo: {
    flex: 1,
  },
  supportTitle: {
    fontSize: Platform.OS === 'ios' ? 12 :18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  supportText: {
    fontSize: Platform.OS === 'ios' ? 10 : 14,
    color: "#666",
    lineHeight: 20,
  },
  contactOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  contactOption: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  contactOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fee2e2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  contactOptionContent: {
    alignItems: "center",
  },
  contactOptionTitle: {
    fontSize: Platform.OS === 'ios' ? 10 :14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  contactOptionText: {
    fontSize: Platform.OS === 'ios' ? 10 :12,
    color: "#666",
  },
  formContainer: {
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
  formTitle: {
    fontSize: Platform.OS === 'ios' ? 12 : 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize:Platform.OS === 'ios' ? 12 : 14,
    fontWeight: "500",
    color: "#666",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: Platform.OS === 'ios' ? 12 : 16,
    color: "#333",
  },
  messageInput: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: Platform.OS === 'ios' ? 12 : 16,
    color: "#333",
    height: 120,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "#f3f4f6",
    marginHorizontal: 4,
    marginBottom: 8,
  },
  selectedCategoryButton: {
    backgroundColor: "#dc2626",
  },
  categoryButtonText: {
    fontSize: Platform.OS === 'ios' ? 10 :14,
    color: "#666",
  },
  selectedCategoryButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  attachmentsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  addAttachmentText: {
    fontSize: Platform.OS === 'ios' ? 10 :14,
    color: "#dc2626",
    fontWeight: "500",
  },
  attachmentsList: {
    marginTop: 8,
  },
  attachmentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  attachmentInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  attachmentName: {
    fontSize: Platform.OS === 'ios' ? 10 : 14,
    color: "#333",
    marginLeft: 8,
    flex: 1,
  },
  attachmentSize: {
    fontSize: Platform.OS === 'ios' ? 10 :12,
    color: "#666",
    marginLeft: 8,
  },
  removeAttachmentButton: {
    padding: 4,
  },
  noAttachmentsContainer: {
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  noAttachmentsText: {
    fontSize: Platform.OS === 'ios' ? 10 :14,
    color: "#666",
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#dc2626",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  disabledButton: {
    backgroundColor: "#f3f4f6",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: Platform.OS === 'ios' ? 12 :16,
    fontWeight: "bold",
  },
  responseTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  responseTimeIcon: {
    marginRight: 8,
  },
  responseTimeText: {
    fontSize: Platform.OS === 'ios' ? 10 :14,
    color: "#666",
  },
  faqLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  faqLinkText: {
    flex: 1,
    fontSize: Platform.OS === 'ios' ? 10 :14,
    color: "#333",
    marginHorizontal: 12,
  },
})
