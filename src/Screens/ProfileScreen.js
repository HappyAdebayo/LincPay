import { ScrollView, View,Platform,Alert, Text,Image,TouchableOpacity,StyleSheet,ActivityIndicator } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect,useState } from "react";

const ProfileScreen = () => {
  const navigation=useNavigation()
  const [user, setUser] = useState(null);
  
const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem('user');
    Alert.alert('Success', 'You have been logged out.');

    navigation.replace('Login');
  } catch (error) {
    console.error('Error removing user data from AsyncStorage:', error);
    Alert.alert('Error', 'Failed to log out. Please try again.');
  }
};

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


  if (!user) {
  return (
    <View style={{flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size="large" color="#dc2626" /> 
    </View>
  );
}
  
  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: `http://192.168.77.1:8080/lincpay_backend/Student_images/${user.profile_image}` }} style={styles.profileImage} />
          <TouchableOpacity style={styles.editProfileButton} onPress={()=>navigation.navigate('PersonalInfoScreen')}>
            <FontAwesome name="pencil" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>{user.full_name}</Text>
        <Text style={styles.profileEmail}>{user.email}</Text>
        <View style={styles.profileStats}>
          <View style={styles.profileStat}>
            <Text style={styles.profileStatValue}>{user.intake}</Text>
            <Text style={styles.profileStatLabel}>Intake</Text>
          </View>
          <View style={styles.profileStatDivider} />
          <View style={styles.profileStat}>
            <Text style={styles.profileStatValue}>{user.department}</Text>
            <Text style={styles.profileStatLabel}>Department</Text>
          </View>
        </View>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.profileSectionTitle}>Account Settings</Text>
        <TouchableOpacity style={styles.profileMenuItem} onPress={()=>navigation.navigate('PersonalInfoScreen')}>
          <FontAwesome name="user" size={20} color="#dc2626" style={styles.profileMenuIcon} />
          <Text style={styles.profileMenuText}>Personal Information</Text>
          <FontAwesome name="chevron-right" size={16} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileMenuItem} onPress={()=>navigation.navigate('NotificationScreen')}>
          <FontAwesome name="bell" size={20} color="#dc2626" style={styles.profileMenuIcon} />
          <Text style={styles.profileMenuText}>Notifications</Text>
          <FontAwesome name="chevron-right" size={16} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileMenuItem} onPress={()=>navigation.navigate('SecurityScreen')}>
          <FontAwesome name="lock" size={20} color="#dc2626" style={styles.profileMenuIcon} />
          <Text style={styles.profileMenuText}>Security</Text>
          <FontAwesome name="chevron-right" size={16} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.profileSectionTitle}>Support</Text>
        <TouchableOpacity style={styles.profileMenuItem} onPress={()=>navigation.navigate('HelpCenterScreen')}>
          <FontAwesome name="question-circle" size={20} color="#dc2626" style={styles.profileMenuIcon} />
          <Text style={styles.profileMenuText}>Help Center</Text>
          <FontAwesome name="chevron-right" size={16} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileMenuItem} onPress={()=>navigation.navigate('ContactSupportScreen')}>
          <FontAwesome name="comment" size={20} color="#dc2626" style={styles.profileMenuIcon} />
          <Text style={styles.profileMenuText}>Contact Support</Text>
          <FontAwesome name="chevron-right" size={16} color="#666" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <FontAwesome name="sign-out" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>

      <View style={{ height: 80 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: "#f5f5f5",
      paddingVertical:Platform.OS === 'ios' ? 0 : 30,
      },
      profileHeader: {
        backgroundColor: "#fff",
        alignItems: "center",
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
      },
      profileImageContainer: {
        position: "relative",
        marginBottom: 16,
      },
      profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
      },
      editProfileButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#dc2626",
        justifyContent: "center",
        alignItems: "center",
      },
      profileName: {
        fontSize:Platform.OS === 'ios' ? 15 : 20,
        fontWeight: "bold",
        color: "#333",
      },
      profileEmail: {
        fontSize:Platform.OS === 'ios' ? 10 : 14,
        color: "#666",
        marginTop: 4,
      },
      profileStats: {
        flexDirection: "row",
        marginTop: 20,
        width: "80%",
      },
      profileStat: {
        flex: 1,
        alignItems: "center",
      },
      profileStatValue: {
        fontSize:Platform.OS === 'ios' ? 13 : 18,
        fontWeight: "bold",
        color: "#333",
      },
      profileStatLabel: {
        fontSize:Platform.OS === 'ios' ? 10 : 12,
        color: "#666",
        marginTop: 4,
      },
      profileStatDivider: {
        width: 1,
        backgroundColor: "#e5e7eb",
        marginHorizontal: 16,
      },
      profileSection: {
        backgroundColor: "#fff",
        marginTop: 16,
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 8,
      },
      profileSectionTitle: {
        fontSize:Platform.OS === 'ios' ? 13 : 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 16,
      },
      profileMenuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f3f4f6",
      },
      profileMenuIcon: {
        marginRight: 16,
      },
      profileMenuText: {
        flex: 1,
        fontSize:Platform.OS === 'ios' ? 10 : 16,
        color: "#333",
      },
      logoutButton: {
        flexDirection: "row",
        backgroundColor: "#dc2626",
        marginHorizontal: 20,
        marginTop: 24,
        marginBottom: 45,
        paddingVertical: 12,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
      },
      logoutButtonText: {
        color: "#fff",
        fontSize:Platform.OS === 'ios' ? 10 : 16,
        fontWeight: "600",
      },
})
export default ProfileScreen