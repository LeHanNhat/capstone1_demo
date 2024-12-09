/* eslint-disable react-native/no-inline-styles */
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button, Card, Text } from 'react-native-paper';
import { deleteUser, getUserById } from '../services/userService';

export default function UserDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const {userId} = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchingUser = async () => {
      const user = await getUserById(userId);
      setData(user);
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
    <Card style={{flexWrap: 'nowrap'}}>
      <Card.Content>
        <Text variant="bodyMedium">User id: {userId}</Text>
        <Text variant="bodyMedium">User username: {data.username}</Text>
        <Text variant="bodyMedium">User password: {data.password}</Text>
      </Card.Content>
      <Card.Actions>
        <Button
          style={{backgroundColor: 'orange'}}
          onPress={() => {
            navigation.navigate('users_update', {userId});
          }}>
          Edit
        </Button>
        <Button
          style={{backgroundColor: 'red'}}
          onPress={async () => {
            await deleteUser(userId);
            navigation.navigate('users');
          }}>
          Delete
        </Button>
      </Card.Actions>
    </Card>
  );
}
