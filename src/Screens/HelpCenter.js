import { useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput, FlatList } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { Categories,Faqs } from "../Data/Data"
import { useNavigation } from "@react-navigation/native"

export default function HelpCenterScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState(null)
  const navigation=useNavigation()


  const toggleFaq = (id) => {
    if (expandedFaq === id) {
      setExpandedFaq(null)
    } else {
      setExpandedFaq(id)
    }
  }

  const filteredFaqs = searchQuery
    ? Faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : Faqs

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <View style={styles.categoryIconContainer}>
        <FontAwesome name={item.icon} size={20} color="#dc2626" />
      </View>
      <Text style={styles.categoryTitle}>{item.title}</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
          <FontAwesome name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Center</Text>
        <TouchableOpacity style={styles.contactButton}>
          <FontAwesome name="headphones" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.topLeftCorner} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <FontAwesome name="search" size={16} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for help"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")} style={styles.clearButton}>
                <FontAwesome name="times-circle" size={16} color="#666" />
              </TouchableOpacity>
            )}
          </View>

          {!searchQuery && (
            <View style={styles.categoriesSection}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <FlatList
                data={Categories}
                renderItem={renderCategory}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesList}
              />
            </View>
          )}

          <View style={styles.faqSection}>
            <Text style={styles.sectionTitle}>{searchQuery ? "Search Results" : "Frequently Asked Questions"}</Text>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <View key={faq.id} style={styles.faqItem}>
                  <TouchableOpacity style={styles.faqQuestion} onPress={() => toggleFaq(faq.id)}>
                    <Text style={styles.faqQuestionText}>{faq.question}</Text>
                    <FontAwesome name={expandedFaq === faq.id ? "chevron-up" : "chevron-down"} size={16} color="#666" />
                  </TouchableOpacity>
                  {expandedFaq === faq.id && (
                    <View style={styles.faqAnswer}>
                      <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                      <View style={styles.faqFeedback}>
                        <Text style={styles.faqFeedbackText}>Was this helpful?</Text>
                        <View style={styles.faqFeedbackButtons}>
                          <TouchableOpacity style={styles.faqFeedbackButton}>
                            <FontAwesome name="thumbs-up" size={14} color="#666" />
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.faqFeedbackButton}>
                            <FontAwesome name="thumbs-down" size={14} color="#666" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              ))
            ) : (
              <View style={styles.noResultsContainer}>
                <FontAwesome name="search" size={40} color="#dc2626" style={styles.noResultsIcon} />
                <Text style={styles.noResultsTitle}>No results found</Text>
                <Text style={styles.noResultsText}>
                  We couldn't find any matches for "{searchQuery}". Try a different search term or browse the
                  categories.
                </Text>
              </View>
            )}
          </View>

          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Need More Help?</Text>
            <TouchableOpacity style={styles.contactCard}>
              <View style={styles.contactCardIcon}>
                <FontAwesome name="comments" size={24} color="#dc2626" />
              </View>
              <View style={styles.contactCardContent}>
                <Text style={styles.contactCardTitle}>Contact Support</Text>
                <Text style={styles.contactCardText}>
                  Get in touch with our support team for personalized assistance
                </Text>
              </View>
              <FontAwesome name="chevron-right" size={16} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactCard}>
              <View style={styles.contactCardIcon}>
                <FontAwesome name="book" size={24} color="#dc2626" />
              </View>
              <View style={styles.contactCardContent}>
                <Text style={styles.contactCardTitle}>User Guide</Text>
                <Text style={styles.contactCardText}>Explore our comprehensive guide to using Lincpay</Text>
              </View>
              <FontAwesome name="chevron-right" size={16} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  contactButton: {
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 24,
    height: 50,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  clearButton: {
    padding: 5,
  },
  categoriesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  categoriesList: {
    paddingRight: 20,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 16,
    width: 80,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryTitle: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  faqSection: {
    marginBottom: 24,
  },
  faqItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  faqQuestion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    marginRight: 10,
  },
  faqAnswer: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  faqAnswerText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  faqFeedback: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  faqFeedbackText: {
    fontSize: 14,
    color: "#666",
  },
  faqFeedbackButtons: {
    flexDirection: "row",
  },
  faqFeedbackButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  noResultsContainer: {
    alignItems: "center",
    padding: 30,
  },
  noResultsIcon: {
    marginBottom: 16,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  contactSection: {
    marginBottom: 24,
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  contactCardIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fee2e2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  contactCardContent: {
    flex: 1,
  },
  contactCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  contactCardText: {
    fontSize: 14,
    color: "#666",
  },
})
