/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  DataTable,
  IconButton,
} from 'react-native-paper';
import {getAllUser} from '../services/userService';
import {View} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';

export default function ListUserScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const focus = useIsFocused();

  useEffect(() => {
    const fetchingUser = async () => {
      const users = await getAllUser();
      setData(users);
      setLoading(false);
    };

    fetchingUser();
  }, [focus]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  return (
    <DataTable>
      <Button
        mode="contained"
        onPress={async () => {
          navigation.navigate('users_add');
        }}>
        Add new user
      </Button>
      <DataTable.Header>
        <DataTable.Title>UserId</DataTable.Title>
        <DataTable.Title>Username</DataTable.Title>
        <DataTable.Title>Password</DataTable.Title>
        <DataTable.Title> </DataTable.Title>
      </DataTable.Header>

      {data.map(item => (
        <DataTable.Row key={item.userId}>
          <DataTable.Cell>{item.userId}</DataTable.Cell>
          <DataTable.Cell>{item.username}</DataTable.Cell>
          <DataTable.Cell>{item.password}</DataTable.Cell>
          <DataTable.Cell textStyle={{flexWrap: 'nowrap'}}>
            <IconButton
              icon="eye"
              iconColor={'blue'}
              size={20}
              onPress={() =>
                navigation.navigate('users_detail', {userId: item.userId})
              }
            />
          </DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
}
