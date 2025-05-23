// ✅ FullbodyScreen.tsx (뒷면 보기 기능 제거됨)
import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

const FullbodyScreen = ({ navigation }) => {
  const handlePress = (part) => {
    navigation.navigate('Detail', { part, direction: 'front' });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../image/Full_front.png')}
        style={styles.image}
      />

      {/* 앞면 버튼 */}
      <>
        <TouchableOpacity
          style={[styles.button, { top: '20%', left: '42%', width: '18%', height: '8%' }]}
          onPress={() => handlePress('머리')}
        />
        <TouchableOpacity
          style={[styles.button, { top: '30%', left: '41%', width: '18%', height: '20%' }]}
          onPress={() => handlePress('상체')}
        />
        <TouchableOpacity
          style={[styles.button, { top: '30%', left: '25%', width: '15%', height: '10%' }]}
          onPress={() => handlePress('왼팔')}
        />
        <TouchableOpacity
          style={[styles.button, { top: '30%', right: '25%', width: '15%', height: '10%' }]}
          onPress={() => handlePress('오른팔')}
        />
        <TouchableOpacity
          style={[styles.button, { top: '40%', left: '10%', width: '20%', height: '10%' }]}
          onPress={() => handlePress('왼팔 아래')}
        />
        <TouchableOpacity
          style={[styles.button, { top: '40%', right: '10%', width: '20%', height: '10%' }]}
          onPress={() => handlePress('오른팔 아래')}
        />
        <TouchableOpacity
          style={[styles.button, { top: '52%', left: '30%', width: '15%', height: '10%' }]}
          onPress={() => handlePress('왼쪽 허벅지')}
        />
        <TouchableOpacity
          style={[styles.button, { top: '52%', right: '30%', width: '15%', height: '10%' }]}
          onPress={() => handlePress('오른쪽 허벅지')}
        />
        <TouchableOpacity
          style={[styles.button, { top: '65%', left: '23%', width: '15%', height: '10%' }]}
          onPress={() => handlePress('왼쪽 종아리')}
        />
        <TouchableOpacity
          style={[styles.button, { top: '65%', right: '23%', width: '15%', height: '10%' }]}
          onPress={() => handlePress('오른쪽 종아리')}
        />
      </>
    </View>
  );
};

export default FullbodyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    position: 'absolute',
  },
  button: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    borderRadius: 8,
  },
});