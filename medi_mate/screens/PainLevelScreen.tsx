import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@pain_data';

/* 선택 옵션 */
const PAIN_TYPES  = ['찌릿', '뻐근', '화끈', '저림', '쑤심'];
const SINCE_LIST  = ['오늘', '어제', '3일 전', '1주일 전', '1개월+'];

const PainLevelScreen = ({ route, navigation }) => {
  const { part, areaName } = route.params;

  const [painLevel, setPainLevel] = useState(0);
  const [painType,  setPainType]  = useState(PAIN_TYPES[0]);
  const [painSince, setPainSince] = useState(SINCE_LIST[0]);

  /* ------- 전체 데이터 덤프(디버그용) ------- */
  useEffect(() => { dumpPain(); }, []);

  /* ------- 저장 ------- */
const handleSave = async () => {
  const timestamp = new Date().toISOString(); // ← key를 시간으로
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    const data = existing ? JSON.parse(existing) : {};

    data[timestamp] = {
      part,
      areaName,
      level: painLevel,
      type: painType,
      since: painSince,
    };

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    Alert.alert(
      '저장 완료',
      `${timestamp}\n· 부위: ${part} - ${areaName}\n· 정도: ${painLevel}\n· 종류: ${painType}\n· 시작: ${painSince}`
    );

    await dumpPain();          
    navigation.goBack();
  } catch (e) {
    console.error('저장 오류:', e);
    Alert.alert('오류', '저장에 실패했습니다.');
  }
};


  /* ------- 렌더링 ------- */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${part} - ${areaName}`}</Text>

      {/* 통증 정도 슬라이더 */}
      <Text style={styles.label}>통증 정도: {painLevel}</Text>
      <Slider
        style={{ width: '90%', height: 40 }}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={painLevel}
        onValueChange={setPainLevel}
      />

      {/* 통증 종류 선택 */}
      <Text style={styles.sectionTitle}>통증 종류</Text>
      <View style={styles.row}>
        {PAIN_TYPES.map((t) => (
          <TouchableOpacity
            key={t}
            style={[
              styles.tag,
              painType === t && styles.tagSelected,
            ]}
            onPress={() => setPainType(t)}
          >
            <Text style={painType === t ? styles.tagTextSel : styles.tagText}>
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 언제부터 아팠는지 선택 */}
      <Text style={styles.sectionTitle}>언제부터?</Text>
      <View style={styles.row}>
        {SINCE_LIST.map((s) => (
          <TouchableOpacity
            key={s}
            style={[
              styles.tag,
              painSince === s && styles.tagSelected,
            ]}
            onPress={() => setPainSince(s)}
          >
            <Text style={painSince === s ? styles.tagTextSel : styles.tagText}>
              {s}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="저장" onPress={handleSave} />
    </View>
  );
};

export default PainLevelScreen;

/* ---------- AsyncStorage 덤프 ---------- */
async function dumpPain() {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    console.log('🩹 PainData =>', json ? JSON.parse(json) : {});
  } catch (e) {
    console.error('통증 데이터 덤프 실패:', e);
  }
}

/* ---------- 스타일 ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  title:     { fontSize: 20, marginBottom: 15 },
  label:     { fontSize: 16, marginBottom: 10 },
  sectionTitle: { fontSize: 16, marginTop: 20, marginBottom: 6 },
  row:       { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#888',
    margin: 4,
  },
  tagSelected: {
    backgroundColor: '#4e9bff',
    borderColor: '#4e9bff',
  },
  tagText:     { fontSize: 14, color: '#222' },
  tagTextSel:  { fontSize: 14, color: '#fff' },
});
