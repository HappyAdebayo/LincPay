import { useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { NotificationsData } from "../Data/Data"
import { useNavigation } from "@react-navigation/native"

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState(NotificationsData)
  const [activeFilter, setActiveFilter] = useState("all")
  const navigation=useNavigation()
  const unreadCount = notifications.filter((notification) => !notification.read).length

  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === "all") return true
    return notification.type === activeFilter
  })

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }))
    setNotifications(updatedNotifications)
  }

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification,
    )
    setNotifications(updatedNotifications)
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "transaction":
        return <FontAwesome name="money" size={20} color="#dc2626" />
      case "alert":
        return <FontAwesome name="exclamation-circle" size={20} color="#f59e0b" />
      case "promo":
        return <FontAwesome name="tag" size={20} color="#8b5cf6" />
      case "system":
        return <FontAwesome name="cog" size={20} color="#3b82f6" />
      default:
        return <FontAwesome name="bell" size={20} color="#dc2626" />
    }
  }

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationItem, item.read ? styles.notificationRead : styles.notificationUnread]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={[styles.notificationIconContainer, styles[`${item.type}IconBg`]]}>
        {getNotificationIcon(item.type)}
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
        <Text style={styles.notificationMessage}>{item.message}</Text>
      </View>
      {!item.read && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
          <FontAwesome name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <View style={styles.subHeader}>
        <View style={styles.notificationCount}>
          <Text style={styles.notificationCountText}>
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </Text>
        </View>
        <TouchableOpacity style={styles.markAllReadButton} onPress={markAllAsRead}>
          <Text style={styles.markAllReadText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          <TouchableOpacity
            style={[styles.filterButton, activeFilter === "all" && styles.activeFilterButton]}
            onPress={() => setActiveFilter("all")}
          >
            <Text style={[styles.filterText, activeFilter === "all" && styles.activeFilterText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, activeFilter === "transaction" && styles.activeFilterButton]}
            onPress={() => setActiveFilter("transaction")}
          >
            <Text style={[styles.filterText, activeFilter === "transaction" && styles.activeFilterText]}>
              Transactions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, activeFilter === "alert" && styles.activeFilterButton]}
            onPress={() => setActiveFilter("alert")}
          >
            <Text style={[styles.filterText, activeFilter === "alert" && styles.activeFilterText]}>Alerts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, activeFilter === "promo" && styles.activeFilterButton]}
            onPress={() => setActiveFilter("promo")}
          >
            <Text style={[styles.filterText, activeFilter === "promo" && styles.activeFilterText]}>Promotions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, activeFilter === "system" && styles.activeFilterButton]}
            onPress={() => setActiveFilter("system")}
          >
            <Text style={[styles.filterText, activeFilter === "system" && styles.activeFilterText]}>System</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {filteredNotifications.length > 0 ? (
        <FlatList
          data={filteredNotifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notificationsList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <FontAwesome name="bell-slash" size={50} color="#dc2626" />
          </View>
          <Text style={styles.emptyTitle}>No notifications</Text>
          <Text style={styles.emptyMessage}>
            You don't have any {activeFilter !== "all" ? activeFilter : ""} notifications at the moment.
          </Text>
        </View>
      )}

      <View style={styles.topLeftCorner} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical:30,
    backgroundColor: "#f5f5f5",
    position: "relative",
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap:70,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: "transparent",
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
  settingsButton: {
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
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  notificationCount: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationCountText: {
    fontSize: 14,
    color: "#666",
  },
  markAllReadButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#dc2626",
  },
  markAllReadText: {
    fontSize: 12,
    color: "#dc2626",
    fontWeight: "500",
  },
  filterContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  filterScroll: {
    paddingHorizontal: 20,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  activeFilterButton: {
    backgroundColor: "#dc2626",
    borderColor: "#dc2626",
  },
  filterText: {
    fontSize: 14,
    color: "#666",
  },
  activeFilterText: {
    color: "#fff",
    fontWeight: "500",
  },
  notificationsList: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    position: "relative",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  notificationUnread: {
    backgroundColor: "#fff",
    borderLeftWidth: 4,
    borderLeftColor: "#dc2626",
  },
  notificationRead: {
    backgroundColor: "#fff",
    opacity: 0.8,
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionIconBg: {
    backgroundColor: "#fee2e2",
  },
  alertIconBg: {
    backgroundColor: "#fef3c7",
  },
  promoIconBg: {
    backgroundColor: "#ede9fe",
  },
  systemIconBg: {
    backgroundColor: "#dbeafe",
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  notificationTime: {
    fontSize: 12,
    color: "#666",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  unreadIndicator: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#dc2626",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fee2e2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
})
