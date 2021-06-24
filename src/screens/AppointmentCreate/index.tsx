import React, { useState } from 'react';

import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { Header } from '../../components/Header';
import { styles } from './styles';
import { CategorySelect } from '../../components/CategorySelect';
import { theme } from '../../global/styles/theme';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { Textarea } from '../../components/Textarea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';
import { Guilds } from '../Guilds';
import { GuildProps } from '../../components/Guild';

export function AppointmentCreate() {
  const [category, setCategory] = useState('');
  const [showGuildsModal, setShowGuildsModal] = useState(false);
  const [guild, setGuild] = useState({} as GuildProps);

  function handleShowGuildsModal() {
    setShowGuildsModal(true);
  }

  function handleSelectGuild(selectedGuild: GuildProps) {
    setGuild(selectedGuild);
    setShowGuildsModal(false);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView>
        <Header title="Agendar partida" />
        <Text style={styles.categoryLabel}>Categoria</Text>

        <CategorySelect
          hasCheckBox
          selectedCategoryId={category}
          selectCategoryById={setCategory}
        />

        <View style={styles.form}>
          <RectButton onPress={handleShowGuildsModal}>
            <View style={styles.select}>
              {guild.icon ? <GuildIcon /> : <View style={styles.image} />}
              <View style={styles.selectBody}>
                <Text style={styles.label}>
                  {guild.name ? guild.name : 'Selecione um servidor'}
                </Text>
              </View>
              <Feather
                name="chevron-right"
                color={theme.colors.heading}
                size={18}
              />
            </View>
          </RectButton>

          <View style={styles.field}>
            <View>
              <Text style={styles.label}>Dia e mês</Text>
              <View style={styles.column}>
                <SmallInput maxLength={2} />
                <Text style={styles.divider}>/</Text>
                <SmallInput maxLength={2} />
              </View>
            </View>

            <View>
              <Text style={styles.label}>Hora e minuto</Text>
              <View style={styles.column}>
                <SmallInput maxLength={2} />
                <Text style={styles.divider}>:</Text>
                <SmallInput maxLength={2} />
              </View>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.descriptionLabel}>Descrição</Text>
            <Text style={styles.charLimit}>Max 100 caracteres</Text>
          </View>
          <Textarea multiline maxLength={100} numberOfLines={5} />
          <View style={styles.footer}>
            <Button>Agendar</Button>
          </View>
        </View>
      </ScrollView>

      <ModalView visible={showGuildsModal}>
        <Guilds handleSelectGuild={handleSelectGuild} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}
