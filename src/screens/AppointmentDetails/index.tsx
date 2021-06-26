import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  View,
  Text,
  Alert,
  Platform,
  Share,
} from 'react-native';
import * as Linking from 'expo-linking';
import { BorderlessButton, FlatList } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';

import { useRoute } from '@react-navigation/native';
import { Header } from '../../components/Header';
import { Background } from '../../components/Background';
import { theme } from '../../global/styles/theme';
import bannerImg from '../../assets/banner.png';
import { styles } from './styles';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { AppointmentProps } from '../../components/Appointment';
import { api } from '../../services/api';
import { Load } from '../../components/Load';

type Params = {
  selectedAppointment: AppointmentProps;
};

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
  presence_count: number;
};

export function AppointmentDetails() {
  const route = useRoute();
  const { selectedAppointment } = route.params as Params;

  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);

  const { primary } = theme.colors;

  async function fetchGuildWidget() {
    try {
      const response = await api.get(
        `/guilds/${selectedAppointment.guild.id}/widget.json`,
      );
      console.log(response.data);
      setWidget(response.data);
    } catch {
      Alert.alert(
        'Verifique as cofigurações do servidor. Será que a opção widget está habilitada?',
      );
    } finally {
      setLoading(false);
    }
  }

  function handleShareInvitation() {
    const message =
      Platform.OS === 'ios'
        ? `Junte-se a ${selectedAppointment.guild.name}`
        : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite,
    });
  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite);
  }

  useEffect(() => {
    fetchGuildWidget();
  }, []);

  const { guild } = selectedAppointment;

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          guild.owner && (
            <BorderlessButton onPress={handleShareInvitation}>
              <Fontisto name="share" size={24} color={primary} />
            </BorderlessButton>
          )
        }
      />
      <ImageBackground source={bannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guild.name}</Text>
          <Text style={styles.subtitle}>{selectedAppointment.description}</Text>
        </View>
      </ImageBackground>
      {loading ? (
        <Load />
      ) : (
        <>
          <ListHeader
            title="Jogadores"
            subtitle={`Total ${widget.members.length}`}
          />
          <FlatList
            data={widget.members}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Member data={item} />}
            ItemSeparatorComponent={() => <ListDivider />}
            style={styles.members}
          />
        </>
      )}
      <View style={styles.footer}>
        <ButtonIcon onPress={handleOpenGuild}>Entrar na partida</ButtonIcon>
      </View>
    </Background>
  );
}
