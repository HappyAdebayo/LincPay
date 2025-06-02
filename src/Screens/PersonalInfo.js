import { useState,useEffect } from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  Modal,
  Alert,
  Platform
} from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as ImagePicker from 'expo-image-picker';

export default function PersonalInfoScreen() {
  const navigation =useNavigation()
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    idNumber: "STU-2023-45678",
    semester: "Fall 2023",
    email: "alex.johnson@university.edu",
    profileImage: null,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [showImageOptions, setShowImageOptions] = useState(false)
  const [localProfileImage, setLocalProfileImage] = useState(null);

  const [user, setUser] = useState(null);
const [filename, setFilename] = useState(null);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        if (jsonValue != null) {
          const userData = JSON.parse(jsonValue);
          console.log('User details:', userData);
          setUser(userData);
        } else {
          console.log('No user data found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error reading user data from AsyncStorage:', error);
      }
    };

    fetchUserDetails();
  }, []);

const handleSave = async () => {
   
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(user.email)) {
        Alert.alert("Invalid Email", "Please enter a valid email address");
        return;
      }

      if (!user.full_name.trim()) {
        Alert.alert("Invalid Name", "Name cannot be empty");
        return;
      }

      try {
        const formData = new FormData();

        formData.append('full_name', user.full_name);
        formData.append('user_id', user.id);
        formData.append('student_id', user.student_id);
        formData.append('semester', user.semester);
        formData.append('email', user.email);
        formData.append('existing_image', user.profile_image);

       if (localProfileImage) {
          const localUri = localProfileImage;
          console.log('Uploading image URI:', localUri);

          const filename = localUri.split('/').pop();
          console.log('Uploading image filename:', filename);
          const newFilename = localUri.split('/').pop();
          setFilename(newFilename); 

          const match = /\.(\w+)$/.exec(newFilename);
          const type = match ? `image/${match[1]}` : `image`;
          console.log('Uploading image type:', type);

          formData.append('profile_image', {
            uri: localUri,
            name: newFilename,
            type: type,
          });
        }


        const response = await fetch('http://192.168.74.1/lincpay_backend/api/user_api.php?action=update_profile', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const rawText = await response.text();
        console.log('📦 Raw API Response:', rawText);

        let result;
        try {
          result = JSON.parse(rawText);
        } catch (parseError) {
          console.error('❌ Failed to parse JSON:', parseError);
          Alert.alert('Error', 'Invalid JSON response from server.');
          return;
        }

        if (result.status === 'success') {
          console.log(result,'ty');
          
         const updatedUser = {
            ...user,
            profile_image: filename ? filename : user.profile_image,
          };


          await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
          console.log('kj',user);
          
          setIsEditing(false);
          Alert.alert('Success', result.message);
        } else {
          Alert.alert('Error', result.message);
        }
      } catch (error) {
        console.error('🚨 API Call Error:', error);
        if (error.message) {
    console.error('Error message:', error.message);
  }
        Alert.alert('Error', 'Something went wrong while updating your profile.');
      }
};
useEffect(() => {
  console.log('User updated:', user);
}, [user]);



  const handleCancel = () => {
    setEditedData({ ...userData })
    setIsEditing(false)
  }

const handleChangeImage = async (option) => {
  setShowImageOptions(false);
  console.log('handleChangeImage called with option:', option);

  if (option === "camera") {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    console.log('Camera result:', result);
    if (!result.canceled) {
      console.log('Setting localProfileImage:', result.assets[0].uri);
      setLocalProfileImage(result.assets[0].uri);
    }
  } else if (option === "gallery") {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    console.log('Gallery result:', result);
    if (!result.canceled) {
      console.log('Setting localProfileImage:', result.assets[0].uri);
      setLocalProfileImage(result.assets[0].uri);
    }
  } else if (option === "remove") {
    console.log('Removing image');
    setLocalProfileImage(null);
  }
};

const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    // For new versions of expo-image-picker, result.assets is an array
    const selectedImageUri = result.assets[0].uri;
    setLocalProfileImage(selectedImageUri);  // <-- update state with local URI
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
          <FontAwesome name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            if (isEditing) {
              handleSave()
            } else {
              setIsEditing(true)
            }
          }}
        >
          <Text style={styles.editButtonText}>{isEditing ? "Save" : "Edit"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.topLeftCorner} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <View style={styles.profileImageSection}>
          <TouchableOpacity
  style={styles.profileImageContainer}
  onPress={() => isEditing && pickImage()}  // Call your image picker here
  disabled={!isEditing}
>
  {localProfileImage ? (
    <Image source={{ uri: localProfileImage }} style={styles.profileImage} />
  ) : user?.profile_image ? (
    <Image source={{ uri: `http://192.168.74.1/lincpay_backend/Student_images/${user?.profile_image}` }} style={styles.profileImage} />
  ) : (
    <View style={styles.profileImagePlaceholder}>
      <Text style={styles.profileInitials}>{user?.full_name.charAt(0)}</Text>
    </View>
  )}

  {isEditing && (
    <View style={styles.editImageOverlay}>
      <FontAwesome name="camera" size={20} color="#fff" />
    </View>
  )}
</TouchableOpacity>

            <Text style={styles.profileName}>{user?.full_name}</Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <FontAwesome name="id-card" size={16} color="#dc2626" style={styles.infoIcon} />
                <Text style={styles.infoLabel}>Student ID</Text>
              </View>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={user?.student_id}
                  onChangeText={(text) => setUser({...user,student_id:text})}
                  placeholder="Enter your student ID"
                />
              ) : (
                <Text style={styles.infoValue}>{user?.student_id}</Text>
              )}
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <FontAwesome name="calendar" size={16} color="#dc2626" style={styles.infoIcon} />
                <Text style={styles.infoLabel}>Semester</Text>
              </View>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={user?.semester}
                  onChangeText={(text) => setUser({ ...user, semester: text })}
                  placeholder="Enter your current semester"
                />
              ) : (
                <Text style={styles.infoValue}>{user?.semester}</Text>
              )}
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <FontAwesome name="envelope" size={16} color="#dc2626" style={styles.infoIcon} />
                <Text style={styles.infoLabel}>Email</Text>
              </View>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={user?.email}
                  onChangeText={(text) => setUser({ ...user, email: text })}
                  placeholder="Enter your email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              ) : (
                <Text style={styles.infoValue}>{user?.email}</Text>
              )}
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <FontAwesome name="user" size={16} color="#dc2626" style={styles.infoIcon} />
                <Text style={styles.infoLabel}>Full Name</Text>
              </View>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={user?.full_name}
                  onChangeText={(text) => setUser({ ...user, full_name: text })}
                  placeholder="Enter your full name"
                />
              ) : (
                <Text style={styles.infoValue}>{user?.full_name}</Text>
              )}
            </View>
          </View>

          <View style={styles.additionalInfoCard}>
            <Text style={styles.additionalInfoTitle}>Additional Information</Text>
            <Text style={styles.additionalInfoText}>
              Your personal information is used to identify you within the Lincpay system and for communication
              purposes. To update your official university records, please contact the registrar's office.
            </Text>
          </View>

          {isEditing && (
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}

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
            <Text style={styles.modalTitle}>Change Profile Picture</Text>

            <TouchableOpacity style={styles.modalOption} onPress={() => handleChangeImage("camera")}>
              <FontAwesome name="camera" size={20} color="#333" style={styles.modalOptionIcon} />
              <Text style={styles.modalOptionText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalOption} onPress={() => handleChangeImage("gallery")}>
              <FontAwesome name="image" size={20} color="#333" style={styles.modalOptionIcon} />
              <Text style={styles.modalOptionText}>Choose from Gallery</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.cancelModalButton} onPress={() => setShowImageOptions(false)}>
              <Text style={styles.cancelModalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
    fontSize:Platform.OS === 'ios' ? 13 : 20,
    fontWeight: "bold",
    color: "#333",
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#dc2626",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize:Platform.OS === 'ios' ? 10 : 14,
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
  profileImageSection: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  profileImagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#dc2626",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitials: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
  },
  editImageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    fontSize:Platform.OS === 'ios' ? 16 : 24,
    fontWeight: "bold",
    color: "#333",
  },
  infoCard: {
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
  infoRow: {
    marginBottom: 20,
  },
  infoLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoLabel: {
    fontSize:Platform.OS === 'ios' ? 12 : 14,
    color: "#666",
    fontWeight: "500",
  },
  infoValue: {
    fontSize:Platform.OS === 'ios' ? 10 : 16,
    color: "#333",
    fontWeight: "500",
  },
  infoInput: {
    fontSize:Platform.OS === 'ios' ? 10 : 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  additionalInfoCard: {
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
  additionalInfoTitle: {
    fontSize:Platform.OS === 'ios' ? 13 : 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  additionalInfoText: {
    fontSize:Platform.OS === 'ios' ? 10 : 14,
    color: "#666",
    lineHeight: Platform.OS === 'ios' ? 15 : 20,
  },
  cancelButton: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  cancelButtonText: {
    color: "#666",
    fontSize:Platform.OS === 'ios' ? 10 : 16,
    fontWeight: "600",
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
