import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';

type Props = {
  isCentered?: boolean;
};

export function ListDivider({ isCentered }: Props) {
  return (
    <View
      style={[
        styles.container,
        isCentered ? styles.centered : styles.notCentered,
      ]}
    />
  );
}
