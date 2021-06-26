import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../services/api';
import { COLLECTION_USER } from '../configs/storage';

const { REDIRECT_URI } = process.env;
const { SCOPE } = process.env;
const { RESPONSE_TYPE } = process.env;
const { CLIENT_ID } = process.env;
const { CDN_IMAGE } = process.env;

type User = {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  token: string;
};

type AuthContextData = {
  user: User;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    error?: string;
  };
};

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  async function signIn() {
    try {
      setLoading(true);

      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === 'success' && !params.error) {
        api.defaults.headers.authorization = `Bearer ${params.access_token}`;

        const { data } = await api.get('/users/@me');

        const firstName = data.username.split(' ')[0];
        data.avatar = `${CDN_IMAGE}/avatars/${data.id}/${data.avatar}.png`;

        const userData = { ...data, firstName, token: params.access_token };

        await AsyncStorage.setItem(COLLECTION_USER, JSON.stringify(userData));
        setUser(userData);
      }
    } catch {
      throw new Error("It wasn't possible to authenticate");
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(COLLECTION_USER);
  }

  async function loadUserStororageData() {
    const storage = await AsyncStorage.getItem(COLLECTION_USER);

    if (storage) {
      const currentUser = JSON.parse(storage) as User;
      api.defaults.headers.authorization = `Bearer ${currentUser.token}`;

      setUser(currentUser);
    }
  }

  useEffect(() => {
    loadUserStororageData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
