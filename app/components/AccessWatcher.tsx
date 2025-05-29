// components/AccessWatcher.tsx
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { firebaseAuth, firebaseDB } from '../firebase/firebase';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

interface Props {
  uid: string;
}

const AccessWatcher: React.FC<{ uid: string }> = ({ uid }) => {
  useEffect(() => {
    if (!uid) return;

    const unsubscribe = firebaseDB
      .collection('access_logs')
      .where('targetPatientId', '==', uid)   // ✅
      .where('status', '==', 'pending')
      .orderBy('timestamp', 'desc')
      .limit(1)
      .onSnapshot(qs => {
         if (!qs || !qs.docChanges) return; 
        qs.docChanges().forEach(change => {
          if (change.type !== 'added') return;

          const d = change.doc.data();
          const viewer = d.searcherId ?? '(알 수 없음)';
          const time =
            d.timestamp?.toDate
              ? d.timestamp.toDate().toLocaleString()
              : d.timestamp ?? '';

          Alert.alert('개인정보 접근 감지',
            `${viewer} 님이 ${time}에 개인정보를 조회했습니다.`);

          // 확인 처리 (선택)
          change.doc.ref.update({ status: 'notified' }).catch(console.error);
        });
      });

    return () => unsubscribe();
  }, [uid]);

  return null;
};


export default AccessWatcher;
