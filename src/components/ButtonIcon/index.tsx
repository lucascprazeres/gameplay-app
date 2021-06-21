import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { Image, Text, View } from 'react-native';

import discordImg from '../../assets/discord.png';

import { styles } from './styles';

type Props = RectButtonProps & {
  children: string;
};

export function ButtonIcon({ children, ...rest }: Props) {
  return (
    <RectButton style={styles.container} {...rest}>
      <View style={styles.iconWrapper}>
        <Image source={discordImg} style={styles.icon} />
      </View>
      <Text style={styles.title}>{children}</Text>
    </RectButton>
  );
}
