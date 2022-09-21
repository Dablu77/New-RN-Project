import React from 'react';
import IconFeth from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function VectorIcon(props) {
  return (
    <>
      {props.familyName === 'Feather' && (
        <IconFeth
          color={props.color ? props.color : 'black'}
          onPress={props.onPress}
          name={props.iconName}
          size={props.size ? props.size : 25}
          style={props.iconStyle}
        />
      )}
      {props.familyName === 'MaterialCommunityIcons' && (
        <MaterialCommunityIcons
          color={props.color ? props.color : 'black'}
          onPress={props.onPress}
          name={props.iconName}
          size={props.size ? props.size : 25}
          style={props.iconStyle}
        />
      )}
      {props.familyName === 'AntDesign' && (
        <AntDesign
          color={props.color ? props.color : 'black'}
          onPress={props.onPress}
          name={props.iconName}
          size={props.size ? props.size : 25}
          style={props.iconStyle}
        />
      )}
      {props.familyName === 'Ionicons' && (
        <AntDesign
          color={props.color ? props.color : 'black'}
          onPress={props.onPress}
          name={props.iconName}
          size={props.size ? props.size : 25}
          style={props.iconStyle}
        />
      )}
    </>
  );
}
