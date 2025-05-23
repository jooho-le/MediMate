import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Alert } from 'react-native';

const DetailScreen = ({ route, navigation }) => {
  const { part, direction: initialDirection } = route.params;
  const [direction, setDirection] = useState(initialDirection); // 앞면/뒷면 상태

  const toggleDirection = () => {
    setDirection(prev => (prev === 'front' ? 'back' : 'front'));
  };

  const getImage = () => {
    switch (part) {
      case '왼팔':
        return direction === 'front'
          ? require('../image/arm_left_front.png')
          : require('../image/arm_left_back.png');
      case '오른팔':
        return direction === 'front'
          ? require('../image/arm_right_front.png')
          : require('../image/arm_right_back.png');
      case '상체':
        return direction === 'front'
          ? require('../image/chest.png')
          : require('../image/back.png');
      case '왼팔 아래':
        return direction === 'front'
          ? require('../image/forearm_left_front.png')
          : require('../image/forearm_left_back.png');
      case '오른팔 아래':
        return direction === 'front'
          ? require('../image/forearm_right_front.png')
          : require('../image/forearm_right_back.png');
      case '왼쪽 허벅지':
        return direction === 'front'
          ? require('../image/thigh_left_front.png')
          : require('../image/thigh_left_back.png');
      case '오른쪽 허벅지':
        return direction === 'front'
          ? require('../image/thigh_right_front.png')
          : require('../image/thigh_right_back.png');
      case '왼쪽 종아리':
        return direction === 'front'
          ? require('../image/calf_left_front.png')
          : require('../image/calf_left_back.png');
      case '오른쪽 종아리':
        return direction === 'front'
          ? require('../image/calf_right_front.png')
          : require('../image/calf_right_back.png');
      case '머리':
        return direction === 'front'
          ? require('../image/head_front.png')
          : require('../image/head_back.png');
      default:
        return null;
    }
  };

  const onAreaPress = (areaName: string) => {
    Alert.alert(`${areaName} 터치됨`);
    navigation.navigate('PainLevel', {part, areaName}); 
    // 추후 navigation.navigate(...) 등으로 확장 가능
  };

  const getTouchableButtons = () => {
    switch (part) {
      case '머리':
        if(direction==='front'){
            return (
            <>
            <TouchableOpacity
                style={[styles.button, { top: '35%', left: '40%', width: '10%', height: '10%' }]}
                onPress={() => onAreaPress('상-좌 머리')}
            />
            <TouchableOpacity
                style={[styles.button, { top: '35%', left: '51%', width: '10%', height: '10%' }]}
                onPress={() => onAreaPress('상-우 머리')}
            />
            <TouchableOpacity
                style={[styles.button, { top: '45%', left: '40%', width: '10%', height: '10%' }]}
                onPress={() => onAreaPress('하-좌 머리')}
            />
            <TouchableOpacity
                style={[styles.button, { top: '45%', left: '51%', width: '10%', height: '10%' }]}
                onPress={() => onAreaPress('하-우 머리')}
            />
            </>
            );   
        }else {
            return (
            <>
            <TouchableOpacity
                style={[styles.button, { top: '35%', left: '40%', width: '10%', height: '10%' }]}
                onPress={() => onAreaPress('상-좌 머리 후면')}
            />
            <TouchableOpacity
                style={[styles.button, { top: '35%', left: '51%', width: '10%', height: '10%' }]}
                onPress={() => onAreaPress('상-우 머리 후면')}
            />
            <TouchableOpacity
                style={[styles.button, { top: '45%', left: '40%', width: '10%', height: '10%' }]}
                onPress={() => onAreaPress('하-좌 머리 후면')}
            />
            <TouchableOpacity
                style={[styles.button, { top: '45%', left: '51%', width: '10%', height: '10%' }]}
                onPress={() => onAreaPress('하-우 머리 후면')}
            />
            </>
            );   
        }

      case '상체':
        if(direction==='front'){
        return (
                <>
          <TouchableOpacity
            style={[styles.button, { top: '25%', left: '30%', width: '20%', height: '20%' }]}
            onPress={() => onAreaPress('좌 가슴')}
          />
          <TouchableOpacity
            style={[styles.button, { top: '25%', left: '55%', width: '20%', height: '20%' }]}
            onPress={() => onAreaPress('우 가슴')}
          />
          <TouchableOpacity
            style={[styles.button, { top: '46%', left: '30%', width: '20%', height: '20%' }]}
            onPress={() => onAreaPress('좌 복부')}
          />
          <TouchableOpacity
            style={[styles.button, { top: '46%', left: '55%', width: '20%', height: '20%' }]}
            onPress={() => onAreaPress('우 복부')}
          />
          </>
        );
        }else {
            return (
                <>
          <TouchableOpacity
            style={[styles.button, { top: '25%', left: '30%', width: '20%', height: '20%' }]}
            onPress={() => onAreaPress('좌 어깨')}
          />
          <TouchableOpacity
            style={[styles.button, { top: '25%', left: '55%', width: '20%', height: '20%' }]}
            onPress={() => onAreaPress('우 어깨')}
          />
          <TouchableOpacity
            style={[styles.button, { top: '46%', left: '30%', width: '20%', height: '20%' }]}
            onPress={() => onAreaPress('좌 등')}
          />
          <TouchableOpacity
            style={[styles.button, { top: '46%', left: '55%', width: '20%', height: '20%' }]}
            onPress={() => onAreaPress('우 등')}
          />
          </>
        );
        }


        case '왼팔':
       if (direction === 'front') {
            return (
            <>
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '35%', left: '55%', width: 40, height: 150, transform: [{ rotate: '35deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 좌 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '55%', left: '40%',width: 40, height:150,  transform: [{ rotate: '45deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '40%', left: '60%', width: 40, height: 150, transform: [{ rotate: '35deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 아래쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '55%', left: '28%', width: 40, height: 150, transform: [{ rotate: '45deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 좌 - 아래쪽`)}
                />
            </>
            );
        } else {
            return (
            <>
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '35%', left: '55%', width: 40, height: 150, transform: [{ rotate: '35deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 좌 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '55%', left: '40%',width: 40, height:150,  transform: [{ rotate: '45deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '40%', left: '60%', width: 40, height: 150, transform: [{ rotate: '35deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 아래쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '55%', left: '28%', width: 40, height: 150, transform: [{ rotate: '45deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 좌 - 아래쪽`)}
                />
            </>
            );
        }

        

case '오른팔':
  if (direction === 'front') {
    return (
      <>
        <TouchableOpacity
          style={[styles.diagonalButton, { top: '38%',left: '40%', width: 40,height: 150,transform: [{ rotate: '-35deg' }], }]}
          onPress={() => onAreaPress(`${part}  ${direction} 좌 - 위쪽`)}
        />
        <TouchableOpacity
          style={[styles.diagonalButton, {top: '55%',left: '50%', width: 40,height: 150,transform: [{ rotate: '-45deg' }],}]}
          onPress={() => onAreaPress(`${part}  ${direction} 우 - 위쪽`)}
        />
        <TouchableOpacity
          style={[styles.diagonalButton, {top: '42%',left: '35%',width: 40,height: 150,transform: [{ rotate: '-35deg' }],}]}
          onPress={() => onAreaPress(`${part}  ${direction} 우 - 아래쪽`)}
        />
        <TouchableOpacity
          style={[styles.diagonalButton, {top: '55%',left: '60%',width: 40,height: 150,transform: [{ rotate: '-45deg' }],}]}
          onPress={() => onAreaPress(`${part}  ${direction} 좌 - 아래쪽`)}
        />
      </>
    );
  } else {
    // direction === 'back', 동일 좌표/회전 대칭 적용
    return (
      <>
        <TouchableOpacity
          style={[styles.diagonalButton, { top: '38%', left: '40%', width: 40, height: 150, transform: [{ rotate: '-35deg' }],}]}
          onPress={() => onAreaPress(`${part}  ${direction} 좌 - 위쪽 `)}
        />
        <TouchableOpacity
          style={[styles.diagonalButton, { top: '55%', left: '50%', width: 40, height: 150, transform: [{ rotate: '-45deg' }], }]}
          onPress={() => onAreaPress(`${part}  ${direction} 우 - 위쪽 `)}
        />
        <TouchableOpacity
          style={[styles.diagonalButton, { top: '42%', left: '35%', width: 40, height: 150, transform: [{ rotate: '-35deg' }],}]}
          onPress={() => onAreaPress(`${part}  ${direction} 우 - 아래쪽 `)}
        />
        <TouchableOpacity
          style={[styles.diagonalButton, { top: '55%', left: '60%', width: 40, height: 150,transform: [{ rotate: '-45deg' }],}]}
          onPress={() => onAreaPress(`${part}  ${direction} 좌 - 아래쪽 `)}
        />
      </>
    );
  }


      case '왼팔 아래':
        if (direction === 'front') {
            return (
            <>
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '27%', left: '67%', width: 25, height: 100, transform: [{ rotate: '40deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 좌 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '30%', left: '70%',width: 25, height:100,  transform: [{ rotate: '40deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '38%', left: '51%', width: 25, height: 100, transform: [{ rotate: '40deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 아래쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '39%', left: '55%', width: 25, height: 100, transform: [{ rotate: '40deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 좌 - 아래쪽`)}
                />
            </>
            );
        } else {
            return (
            <>
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '25%', left: '67%', width: 25, height: 100, transform: [{ rotate: '40deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 좌 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '28%', left: '70%',width: 25, height:100,  transform: [{ rotate: '40deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '35%', left: '51%', width: 25, height: 100, transform: [{ rotate: '40deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 아래쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '38%', left: '55%', width: 25, height: 100, transform: [{ rotate: '40deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 좌 - 아래쪽`)}
                />
            </>
            );
        }

      case '오른팔 아래':
                if (direction === 'front') {
            return (
            <>
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '30%', left: '22%', width: 25, height: 100, transform: [{ rotate: '-40deg' }] }]}
                onPress={() => onAreaPress(`${part} ${direction} 좌 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '28%', left: '28%',width: 25, height:100,  transform: [{ rotate: '-40deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '38%', left: '45%', width: 25, height: 100, transform: [{ rotate: '-45deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 아래쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '40%', left: '39%', width: 25, height: 100, transform: [{ rotate: '-45deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 좌 - 아래쪽`)}
                />
            </>
            );
        } else {
            return (
            <>
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '28%', left: '24%', width: 25, height: 100, transform: [{ rotate: '-40deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 좌 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '25%', left: '28%',width: 25, height:100,  transform: [{ rotate: '-40deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '36%', left: '45%', width: 25, height: 100, transform: [{ rotate: '-40deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 아래쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '38%', left: '39%', width: 25, height: 100, transform: [{ rotate: '-40deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 좌 - 아래쪽`)}
                />
            </>
            );
        }

      case '왼쪽 허벅지':
       if (direction === 'front') {
            return (
            <>
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '25%',left: '48%', width: 60,height: 160,transform: [{ rotate: '25deg' }], }]}
                onPress={() => onAreaPress(`${part}  ${direction} 좌 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, {top: '32%',left: '58%',width: 60,height: 150,transform: [{ rotate: '25deg' }],}]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, {top: '50%',left: '48%', width: 55,height: 150,transform: [{ rotate: '25deg' }],}]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 아래쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, {top: '45%',left: '38%',width: 55,height: 150,transform: [{ rotate: '25deg' }],}]}
                onPress={() => onAreaPress(`${part}  ${direction} 좌 - 아래쪽`)}
                />
            </>
            );
        } else {
            // direction === 'back', 동일 좌표/회전 대칭 적용
            return (
            <>
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '25%',left: '48%', width: 60,height: 160,transform: [{ rotate: '25deg' }], }]}
                onPress={() => onAreaPress(`${part}  ${direction} 좌 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, {top: '32%',left: '58%',width: 60,height: 150,transform: [{ rotate: '25deg' }],}]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, {top: '50%',left: '48%', width: 55,height: 150,transform: [{ rotate: '25deg' }],}]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 아래쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, {top: '45%',left: '38%',width: 55,height: 150,transform: [{ rotate: '25deg' }],}]}
                onPress={() => onAreaPress(`${part}  ${direction} 좌 - 아래쪽`)}
                />
            </>
            );
        }

      case '오른쪽 허벅지':
       if (direction === 'front') {
            return (
            <>
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '35%',left: '25%', width: 60,height: 160,transform: [{ rotate: '-25deg' }], }]}
                onPress={() => onAreaPress(`${part}  ${direction} 좌 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, {top: '28%',left: '33%',width: 60,height: 150,transform: [{ rotate: '-25deg' }],}]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, {top: '48%',left: '50%', width: 55,height: 150,transform: [{ rotate: '-25deg' }],}]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 아래쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, {top: '56%',left: '41%',width: 55,height: 150,transform: [{ rotate: '-25deg' }],}]}
                onPress={() => onAreaPress(`${part}  ${direction} 좌 - 아래쪽`)}
                />
            </>
            );
        } else {
          return (
            <>
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '35%',left: '20%', width: 60,height: 160,transform: [{ rotate: '-25deg' }], }]}
                onPress={() => onAreaPress(`${part}  ${direction} 좌 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, {top: '28%',left: '28%',width: 60,height: 150,transform: [{ rotate: '-25deg' }],}]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, {top: '48%',left: '45%', width: 55,height: 150,transform: [{ rotate: '-25deg' }],}]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 아래쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, {top: '56%',left: '36%',width: 55,height: 150,transform: [{ rotate: '-25deg' }],}]}
                onPress={() => onAreaPress(`${part}  ${direction} 좌 - 아래쪽`)}
                />
            </>
            );
        }

      case '왼쪽 종아리':
        if (direction === 'front') {
            return (
            <>
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '20%', left: '55%', width: 30, height: 130, transform: [{ rotate: '25deg' }] }]}
                onPress={() => onAreaPress(`${part} ${direction} 좌 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '20%', left: '63%',width: 30, height:130,  transform: [{ rotate: '25deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '37%', left: '52%', width: 30, height: 130, transform: [{ rotate: '25deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 아래쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '37%', left: '46%', width: 30, height: 130, transform: [{ rotate: '15deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 좌 - 아래쪽`)}
                />
            </>
            );
        } else {
            return (
            <>
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '20%', left: '55%', width: 30, height: 130, transform: [{ rotate: '25deg' }] }]}
                onPress={() => onAreaPress(`${part} ${direction} 좌 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '20%', left: '63%',width: 30, height:130,  transform: [{ rotate: '25deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '37%', left: '52%', width: 30, height: 130, transform: [{ rotate: '25deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 아래쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '37%', left: '46%', width: 30, height: 130, transform: [{ rotate: '15deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 좌 - 아래쪽`)}
                />
            </>
            );            
        }
      case '오른쪽 종아리':
        if (direction === 'front') {
            return (
            <>
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '25%', left: '32%', width: 30, height: 130, transform: [{ rotate: '-25deg' }] }]}
                onPress={() => onAreaPress(`${part} ${direction} 좌 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '26%', left: '41%',width: 30, height:130,  transform: [{ rotate: '-25deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '42%', left: '50%', width: 30, height: 130, transform: [{ rotate: '-20deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 아래쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '40%', left: '43%', width: 30, height: 130, transform: [{ rotate: '-20deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 좌 - 아래쪽`)}
                />
            </>
            );
        } else {
            return (
            <>
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '25%', left: '28%', width: 30, height: 130, transform: [{ rotate: '-25deg' }] }]}
                onPress={() => onAreaPress(`${part} ${direction} 좌 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '26%', left: '37%',width: 30, height:130,  transform: [{ rotate: '-25deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 위쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '42%', left: '46%', width: 30, height: 130, transform: [{ rotate: '-20deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 우 - 아래쪽`)}
                />
                <TouchableOpacity
                style={[styles.diagonalButton, { top: '40%', left: '38%', width: 30, height: 130, transform: [{ rotate: '-20deg' }] }]}
                onPress={() => onAreaPress(`${part}  ${direction} 좌 - 아래쪽`)}
                />
            </>
            );         
        }
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${part} - ${direction === 'front' ? '앞면' : '뒷면'}`}</Text>
      <View style={styles.imageContainer}>
        {getImage() && <Image source={getImage()} style={styles.image} />}
        {getTouchableButtons()}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={`👉 ${direction === 'front' ? '뒷면 보기' : '앞면 보기'}`}
          onPress={toggleDirection}
        />
      </View>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    position: 'absolute',
  },
  button: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 128, 255, 0.3)', // 파란색 계열로 시각화
    borderRadius: 8,
  },
  buttonContainer: {
    padding: 20,
  },
  diagonalButton: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 128, 255, 0.3)', // 파란색 계열로 시각화
    borderRadius: 6,
},

});
