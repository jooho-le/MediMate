import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const RegisterScreen = ({ navigation }) => {
  // 👇 상태들
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [role, setRole] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: '',
  });

  // ✅ 5자리 영문/숫자 랜덤 ID 생성
  const generateRandomId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async () => {
    let valid = true;
    let newErrors = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      role: '',
    };

    // 👇 유효성 검사
    if (!name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
      valid = false;
    } else if (name.trim().length < 4) {
      newErrors.name = '아이디는 최소 4자 이상이어야 합니다.';
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
      valid = false;
    } else if (!validateEmail(email.trim())) {
      newErrors.email = '이메일 형식이 올바르지 않습니다.';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요.';
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다.';
      valid = false;
    }

    if (!passwordConfirm.trim()) {
      newErrors.passwordConfirm = '비밀번호 확인을 입력해주세요.';
      valid = false;
    } else if (password !== passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
      valid = false;
    }

    if (!role) {
      newErrors.role = '역할을 선택해주세요.';
      valid = false;
    }

    if (!agreed) {
      Alert.alert('알림', '약관 및 개인정보 보호정책에 동의해야 가입할 수 있습니다.');
      return;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    try {
      // ✅ 회원가입 시도
      const userCredential = await auth().createUserWithEmailAndPassword(email.trim(), password);
      const user = userCredential.user;

      // ✅ 랜덤 ID 생성
      const customId = generateRandomId();

      // ✅ Firestore에 사용자 정보 저장
      await firestore().collection('users').doc(user.uid).set({
        uid: user.uid,
        email: user.email,
        name: name.trim(),
        role: role,
        customId: customId, // <-- 여기에 랜덤 ID 저장
        createdAt: new Date(),
      });

      Alert.alert('회원가입 완료', `ID가 생성되었습니다: ${customId}`);
      navigation.navigate('InfoInput');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrors({ ...newErrors, email: '이미 회원가입되어있는 이메일입니다.' });
      } else {
        Alert.alert('회원가입 실패', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      <TextInput
        placeholder="이름 (아이디)"
        style={styles.input}
        onChangeText={setName}
        value={name}
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      <TextInput
        placeholder="이메일 주소"
        style={styles.input}
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <TextInput
        placeholder="비밀번호"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

      <TextInput
        placeholder="비밀번호 확인"
        secureTextEntry
        style={styles.input}
        onChangeText={setPasswordConfirm}
        value={passwordConfirm}
      />
      {errors.passwordConfirm ? <Text style={styles.errorText}>{errors.passwordConfirm}</Text> : null}

      {/* 역할 선택 */}
      <View style={styles.roleContainer}>
        <Text style={styles.roleLabel}>역할 선택:</Text>
        <View style={styles.roleOptions}>
          <TouchableOpacity
            style={[styles.roleButton, role === 'doctor' && styles.roleSelected]}
            onPress={() => setRole('doctor')}
          >
            <Text style={styles.roleText}>의사</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleButton, role === 'user' && styles.roleSelected]}
            onPress={() => setRole('user')}
          >
            <Text style={styles.roleText}>사용자</Text>
          </TouchableOpacity>
        </View>
        {errors.role ? <Text style={styles.errorText}>{errors.role}</Text> : null}
      </View>

      {/* 약관 동의 */}
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setAgreed(!agreed)} style={styles.checkboxBox}>
          <View style={agreed ? styles.checkboxChecked : styles.checkboxEmpty} />
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>
          가입을 위해 <Text style={{ fontWeight: 'bold' }}>약관</Text>과{' '}
          <Text style={{ fontWeight: 'bold' }}>개인정보 보호정책</Text>에 동의합니다.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>가입하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderRadius: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 4,
  },
  roleContainer: {
    marginBottom: 16,
  },
  roleLabel: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: 'bold',
  },
  roleOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roleButton: {
    borderWidth: 1,
    borderColor: '#87CEFA',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    marginRight: 10,
  },
  roleSelected: {
    backgroundColor: '#87CEFA',
  },
  roleText: {
    textAlign: 'center',
    color: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  checkboxBox: {
    marginRight: 8,
  },
  checkboxEmpty: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
  },
  checkboxChecked: {
    width: 20,
    height: 20,
    backgroundColor: '#87CEFA',
    borderRadius: 4,
  },
  checkboxLabel: {
    flexShrink: 1,
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: '#001F54',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
