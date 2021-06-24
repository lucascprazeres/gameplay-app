import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Guild, GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';

import { styles } from './styles';

type Props = {
  handleSelectGuild: (guild: GuildProps) => void;
};

export function Guilds({ handleSelectGuild }: Props) {
  const guilds = [
    {
      id: '1',
      name: 'Lendarios',
      icon: 'null',
      owner: true,
    },
    {
      id: '2',
      name: 'Embaixadores',
      icon: 'null',
      owner: false,
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={guilds}
        style={styles.guilds}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Guild data={item} onPress={() => handleSelectGuild(item)} />
        )}
        ItemSeparatorComponent={() => <ListDivider />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
