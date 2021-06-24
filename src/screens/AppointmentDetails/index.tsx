import React from 'react';
import { ImageBackground, View, Text } from 'react-native';
import { BorderlessButton, FlatList } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';

import { Header } from '../../components/Header';
import { Background } from '../../components/Background';
import { theme } from '../../global/styles/theme';
import bannerImg from '../../assets/banner.png';
import { styles } from './styles';
import { ListHeader } from '../../components/ListHeader';
import { Member } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';

export function AppointmentDetails() {
  const { primary } = theme.colors;

  const members = [
    {
      id: '1',
      username: 'Lucas',
      avatar_url: 'https://github.com/lucascprazeres.png',
      status: 'online',
    },
    {
      id: '2',
      username: 'Lucas',
      avatar_url: 'https://github.com/lucascprazeres.png',
      status: 'offline',
    },
  ];

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          <BorderlessButton>
            <Fontisto name="share" size={24} color={primary} />
          </BorderlessButton>
        }
      />
      <ImageBackground source={bannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>Lendários</Text>
          <Text style={styles.subtitle}>
            É hoje que a gente chega ao challenger sem perder uma partida md10
          </Text>
        </View>
      </ImageBackground>
      <ListHeader title="Jogadores" subtitle="Total 3" />
      <FlatList
        data={members}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Member data={item} />}
        ItemSeparatorComponent={() => <ListDivider />}
        style={styles.members}
      />
      <View style={styles.footer}>
        <ButtonIcon>Entrar na partida</ButtonIcon>
      </View>
    </Background>
  );
}
