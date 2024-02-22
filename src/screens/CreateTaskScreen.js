// TaskCreationScreen.js

import React, {useState} from 'react';
import {View, Button, TextInput, SafeAreaView} from 'react-native';
import {useTasks} from '../store/TaskContext';

export default function CreateTaskScreen({navigation, route}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const {tasksData, setTasksData} = useTasks(); // Access tasksData and setTasksData from the context

  const handleSave = () => {
    // Pass the new task data back to the Home screen
    const newTask = {
      id: Math.floor(Math.random() * 500), // Generate a unique ID for the new task
      title: title,
      description: description,
      completed: false,
    };

    // Pass the new task data back to the Home screen
    if (route.params && route.params.onTaskCreated) {
      route.params.onTaskCreated(newTask);
    }
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#e8c8e8',
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View style={{padding: 20}}>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
          }}
          placeholder="Task Title"
          onChangeText={text => setTitle(text)}
          value={title}
        />
        <TextInput
          style={{
            height: 100,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
          }}
          placeholder="Task Description"
          onChangeText={text => setDescription(text)}
          value={description}
          multiline
        />
        <View
          style={{
            alignSelf: 'center',
            borderRadius: 10,
          }}>
          <Button title="Save" onPress={handleSave} />
        </View>
      </View>
    </SafeAreaView>
  );
}
