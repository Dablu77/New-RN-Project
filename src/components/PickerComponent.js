import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import { windowHeight } from '../global/Dimensions';
import globalStyles from '../global/globalStyles';
import FormInput from './FormInput';

export default function PickerComponent() {
  const [options, setOptions] = useState(0);
  const [otherValue, setOtherValue] = useState();
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <RNPickerSelect
          items={[
            { label: 'Someone told me', value: 'Someone told me' },
            { label: 'Social Media or Search', value: 'TypeScript' },
            {
              label: 'Software Integration Partner',
              value: 'Software Integration Partner',
            },
            { label: 'Podcast', value: 'Podcast' },
            {
              label: 'Manufacturer or Industry Group',
              value: 'Manufacturer or Industry Group',
            },
            { label: 'Trade Show or Event', value: 'Trade Show or Event' },
            { label: 'Other', value: 'Other' },
          ]}
          onValueChange={options => setOptions(1)}
          style={pickerSelectStyles}
          iconColor={'black'}></RNPickerSelect>
      </View>
      {options === 1 ? (
        <View style={{ ...globalStyles.inputContainer, marginTop: 10 }}>
          <TextInput
            value={otherValue}
            numberOfLines={1}
            placeholder="Other value"
            placeholderTextColor="#666"
            style={[globalStyles.input, { marginLeft: 10 }]}
            onChangeText={otherValue => setOtherValue(otherValue)}
          />

          {/* <TextInput placeholder="hr" /> */}
        </View>
      ) : (
        <View style={{ marginBottom: windowHeight / 13 }}></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3,
    height: 90,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    height: 90, // to ensure the text is never behind the icon
    // backgroundColor: 'red',
  },
});
