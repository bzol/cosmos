import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import declare from './declare';
import xy_ from '../xy_/index';
import { create } from "zustand";

window.useStore = create(xy_(declare));

export default function App() {
	const test = useStore(state => state.mode);

  return (
    <View style={styles.container}>
      <Text>{test}</Text>
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
