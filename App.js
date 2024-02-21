import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from './src/screens/HomePage';
import CreateTaskScreen from './src/screens/CreateTaskScreen';
import EditTaskScreen from './src/screens/EditTaskScreen';
import CustomHeader from './src/screens/CustomHeader';
import {TaskProvider} from './src/store/TaskContext';

const Stack = createStackNavigator();
function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{header: () => <CustomHeader showTimer={true} />}}
          />
          <Stack.Screen name="TaskCreation" component={CreateTaskScreen} />
          <Stack.Screen name="TaskEditing" component={EditTaskScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}

export default App;
