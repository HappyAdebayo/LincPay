import { useState } from "react"
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
} from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

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
  const [editedData, setEditedData] = useState({ ...userData })
  const [showImageOptions, setShowImageOptions] = useState(false)

  const handleSave = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(editedData.email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address")
      return
    }

    if (!editedData.name.trim()) {
      Alert.alert("Invalid Name", "Name cannot be empty")
      return
    }

    setUserData({ ...editedData })
    setIsEditing(false)
    Alert.alert("Success", "Your information has been updated successfully")
  }

  const handleCancel = () => {
    setEditedData({ ...userData })
    setIsEditing(false)
  }

  const handleChangeImage = (option) => {
    setShowImageOptions(false)

    if (option === "camera") {
      Alert.alert("Camera", "Camera would open here to take a new profile photo")
    } else if (option === "gallery") {
      Alert.alert("Gallery", "Photo gallery would open here to select a profile photo")
    } else if (option === "remove") {
      setEditedData({ ...editedData, profileImage: null })
      if (!isEditing) {
        setUserData({ ...userData, profileImage: null })
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
          <FontAwesome name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Information</Text>
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
              onPress={() => isEditing && setShowImageOptions(true)}
              disabled={!isEditing}
            >
              {userData.profileImage ? (
                <Image source={{ uri: userData.profileImage }} style={styles.profileImage} />
              ) : (
                <View style={styles.profileImagePlaceholder}>
                  <Text style={styles.profileInitials}>{userData.name.charAt(0)}</Text>
                </View>
              )}
              {isEditing && (
                <View style={styles.editImageOverlay}>
                  <FontAwesome name="camera" size={20} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
            <Text style={styles.profileName}>{userData.name}</Text>
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
                  value={editedData.idNumber}
                  onChangeText={(text) => setEditedData({ ...editedData, idNumber: text })}
                  placeholder="Enter your student ID"
                />
              ) : (
                <Text style={styles.infoValue}>{userData.idNumber}</Text>
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
                  value={editedData.semester}
                  onChangeText={(text) => setEditedData({ ...editedData, semester: text })}
                  placeholder="Enter your current semester"
                />
              ) : (
                <Text style={styles.infoValue}>{userData.semester}</Text>
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
                  value={editedData.email}
                  onChangeText={(text) => setEditedData({ ...editedData, email: text })}
                  placeholder="Enter your email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              ) : (
                <Text style={styles.infoValue}>{userData.email}</Text>
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
                  value={editedData.name}
                  onChangeText={(text) => setEditedData({ ...editedData, name: text })}
                  placeholder="Enter your full name"
                />
              ) : (
                <Text style={styles.infoValue}>{userData.name}</Text>
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

            {userData.profileImage && (
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
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#dc2626",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
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
    fontSize: 24,
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
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  infoInput: {
    fontSize: 16,
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  additionalInfoText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
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
    fontSize: 16,
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
