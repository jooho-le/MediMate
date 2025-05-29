import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const saveLoginInfo = async (user) => {
    try {
      await AsyncStorage.setItem('@login_data', JSON.stringify({
        uid: user.uid,
        email: user.email,
      }));
    } catch (e) {
      console.error('로그인 정보 저장 실패:', e);
    }
  };

  const onLoginPress = async () => {
    if (!email.trim()) {
      Alert.alert('입력 오류', '이메일을 입력해주세요.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('입력 오류', '비밀번호를 입력해주세요.');
      return;
    }

    try {
      const userCredential = await auth().signInWithEmailAndPassword(email.trim(), password);
      const user = userCredential.user;

      await saveLoginInfo(user); // ✅ 로그인 성공 시 저장
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] }); // 뒤로가기 방지
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('로그인 실패', '존재하지 않는 계정입니다.');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('로그인 실패', '비밀번호가 일치하지 않습니다.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('로그인 실패', '이메일 형식이 올바르지 않습니다.');
      } else {
        Alert.alert('로그인 실패', '로그인 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Medi-Mate</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="이메일을 주소를 입력하세요."
          style={styles.input}
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="비밀번호를 입력하세요."
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={onLoginPress}>
          <Text style={styles.loginButtonText}>이메일로 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.loginButtonText}>회원가입</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>CMD Corp.</Text>
    </View>
  );
};

export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
    backgroundColor: '#fff',
  },
  appName: {
    fontFamily: '', 
    fontSize: 24,
    color: '#001F54',
    marginTop: 50,
  },
  form: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#001F54',
    paddingVertical: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  loginButton: {
    borderWidth: 1,
    borderColor: '#001F54',
    marginBottom: 7, 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#001F54',
    fontWeight: '600',
    fontSize: 16,
  },
  footer: {
    color: '#001F54',
    fontSize: 12,
  },
});

