import {Platform, Dimensions} from 'react-native';

export const keyboardOffset = Platform.OS === "ios" ? 46 : 82;
export const isIos = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";
export const isWeb = Platform.OS === "web";
export const keyboardAvoidBehavior = isIos ? "padding" : undefined;

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const drawerPullZone = 50;

export const consoleLogMode = ['default'];
// export const consoleLogMode = ['poke', 'scry', 'store'];
// export const consoleLogMode = ['default', 'mouseAction'];
// export const consoleLogMode = ['basic', 'store', 'poke', 'mouseAction'];
