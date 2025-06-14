import { useRef, useState } from 'react';
import { View, Text, TextInput,Platform, StyleSheet, StatusBar, TouchableOpacity, Alert } from 'react-native';

export default function Auth() {
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
    if (!text && index > 0 && text === '') {
      inputs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const fullCode = code.join('');
    if (fullCode.length < 4) {
      Alert.alert('Incomplete Code', 'Please enter all 4 digits');
      return;
    }
    // Replace this with your verification logic
    console.log('Submitted code:', fullCode);
     const response = await callApi({
      payload: { username, password },
    });
    console.log(response);
    
    if (response?.status === 'success') {
       await AsyncStorage.setItem('user', JSON.stringify(response.user));
       Alert.alert('Success', 'Login successful!');
       navigation.replace('BottomTab')
    }else if(response?.status =="not_validated"){
       try {
      await AsyncStorage.setItem('user_id', String(response.user_id));
      navigation.navigate('ProfileSetupScreen')
    } catch (error) {
      alert('Failed to save user ID locally');
    }
    } 
    else if (response?.message) {
      Alert.alert('Login Failed', response.message);
    }
  };

    const handleLogin =async () => {
     navigation.navigate('Auth')
    if (!username || !password) {
      Alert.alert('Validation Error', 'Username and password are required.');
      return;
    }
    
   
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF0000" />
      <View style={styles.inputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            keyboardType="number-pad"
            maxLength={1}
            style={styles.input}
            autoFocus={index === 0}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical:30,
    paddingHorizontal:20
  },
  title: {
    color: '#dc2626',
    fontSize: 20,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 30,
  },
  input: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#BCBABA',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: 'white',
    color: '#FF0000',
  },
  button: {
    marginTop:'auto',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'#dc2626'
  },
  buttonText: {
    color: "#fff",
    fontSize: Platform.OS === 'ios' ? 10 : 16, 
    fontWeight: "600",
  },
});
