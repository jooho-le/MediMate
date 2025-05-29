import { Platform } from 'react-native';

// 자동 IP 설정
const LOCALHOST = Platform.OS === 'android'
  ? 'http://10.0.2.2:8000' // Android 에뮬레이터
  : 'http://127.0.0.1:8000'; // iOS 시뮬레이터 또는 웹

const API_URL = `${LOCALHOST}/summarize`;

export const summarizeText = async (text: string) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.summary;
  } catch (error) {
    console.error('Summary fetch failed:', error);
    throw error;
  }
};
