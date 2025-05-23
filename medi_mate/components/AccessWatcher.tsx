import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'; // 로그인 사용 시 필요

const AccessWatcher = () => {
  useEffect(() => {
    // 예: 현재 로그인된 사용자 기준
    const uid = auth().currentUser?.uid;
    if (!uid) return;

    // access_logs/{uid} 콜렉션에 새 문서가 추가되면 감지
    const unsubscribe = firestore()
      .collection('access_logs')
      .doc(uid)
      .collection('entries') // 하위 컬렉션 형태로 나누는 것도 가능
      .orderBy('timestamp', 'desc') // 가장 최근 것 먼저
      .limit(1)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            const data = change.doc.data();
            const viewer = data.viewer;
            const time = new Date(data.timestamp).toLocaleString();

            Alert.alert(
              '개인정보 접근 감지',
              `${viewer}가 ${time}에 개인정보를 조회했습니다.`
            );
          }
        });
      });

    return () => unsubscribe();
  }, []);

  return null; // 이 컴포넌트는 UI를 렌더하지 않음
};

export default AccessWatcher;
