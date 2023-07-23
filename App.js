import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { GiftedChat } from 'react-native-gifted-chat';

export default function App() {

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [outputMessage, setOutputMessage] = useState("Results will be shown here:");
  
  const handleButtonClick=()=>{
    console.log("The inputMessage is: " + inputMessage);

    if(inputMessage.toLocaleLowerCase().startsWith("image")) {
      generateImages();
    } else {
      generateText();
    }
  }

  const generateText=()=>{
    const message = {
      _id: Math.random().toString(36).substring(7),
      text: inputMessage,
      createdAt: new Date(),
      user: {_id: 1}
    }

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [message])
    );

    fetch("https://api.openai.com/v1/chat/completions", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer xxx"
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
      const message = {
        _id: Math.random().toString(36).substring(7),
        text: data.choices[0].message.content,
        createdAt: new Date(),
        user: {_id: 2, name: "Open AI"}
      }
  
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [message])
      );
  
    });
    console.log(inputMessage);
  }

  const generateImages=()=>{

    const message = {
      _id: Math.random().toString(36).substring(7),
      text: inputMessage,
      createdAt: new Date(),
      user: {_id: 1}
    }

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [message])
    );

    fetch("https://api.openai.com/v1/images/generations", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer xxx"
      },

      body: JSON.stringify({
        "prompt": inputMessage,
        "n": 2,
        "size": "1024x1024"
      })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.data[0].url);
      setOutputMessage(data.data[0].url);

      data.data.forEach(item => {
        const message = {
          _id: Math.random().toString(36).substring(7),
          text: "image",
          createdAt: new Date(),
          user: {_id: 2, name: "Open AI"},
          image: item.url
        }
    
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [message])
        );
      });
    });
    console.log(inputMessage);
  }

  const handleTextInput=(text)=>{
    setInputMessage(text);
    console.log(text);
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: "center"}}>
        {/* <Text>{outputMessage}</Text> */}
        <GiftedChat
          messages={messages}
          renderInputToolbar={() => {}}
          user={{_id: 1}}
          minInputToolbarHeight={0}
        />
      </View>
      <View style={{flexDirection: "row"}}>
        <View style={{
          flex: 1, 
          marginLeft: 10,
          marginBottom: 20,
          backgroundColor: "white",
          borderRadius: 10,
          borderColor: "gray",
          borderWidth: 1,
          height: 60,
          marginLeft: 10,
          marginRight: 10,
          justifyContent: "center",
          paddingLeft: 10,
          paddingRight: 10,
        }}>
          <TextInput placeholder='Enter your question' onChangeText={handleTextInput} />
        </View>
        <TouchableOpacity onPress={handleButtonClick}>
          <View style={{
            backgroundColor: "green",
            padding: 5,
            marginRight: 10,
            marginBottom: 20,
            borderRadius: 9999,
            width: 60,
            height: 60,
            justifyContent: "center",
          }}>
            <MaterialIcons name="send" size={30} color="white" style={{marginLeft: 10}} />
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
