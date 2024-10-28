/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useState} from 'react';
import {Alert, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {createUser} from '../services/userService';

export default function AddUserScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = async () => {
    const newUser = await createUser(username, password);
    Alert.alert('New User', newUser.toString());
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
      <TextInput label="Username" value={username} onChangeText={setUsername} />
      <TextInput label="Password" value={password} onChangeText={setPassword} />
      <Button onPress={handleClick}>Add User</Button>
    </View>
  );
}
