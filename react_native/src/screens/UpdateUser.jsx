/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {getUserById, updateUser} from '../services/userService';
import {Alert, View} from 'react-native';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function UpdateUserScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const {userId} = route.params;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  const handleClick = async () => {
    const newUser = await updateUser(userId, {username, password});
    Alert.alert('New User', newUser);
    navigation.navigate('users');
  };

  useEffect(() => {
    const fetchingUser = async () => {
      const user = await getUserById(userId);
      setUsername(user.username);
      setPassword(user.password);
      setLoading(false);
    };

    fetchingUser();
  }, [userId]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <TextInput label="Username" value={username} onChangeText={setUsername} />
      <TextInput label="Password" value={password} onChangeText={setPassword} />
      <Button onPress={handleClick}>Add User</Button>
    </View>
  );
}
