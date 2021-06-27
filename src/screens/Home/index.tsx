import React, { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { Background } from '../../components/Background';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Profile } from '../../components/Profile';
import { SignOutModal } from '../../components/SignOutModal';

import { styles } from './styles';
import { COLLECTION_APPOINTMENTS } from '../../configs/storage';
import { Load } from '../../components/Load';
import { useAuth } from '../../hooks/auth';

export function Home() {
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { signOut } = useAuth();

  const navigation = useNavigation();

  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

  function handleNavigateToAppointmentDetails(
    selectedAppointment: AppointmentProps,
  ) {
    navigation.navigate('AppointmentDetails', { selectedAppointment });
  }

  function handleNavigateToAppointmentCreate() {
    navigation.navigate('AppointmentCreate');
  }

  function handleSelectCategory(selectedCategory: string) {
    selectedCategory === category
      ? setCategory('')
      : setCategory(selectedCategory);
  }

  async function loadAppointments() {
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const loadedAppointments: AppointmentProps[] = storage
      ? JSON.parse(storage)
      : [];

    if (category) {
      setAppointments(
        loadedAppointments.filter(item => item.category === category),
      );
    } else {
      setAppointments(loadedAppointments);
    }

    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [category]),
  );

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.header}>
          <Profile toggleModal={() => setModalIsOpen(true)} />
          <ButtonAdd onPress={handleNavigateToAppointmentCreate} />
        </View>

        <CategorySelect
          selectedCategoryId={category}
          selectCategoryById={handleSelectCategory}
        />

        {loading ? (
          <Load />
        ) : (
          <>
            <ListHeader
              title="Partidas agendadas"
              subtitle={`Total ${appointments.length}`}
            />
            <FlatList
              data={appointments}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Appointment
                  data={item}
                  onPress={() => handleNavigateToAppointmentDetails(item)}
                />
              )}
              ItemSeparatorComponent={() => <ListDivider />}
              showsVerticalScrollIndicator={false}
              style={styles.matches}
              contentContainerStyle={styles.content}
            />
          </>
        )}
      </View>
      <SignOutModal visible={modalIsOpen}>
        <View style={styles.modalContent}>
          <Text style={styles.modalMessage}>
            Deseja sair do Game
            <Text style={styles.modalMessageHightlight}>Play</Text>?
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancel]}
              activeOpacity={0.7}
              onPress={() => setModalIsOpen(false)}
            >
              <Text style={styles.modalButtonText}>Não</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.confirm]}
              activeOpacity={0.7}
              onPress={signOut}
            >
              <Text style={styles.modalButtonText}>Sim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SignOutModal>
    </Background>
  );
}
