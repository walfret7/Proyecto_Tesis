/**
 * @format
 */

// 👇 ¡IMPORTANTE! Debe ser la PRIMERA importación
import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// (Opcional pero recomendado) optimiza navegación con vistas nativas
// import {enableScreens} from 'react-native-screens';
// enableScreens(true);

AppRegistry.registerComponent(appName, () => App);


