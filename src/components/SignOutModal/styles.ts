import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    height: 170,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
  },
});
