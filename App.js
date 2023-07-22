import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: "center"}}>
        <Text>Search results:</Text>
      </View>
      <View style={{flexDirection: "row"}}>
        <View style={{flex: 1, marginLeft: 10}}>
          <TextInput placeholder='Enter your question'/>
        </View>
        <TouchableOpacity>
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
