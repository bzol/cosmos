import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import useStore from './store';

export default function App() {
	const { _setUrbit, _urbit, _setLoading, mode} = useStore();
	const store = useStore(s => s);
	console.log(store);
	useEffect(() => {
		_setUrbit();
	}, [])
	if(!_urbit) {
		return <h1> Loading... </h1>
	}
	else {
		// console.log(
		// _urbit.scry({
		// 		app: "wallet",
		// 		path: "/accounts",
		// }).then(s => _setLoading(s))
		// );
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
