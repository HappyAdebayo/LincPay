const RecentTransactions = [
    {
      id: "1",
      type: "expense",
      title: "Campus Cafeteria",
      date: "Today, 12:30 PM",
      amount: -15.75,
      category: "Food",
    },
    {
      id: "2",
      type: "income",
      title: "Refund - Bookstore",
      date: "Yesterday, 3:45 PM",
      amount: 42.99,
      category: "Refund",
    },
    {
      id: "3",
      type: "expense",
      title: "Library Fee",
      date: "May 15, 10:20 AM",
      amount: -5.0,
      category: "Education",
    },
    {
      id: "4",
      type: "expense",
      title: "Campus Parking",
      date: "May 14, 8:15 AM",
      amount: -8.5,
      category: "Transport",
    },
  ]


  const QuickActions = [
    { id: '1', icon: 'credit-card', label: 'Add Money' },
    { id: '2', icon: 'bank', label: 'Withdraw' },
    { id: '3', icon: 'history', label: 'History' },
    { id: '4', icon: 'cog', label: 'Settings' },
  ];

  const PaymentOptions = [
    { id: "1", title: "Tuition", icon: "school" },
    { id: "2", title: "Housing", icon: "home" },
    { id: "3", title: "Books", icon: "book" },
    { id: "4", title: "Meal Plan", icon: "restaurant" },
    { id: "5", title: "Parking", icon: "local-parking" },
    { id: "6", title: "Events", icon: "event" },
  ]
  export { RecentTransactions, QuickActions,PaymentOptions }