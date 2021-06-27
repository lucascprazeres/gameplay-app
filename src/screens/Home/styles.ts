import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getStatusBarHeight() + 26,
    marginBottom: 42,
  },
  content: {
    paddingBottom: 69,
  },
  matches: {
    marginTop: 24,
    marginLeft: 24,
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 24,
  },
  modalMessage: {
    fontSize: 20,
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
  },
  modalMessageHightlight: {
    color: theme.colors.primary,
  },
  buttons: {
    flexDirection: 'row',
  },
  modalButton: {
    flex: 1,
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancel: {
    borderWidth: 2,
    borderColor: theme.colors.secondary30,
    marginRight: 8,
  },
  confirm: {
    backgroundColor: theme.colors.primary,
  },
  modalButtonText: {
    flex: 1,
    color: theme.colors.heading,
    fontFamily: theme.fonts.text500,
    fontSize: 15,
    textAlign: 'center',
  },
});
