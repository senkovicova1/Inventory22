
import { AppRegistry, StatusBar } from 'react-native';
import setup from './js/setup';
StatusBar.setBarStyle('default');
AppRegistry.registerComponent('Inventory', setup);

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
