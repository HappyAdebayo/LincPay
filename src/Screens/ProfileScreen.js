import { ScrollView, View, Text,Image,TouchableOpacity,StyleSheet } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const ProfileScreen = () => {
  const navigation=useNavigation()

  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }} style={styles.profileImage} />
          <TouchableOpacity style={styles.editProfileButton}>
            <FontAwesome name="pencil" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>Alex Johnson</Text>
        <Text style={styles.profileEmail}>alex.johnson@lincolncollege.edu</Text>
        <View style={styles.profileStats}>
          <View style={styles.profileStat}>
            <Text style={styles.profileStatValue}>$1,245.80</Text>
            <Text style={styles.profileStatLabel}>Balance</Text>
          </View>
          <View style={styles.profileStatDivider} />
          <View style={styles.profileStat}>
            <Text style={styles.profileStatValue}>24</Text>
            <Text style={styles.profileStatLabel}>Transactions</Text>
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

      <TouchableOpacity style={styles.logoutButton}>
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
      paddingVertical:30,
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
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
      },
      profileEmail: {
        fontSize: 14,
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
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
      },
      profileStatLabel: {
        fontSize: 12,
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
        fontSize: 16,
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
        fontSize: 16,
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
        fontSize: 16,
        fontWeight: "600",
      },
})
export default ProfileScreen