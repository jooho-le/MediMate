// firebase.js

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// 자동 초기화되므로 별도 설정 불필요
export const firebaseAuth = auth();       // 인증 모듈
export const firebaseDB = firestore();    // Firestore DB
