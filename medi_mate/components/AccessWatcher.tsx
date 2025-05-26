// components/AccessWatcher.tsx
import React, { useEffect, useRef } from 'react'
import { Alert } from 'react-native'
import { firebaseDB } from '../firebase/firebase'

interface Props {
  uid: string
}

const AccessWatcher: React.FC<Props> = ({ uid }) => {
  const handledDocIds = useRef<Set<string>>(new Set()) // ✅ 중복 방지용

  useEffect(() => {
    if (!uid) return

    const unsubscribe = firebaseDB
      .collection('access_logs')
      .where('targetPatientId', '==', uid)
      .where('status', '==', 'pending')
      .orderBy('timestamp', 'desc')
      .limit(10) // ✅ 여러 요청을 수신할 수 있게 여유 확보
      .onSnapshot(
        snapshot => {
          snapshot.forEach(doc => {
            const data = doc.data()

            // ✅ 중복 처리 방지
            if (handledDocIds.current.has(doc.id)) return
            if (data.status !== 'pending') return

            handledDocIds.current.add(doc.id) // ✅ 이후 감지되지 않도록 등록

            const viewer = data.searcherNickname ?? '(알 수 없음)'
            const time =
              data.timestamp?.toDate?.() instanceof Date
                ? data.timestamp.toDate().toLocaleString()
                : new Date(data.timestamp).toLocaleString()

            Alert.alert(
              '개인정보 접근 감지',
              `${viewer} 님이 ${time}에 개인정보를 조회했습니다.`,
              [
                {
                  text: '거절',
                  style: 'destructive',
                  onPress: () => {
                    doc.ref.update({ status: 'rejected' }).catch(console.error)
                  },
                },
                {
                  text: '확인',
                  onPress: () => {
                    doc.ref.update({ status: 'notified' }).catch(console.error)
                  },
                },
              ],
              { cancelable: false }
            )
          })
        },
      )

    return () => {
      unsubscribe()
    }
  }, [uid])

  return null
}

export default AccessWatcher
