import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');  // Login 화면으로 이동
    }, 2000); // 2초 대기

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 해제
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>App name</Text>
      <Text style={styles.footer}>KIMPACT Lab.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 100,
    backgroundColor: '#fff',
  },
  appName: {
    fontSize: 24,
    color: '#001F54',
    marginTop: '50%',
  },
  footer: {
    fontSize: 12,
    color: '#001F54',
  },
});

export default SplashScreen;
