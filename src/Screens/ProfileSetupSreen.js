import { useState } from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Modal,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as ImagePicker from 'expo-image-picker';

export default function ProfileSetupScreen() {
  const [fullName, setFullName] = useState("")
  const [studentId, setStudentId] = useState("")
  const [semester, setSemester] = useState("")
  const [email, setEmail] = useState("")
  const [profileImage, setProfileImage] = useState(null)
  const [showImageOptions, setShowImageOptions] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigation=useNavigation()

  const [errors, setErrors] = useState({
    fullName: "",
    studentId: "",
    semester: "",
    email: "",
  })

  const validateForm = () => {
    let isValid = true
    const newErrors = {
      fullName: "",
      studentId: "",
      semester: "",
      email: "",
    }

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required"
      isValid = false
    }

    if (!studentId.trim()) {
      newErrors.studentId = "Student ID is required"
      isValid = false
    } else if (!/^[A-Za-z0-9-]+$/.test(studentId)) {
      newErrors.studentId = "Student ID can only contain letters, numbers, and hyphens"
      isValid = false
    }

    if (!semester.trim()) {
      newErrors.semester = "Semester is required"
      isValid = false
    }

    if (!email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  setIsSubmitting(true);

  try {
    const userId = await AsyncStorage.getItem('user_id');

    if (!userId) {
      throw new Error('User ID not found in local storage.');
    }

    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('fullName', fullName.trim());
    formData.append('studentId', studentId.trim());
    formData.append('semester', semester.trim());
    formData.append('email', email.trim());

    if (profileImage) {
      formData.append('image', {
        uri: profileImage,
        name: 'profile.jpg',
        type: 'image/jpeg',
      });
    }

    const response = await fetch("http://192.168.209.1:8080/lincpay_backend/api/auth_api.php?action=studentdetails", {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const text = await response.text();
    console.log("Raw response text:", text);

    let json;
    try {
      json = JSON.parse(text);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      Alert.alert("Error", "Unexpected server response. Try again later.");
      return;
    }

    if (json?.status === 'success') {
      Alert.alert(
        "Profile Setup Complete",
        "Your profile has been successfully set up. You can now use all features of Lincpay.",
        [
          {
            text: "Continue to App",
            onPress: () => {
              navigation.navigate('Login');
              console.log("Navigate to login screen");
            },
          },
        ],
      );
    } else {
      Alert.alert("Error", json.errors);
      console.log("Validation Errors:", json.errors);
    }

  } catch (error) {
    console.log("API call error:", error);
    Alert.alert("Error", "Failed to set up profile. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};



const handleChangeImage = async (option) => {
  setShowImageOptions(false);

  if (option === 'camera') {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera permission is required to take a photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  } else if (option === 'gallery') {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Permission to access gallery is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  } else if (option === 'remove') {
    setProfileImage(null);
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Complete Your Profile</Text>
        </View>

        <View style={styles.topLeftCorner} />
        <View style={styles.bottomRightCorner} />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            <Text style={styles.welcomeText}>Welcome to Lincpay! Please complete your profile to continue.</Text>

            <View style={styles.profileImageSection}>
              <TouchableOpacity style={styles.profileImageContainer} onPress={() => setShowImageOptions(true)}>
                {profileImage ? (
                    <Image source={{ uri: profileImage }} style={styles.profileImage} />
                  ) : (
                  <View style={styles.profileImagePlaceholder}>
                    <FontAwesome name="camera" size={40} color="#fff" />
                    <Text style={styles.addPhotoText}>Add Photo</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={[styles.input, errors.fullName ? styles.inputError : null]}
                  value={fullName}
                  onChangeText={(text) => {
                    setFullName(text)
                    if (errors.fullName) {
                      setErrors({ ...errors, fullName: "" })
                    }
                  }}
                  placeholder="Enter your full name"
                />
                {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Student ID</Text>
                <TextInput
                  style={[styles.input, errors.studentId ? styles.inputError : null]}
                  value={studentId}
                  onChangeText={(text) => {
                    setStudentId(text)
                    if (errors.studentId) {
                      setErrors({ ...errors, studentId: "" })
                    }
                  }}
                  placeholder="Enter your student ID"
                />
                {errors.studentId ? <Text style={styles.errorText}>{errors.studentId}</Text> : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Semester</Text>
                <TextInput
                  style={[styles.input, errors.semester ? styles.inputError : null]}
                  value={semester}
                  onChangeText={(text) => {
                    setSemester(text)
                    if (errors.semester) {
                      setErrors({ ...errors, semester: "" })
                    }
                  }}
                  placeholder="e.g. Fall 2023"
                />
                {errors.semester ? <Text style={styles.errorText}>{errors.semester}</Text> : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={[styles.input, errors.email ? styles.inputError : null]}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text)
                    if (errors.email) {
                      setErrors({ ...errors, email: "" })
                    }
                  }}
                  placeholder="Enter your email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
              </View>
            </View>

            {isSubmitting ? (
                  <View style={{ marginVertical: 20, alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#dc2626" />
                  </View>
                ) : (
            <TouchableOpacity
              style={[styles.submitButton, isSubmitting && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.submitButtonText}>{isSubmitting ? "SETTING UP PROFILE..." : "COMPLETE SETUP"}</Text>
            </TouchableOpacity>
            )}
            <Text style={styles.privacyNote}>
              By completing your profile, you agree to our <Text style={styles.privacyLink}>Terms of Service</Text> and{" "}
              <Text style={styles.privacyLink}>Privacy Policy</Text>.
            </Text>
          </View>
        </ScrollView>

        <Modal
          visible={showImageOptions}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowImageOptions(false)}
        >
          <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowImageOptions(false)}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Profile Picture</Text>

              <TouchableOpacity style={styles.modalOption} onPress={() => handleChangeImage("camera")}>
                <FontAwesome name="camera" size={20} color="#333" style={styles.modalOptionIcon} />
                <Text style={styles.modalOptionText}>Take Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalOption} onPress={() => handleChangeImage("gallery")}>
                <FontAwesome name="image" size={20} color="#333" style={styles.modalOptionIcon} />
                <Text style={styles.modalOptionText}>Choose from Gallery</Text>
              </TouchableOpacity>

              {profileImage && (
                <TouchableOpacity
                  style={[styles.modalOption, styles.removeOption]}
                  onPress={() => handleChangeImage("remove")}
                >
                  <FontAwesome name="trash" size={20} color="#dc2626" style={styles.modalOptionIcon} />
                  <Text style={[styles.modalOptionText, styles.removeOptionText]}>Remove Current Photo</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.cancelModalButton} onPress={() => setShowImageOptions(false)}>
                <Text style={styles.cancelModalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: "transparent",
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontSize: Platform.OS === 'ios' ? 18 : 24,
    fontWeight: "bold",
    color: "#333",
  },
  topLeftCorner: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    backgroundColor: "#dc2626",
    borderBottomRightRadius: 100,
    zIndex: -1,
  },
  bottomRightCorner: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 80,
    height: 80,
    backgroundColor: "#dc2626",
    borderTopLeftRadius: 80,
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
  welcomeText: {
    fontSize: 16,
    fontSize: Platform.OS === 'ios' ? 10 : 16, 
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  profileImageSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  profileImage:{
     width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileImagePlaceholder: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
    backgroundColor: "#dc2626",
    justifyContent: "center",
    alignItems: "center",
  },
  addPhotoText: {
    color: "#fff",
    marginTop: 5,
    fontSize: Platform.OS === 'ios' ? 10 : 14, 
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
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: Platform.OS === 'ios' ? 10 : 14, 
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
    fontSize: Platform.OS === 'ios' ? 10 : 16, 
    color: "#333",
  },
  inputError: {
    borderColor: "#dc2626",
  },
  errorText: {
    color: "#dc2626",
    fontSize: Platform.OS === 'ios' ? 10 : 12, 
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: "#dc2626",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: "#f3f4f6",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: Platform.OS === 'ios' ? 10 : 16, 
    fontWeight: "bold",
  },
  privacyNote: {
    fontSize: Platform.OS === 'ios' ? 10 : 12, 
    color: "#666",
    textAlign: "center",
    lineHeight: 18,
  },
  privacyLink: {
    color: "#dc2626",
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  modalOptionIcon: {
    marginRight: 16,
    width: 24,
    textAlign: "center",
  },
  modalOptionText: {
    fontSize: 16,
    color: "#333",
  },
  removeOption: {
    borderBottomWidth: 0,
  },
  removeOptionText: {
    color: "#dc2626",
  },
  cancelModalButton: {
    marginTop: 20,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
  },
  cancelModalButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
})
