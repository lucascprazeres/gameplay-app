import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Appointment } from '../../components/Appointment';
import { Background } from '../../components/Background';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Profile } from '../../components/Profile';

import { styles } from './styles';

export function Home() {
  const [category, setCategory] = useState('');

  const navigation = useNavigation();

  const appointments = [
    {
      id: '1',
      guild: {
        id: '1',
        name: 'Embaixadores',
        icon: null,
        owner: true,
      },
      category: '1',
      date: '22/06 às 20:40h',
      description:
        'É hoje que vamos chegar ao challenger sem perder uma partida md10',
    },
    {
      id: '2',
      guild: {
        id: '1',
        name: 'Aquela ranked',
        icon: null,
        owner: true,
      },
      category: '1',
      date: '22/06 às 20:40h',
      description:
        'É hoje que vamos chegar ao challenger sem perder uma partida md10',
    },
    {
      id: '3',
      guild: {
        id: '1',
        name: 'Go challenger',
        icon: null,
        owner: true,
      },
      category: '1',
      date: '22/06 às 20:40h',
      description:
        'É hoje que vamos chegar ao challenger sem perder uma partida md10',
    },
    {
      id: '4',
      guild: {
        id: '1',
        name: 'Go challenger',
        icon: null,
        owner: true,
      },
      category: '1',
      date: '22/06 às 20:40h',
      description:
        'É hoje que vamos chegar ao challenger sem perder uma partida md10',
    },
    {
      id: '5',
      guild: {
        id: '1',
        name: 'Go challenger',
        icon: null,
        owner: true,
      },
      category: '1',
      date: '22/06 às 20:40h',
      description:
        'É hoje que vamos chegar ao challenger sem perder uma partida md10',
    },
  ];

  function handleNavigateToAppointmentDetails() {
    navigation.navigate('AppointmentDetails');
  }

  function handleNavigateToAppointmentCreate() {
    navigation.navigate('AppointmentCreate');
  }

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.header}>
          <Profile />
          <ButtonAdd onPress={handleNavigateToAppointmentCreate} />
        </View>

        <CategorySelect
          selectedCategoryId={category}
          selectCategoryById={setCategory}
        />

        <ListHeader title="Partidas agendadas" subtitle="Total 6" />
        <FlatList
          data={appointments}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Appointment
              data={item}
              onPress={handleNavigateToAppointmentDetails}
            />
          )}
          ItemSeparatorComponent={() => <ListDivider />}
          showsVerticalScrollIndicator={false}
          style={styles.matches}
          contentContainerStyle={styles.content}
        />
      </View>
    </Background>
  );
}
