import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import AddUserScreen from './src/screens/AddUser';
import ListUserScreen from './src/screens/ListUser';
import UpdateUserScreen from './src/screens/UpdateUser';
import UserDetail from './src/screens/UserDetail';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="users" component={ListUserScreen} />
          <Stack.Screen name="users_add" component={AddUserScreen} />
          <Stack.Screen name="users_update" component={UpdateUserScreen} />
          <Stack.Screen name="users_detail" component={UserDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
