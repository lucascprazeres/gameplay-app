import React from 'react';
import { Image } from 'react-native';

import { styles } from './styles';

export function GuildIcon() {
  const uri =
    'https://pbs.twimg.com/profile_images/1291682473592659968/sEorc6oh.jpg';

  return <Image source={{ uri }} style={styles.image} resizeMode="cover" />;
}
