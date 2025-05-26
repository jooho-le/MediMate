import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth'; // Firebase 사용자 인증
import 'react-native-gesture-handler';
import MyAccessLogs from './screens/MyAccessLogs';
// 스크린 import
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import FullbodyScreen from './screens/FullbodyScreen';
import DetailScreen from './screens/DetailScreen';
import PainLevelScreen from './screens/PainLevelScreen';
import SettingScreen from './screens/SettingScreen';
// 실시간 감지 컴포넌트
import AccessWatcher from './components/AccessWatcher';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

type RouteKey = 'Login' | 'Home';

export default function App() {
  const [initialRoute, setInitialRoute] = useState<RouteKey | null>(null);
  const [user, setUser] = useState<any>(null); // Firebase user 객체 또는 local user

  // 자동 로그인 처리
  const tryAutoLogin = async () => {
    try {
      const json = await AsyncStorage.getItem('@login_data');
      const savedUser = json ? JSON.parse(json) : null;

      const currentUser = auth().currentUser;
      if (currentUser) {
        setUser(currentUser);
        setInitialRoute('Home');
      } else if (savedUser) {
        setUser(savedUser);
        setInitialRoute('Home');
      } else {
        setInitialRoute('Login');
      }
    } catch (e) {
      console.error('자동 로그인 실패:', e);
      setInitialRoute('Login');
    }
  };

  useEffect(() => {
    tryAutoLogin();
  }, []);

  if (!initialRoute) return null; // 로딩 중이면 아무 것도 렌더링하지 않음

  return (
    <>
      {/* 로그인된 경우에만 AccessWatcher 작동 */}
      {user && <AccessWatcher uid={user.uid} />}
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Fullbody" component={FullbodyScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="PainLevel" component={PainLevelScreen} />
          <Stack.Screen name="Setting" component={SettingScreen}/>
          <Stack.Screen name="MyAccess" component={MyAccessLogs}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
