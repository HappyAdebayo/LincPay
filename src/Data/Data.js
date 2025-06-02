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
    { id: '1', icon: 'credit-card', label: 'Add Money', screen: 'AddMoneyScreen' },
    { id: '2', icon: 'bank', label: 'Withdraw', screen: 'WithdrawMoneyScreen' },
    { id: '3', icon: 'history', label: 'History', screen: 'transactions' },
    { id: '4', icon: 'cog', label: 'Settings', screen: 'profile' }, // <-- fixed here
  ];  
  const PaymentOptions = [
    { id: "1", title: "School Fee", icon: "school",account_number:'0081239048',bank_name:'Sterling Bank',medicine_account_number:'0082379840' },
    { id: "2", title: "Miscellaneous", icon: "list-alt",account_number:'0091812978',bank_name:'Sterling Bank' },
    { id: "3", title: "Department Fee", icon: "domain",account_number:'0806501606',bank_name:'Access Bank' },
    { id: "4", title: "Operational Fee", icon: "build",account_number:'6898597021',bank_name:'Fcmb'  },
    { id: "5", title: "Exam Fee", icon: "assignment",account_number:'0091812978',bank_name:'Sterling Bank'  },
    { id: "6", title: "Hostel Fee", icon: "home",account_number:'0602020124',bank_name:'GTB' },
  ];
  
  const NotificationsData = [
    {
      id: "1",
      type: "transaction",
      title: "Payment Successful",
      message: "Your tuition payment of $1,250.00 was successfully processed.",
      time: "Just now",
      read: false,
    },
    {
      id: "2",
      type: "alert",
      title: "Security Alert",
      message: "New login detected on your account from a new device.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "3",
      type: "promo",
      title: "Campus Bookstore Discount",
      message: "Get 15% off on all textbooks this week with your Lincpay account!",
      time: "Yesterday",
      read: true,
    },
    {
      id: "4",
      type: "transaction",
      title: "Money Received",
      message: "You received $50.00 from Sarah Williams.",
      time: "Yesterday",
      read: true,
    },
    {
      id: "5",
      type: "system",
      title: "App Update Available",
      message: "A new version of Lincpay is available with new features.",
      time: "2 days ago",
      read: true,
    },
    {
      id: "6",
      type: "alert",
      title: "Password Changed",
      message: "Your account password was recently changed.",
      time: "3 days ago",
      read: true,
    },
    {
      id: "7",
      type: "transaction",
      title: "Meal Plan Charged",
      message: "Your meal plan was charged $125.00 for this month.",
      time: "4 days ago",
      read: true,
    },
    {
      id: "8",
      type: "promo",
      title: "Refer a Friend",
      message: "Refer a friend to Lincpay and both get $10 credit!",
      time: "1 week ago",
      read: true,
    },
  ]
  const SavedPaymentMethods = [
    {
      id: "1",
      type: "visa",
      lastFour: "4582",
      expiryDate: "05/25",
    },
    {
      id: "2",
      type: "mastercard",
      lastFour: "8724",
      expiryDate: "11/24",
    },
  ]

  const Categories = [
    {
      id: "1",
      title: "Account",
      icon: "user-circle",
    },
    {
      id: "2",
      title: "Payments",
      icon: "credit-card",
    },
    {
      id: "3",
      title: "Transfers",
      icon: "exchange",
    },
    {
      id: "4",
      title: "Security",
      icon: "lock",
    },
    {
      id: "5",
      title: "App Issues",
      icon: "mobile",
    },
    {
      id: "6",
      title: "Fees",
      icon: "dollar",
    },
  ]

    const Faqs = [
      {
        id: "1",
        question: "How do I reset my password?",
        answer:
          "To reset your password, go to the login screen and tap on 'Forgot Password'. Enter your email address, and we'll send you a link to reset your password. Follow the instructions in the email to create a new password.",
        category: "Account",
      },
      {
        id: "2",
        question: "How long do transfers take?",
        answer:
          "Transfers between Lincpay accounts are instant. Transfers to bank accounts typically take 1-3 business days depending on your bank's processing times. Premium users may have access to instant transfers to linked bank accounts.",
        category: "Transfers",
      },
      {
        id: "3",
        question: "Is there a fee for adding money?",
        answer:
          "Adding money to your Lincpay account is free when using bank transfers. There may be a small fee (2.5%) when adding money using credit cards. Debit card transfers have a 1% fee capped at $5.",
        category: "Fees",
      },
      {
        id: "4",
        question: "How do I report unauthorized transactions?",
        answer:
          "If you notice any unauthorized transactions, immediately go to the transaction details and tap 'Report Issue'. You can also contact our support team directly through the Contact Support section with details of the transaction.",
        category: "Security",
      },
      {
        id: "5",
        question: "Can I schedule recurring payments?",
        answer:
          "Yes, you can schedule recurring payments. When making a payment, toggle the 'Make Recurring' option and select your preferred frequency (weekly, bi-weekly, monthly). You can manage all your scheduled payments in the Payments section.",
        category: "Payments",
      },
      {
        id: "6",
        question: "The app is crashing, what should I do?",
        answer:
          "If the app is crashing, try these steps: 1) Close and reopen the app, 2) Check for app updates, 3) Restart your device, 4) Ensure your device has sufficient storage space, 5) If problems persist, contact our support team with your device details.",
        category: "App Issues",
      },
    ]

      const SupportCategories = [
        {
          id: "1",
          title: "Account Issues",
        },
        {
          id: "2",
          title: "Payment Problems",
        },
        {
          id: "3",
          title: "Transfer Issues",
        },
        {
          id: "4",
          title: "App Bugs",
        },
        {
          id: "5",
          title: "Feature Request",
        },
        {
          id: "6",
          title: "Other",
        },
      ]

  export { RecentTransactions, QuickActions,PaymentOptions,NotificationsData,SavedPaymentMethods,Categories,Faqs,SupportCategories }