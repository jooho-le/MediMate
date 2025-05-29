import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { firebaseAuth, firebaseDB } from '../firebase/firebase';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

interface LogEntry {
  id: string;
  searcherId: string;
  status: string;
  timestamp: FirebaseFirestoreTypes.Timestamp | string;
  type: string;
}

const MyAccessLogs = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const uid = firebaseAuth.currentUser?.uid;

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }

    const unsubscribe = firebaseDB
      .collection('access_logs')
      .where('targetPatientId', '==', uid)
      .orderBy('timestamp', 'desc')
      .onSnapshot(
        snapshot => {
          const entries: LogEntry[] = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }) as LogEntry);
          setLogs(entries);
          setLoading(false);
        },
        error => {
          console.error('Firestore 오류:', error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, [uid]);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  if (!uid) {
    return <Text style={{ margin: 20 }}>로그인이 필요합니다.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 개인정보 접근 로그</Text>
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.logItem}>
            <Text style={styles.logText}>조회자: {item.searcherId}</Text>
            <Text style={styles.logText}>시간: {formatTime(item.timestamp)}</Text>
            <Text style={styles.logText}>상태: {item.status}</Text>
            <Text style={styles.logText}>유형: {item.type}</Text>
          </View>
        )}
      />
    </View>
  );
};

const formatTime = (timestamp: any) => {
  try {
    return timestamp?.toDate
      ? timestamp.toDate().toLocaleString()
      : new Date(timestamp).toLocaleString();
  } catch (e) {
    return '(잘못된 시간)';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 20, backgroundColor: '#fff',
  },
  title: {
    fontSize: 20, fontWeight: 'bold', marginBottom: 16,
  },
  logItem: {
    padding: 12, borderBottomWidth: 1, borderBottomColor: '#ddd',
  },
  logText: {
    fontSize: 16,
  },
});

export default MyAccessLogs;
