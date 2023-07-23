import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {

  const [inputMessage, setInputMessage] = useState("");
  const [outputMessage, setOutputMessage] = useState("Results will be shown here:");
  
  const handleButtonClick=()=>{
    fetch("https://api.openai.com/v1/completions", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },

      // "model": "text-davinci-003",
      // "prompt": "Say this is a test",
      // "max_tokens": 7,
      // "temperature": 0

      body: JSON.stringify({
        "prompt": inputMessage,
        "model": "text-davinci-003"
      })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.choices[0].text);
      setOutputMessage(data.choices[0].text.trim());
    });
    console.log(inputMessage);
  }

  const handleTextInput=(text)=>{
    setInputMessage(text);
    console.log(text);
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: "center"}}>
        <Text>{outputMessage}</Text>
      </View>
      <View style={{flexDirection: "row"}}>
        <View style={{flex: 1, marginLeft: 10}}>
          <TextInput placeholder='Enter your question' onChangeText={handleTextInput} />
        </View>
        <TouchableOpacity onPress={handleButtonClick}>
          <View style={{backgroundColor: "gray", padding: 5, marginRight: 10, marginBottom: 20}}>
            <Text>Send</Text>
          </View>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
