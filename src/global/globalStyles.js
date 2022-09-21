import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';
const { height, width } = Dimensions.get('window');

import { windowHeight, windowWidth } from './Dimensions';

const globalStyles = StyleSheet.create({
  //login,signup style
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    padding: 20,
  },
  text: {
    // fontFamily: 'Open-Sans',
    fontSize: 18,
    marginBottom: 15,
    color: colors.textColor,
    fontWeight: '700',
    marginTop: 20,
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    // fontFamily: 'Open-Sans',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
    alignItems: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '600',
    // fontFamily: 'Open-Sans',
    color: 'grey',
  },
  smallText: {
    color: '#151515',
    fontSize: 16,
  },

  //InputContainer style
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    width: 50,
  },
  input: {
    padding: 2,
    flex: 1,
    fontSize: 16,
    // fontFamily: 'Open-Sans',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: 90,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  ErrorContainer: {
    // height: height * 0.02,
    width: width * 0.9,
    justifyContent: 'center',
    marginBottom: 10,
  },
});
export default globalStyles;
