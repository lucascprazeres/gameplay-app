import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Text, View } from 'react-native';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

type Props = {
  imageUrl: string;
};

export function Avatar({ imageUrl }: Props) {
  const { secondary50, secondary70 } = theme.colors;

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary50, secondary70]}
    >
      <Image source={{ uri: imageUrl }} style={styles.avatar} />
    </LinearGradient>
  );
}
