
import { AppRegistry, StatusBar } from 'react-native';
import setup from './js/setup';
import config from './js/firebase-config';
import * as firebase from 'firebase';
import Rebase from 're-base';
import 'firebase/firestore';

const app = firebase.initializeApp(config);
export let rebase = Rebase.createClass(app.database());
/*
const app = firebase.initializeApp(config);
const db = firebase.firestore(app);
const settings = { timestampsInSnapshots: true };
db.settings(settings);

export let rebase = Rebase.createClass(db);*/

StatusBar.setBarStyle('default');
AppRegistry.registerComponent('NativebaseKitchenSink', setup);
