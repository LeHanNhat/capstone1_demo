/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { createUser } from '../services/userService';
import { useNavigation } from '@react-navigation/native';

export default function AddUserScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = async () => {
    await createUser(username, password);
    navigation.navigate('users');
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
      <TextInput label="Username" value={username} onChangeText={setUsername} />
      <TextInput label="Password" value={password} onChangeText={setPassword} />
      <Button mode='outlined' onPress={handleClick}>Add User</Button>
    </View>
  );
}
