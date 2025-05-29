import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // > 아이콘 사용

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 바 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>홈화면</Text>
        <TouchableOpacity style={styles.menuIcon} onPress={()=>navigation.navigate('MyAccess')}>
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </TouchableOpacity>
      </View>

      {/* 가운데 버튼 */}
      <View style={styles.centerContent}>
        <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('Fullbody')}>
          <Text style={styles.startText}>진료 시작하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#001F54',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuIcon: {
    justifyContent: 'center',
  },
  menuLine: {
    width: 20,
    height: 2,
    backgroundColor: '#fff',
    marginVertical: 2,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderWidth: 4,
    borderColor: '#001F54',
    borderRadius: 50,
  },
  startText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
    color: '#001F54',
  },
});
