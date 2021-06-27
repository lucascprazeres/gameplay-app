import React, { ReactNode } from 'react';
import {
  Modal,
  ModalProps,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { Background } from '../Background';

import { styles } from './styles';

type Props = ModalProps & {
  children: ReactNode;
};

export function SignOutModal({ children, ...rest }: Props) {
  return (
    <Modal transparent animationType="slide" statusBarTranslucent {...rest}>
      <TouchableWithoutFeedback>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Background>{children}</Background>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
