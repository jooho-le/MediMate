import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SettingsScreen = ({ navigation }) => {
  const [customID, setCustomID] = useState(null);

 useEffect(() => {
  const fetchCustomID = async () => {
    const user = auth().currentUser;
    if (user) {
      try {
        const doc = await firestore().collection('users').doc(user.uid).get();
        if (doc.exists()) {
          const data = doc.data();
          console.log("Fetched user data:", data); // 로그 추가
          if (data && data.customId) {
            setCustomID(data.customId);
          } else {
            console.warn('customId가 존재하지 않거나 문서를 찾을 수 없습니다.');
          }
        } else {
          console.warn('문서를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('Error fetching customID:', error);
      }
    }
  };

  fetchCustomID();
}, []);

  const handleLogout = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        await auth().signOut(); // ✅ 로그인되어 있을 때만 로그아웃
      } else {
        console.warn('현재 로그인된 사용자가 없습니다.'); // 디버깅 로그
      }

      await AsyncStorage.removeItem('autoLogin');

      Alert.alert('로그아웃 완료', '자동 로그인 정보가 제거되었습니다.');

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.label}>내 Custom ID:</Text>
      <Text style={styles.customID}>{customID || '불러오는 중...'}</Text>

      <Button title="로그아웃" onPress={handleLogout} color="#001F54" />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  customID: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
});
