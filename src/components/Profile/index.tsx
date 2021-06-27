import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/auth';

import { Avatar } from '../Avatar';

import { styles } from './styles';

type Props = {
  toggleModal: () => void;
};

export function Profile({ toggleModal }: Props) {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <RectButton onPress={toggleModal}>
        <Avatar imageUrl={user.avatar} />
      </RectButton>

      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>Olá,</Text>
          <Text style={styles.username}>{user.firstName}</Text>
        </View>
        <Text style={styles.message}>Hoje é dia de vitória</Text>
      </View>
    </View>
  );
}
