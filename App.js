import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {

  const [inputMessage, setInputMessage] = useState("");
  const [outputMessage, setOutputMessage] = useState("Results will be shown here:");
  
  const handleButtonClick=()=>{
    fetch("https://api.openai.com/v1/chat/completions", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },

      body: JSON.stringify({
        "messages": [{"role": "user", "content": inputMessage}],
        "model": "gpt-3.5-turbo"
      })
    })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      console.log(data.choices[0].message.content);
      setOutputMessage(data.choices[0].message.content.trim());
    });
    console.log(inputMessage);
  }
  
  const generateImages=()=>{
    fetch("https://api.openai.com/v1/images/generations", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer ssss"
      },

      body: JSON.stringify({
        "prompt": inputMessage,
        "n": 1,
        "size": "1024x1024"
      })
    })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      console.log(data.data[0].url);
      setOutputMessage(data.data[0].url);
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
        <TouchableOpacity onPress={generateImages}>
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
