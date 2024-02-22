import React, {useState, useEffect} from 'react';
import {View, TextInput, Button} from 'react-native';
import {useTasks} from '../store/TaskContext';

export default function EditTaskScreen({route, navigation}) {
  const {taskId} = route.params;
  // const [taskDetails, setTaskDetails] = useState({
  //   title: '',
  //   description: '',
  // });
  // Find the task with the matching taskId
  const {tasksData} = useTasks(); // Access tasksData and setTasksData from the context
  const task = tasksData.find(task => task.id === taskId);
  console.log(tasksData.id, 'tasking');

  // Initialize taskDetails with the task details if found
  const [taskDetails, setTaskDetails] = useState(
    task ? {...task} : {title: '', description: ''},
  );

  useEffect(() => {
    // Update taskDetails if taskId changes
    const task = tasksData.find(task => task.id === taskId);
    if (task) {
      setTaskDetails({...task});
    }
  }, [taskId, tasksData]);
  // useEffect(() => {
  //   // Find the task with the matching taskId
  //   const task = tasksData.find(task => task.id === taskId);
  //   if (task) {
  //     setTaskDetails(task);
  //   }
  // }, [taskId, tasksData]);

  const handleSave = () => {
    // Pass the updated task details back to the Home screen
    if (route.params && route.params.onTaskUpdated) {
      route.params.onTaskUpdated(taskDetails);
    }
    navigation.navigate('Home');
  };

  const handleChange = (field, value) => {
    setTaskDetails(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          margin: 10,
          padding: 5,
        }}
        onChangeText={text => handleChange('title', text)}
        value={taskDetails.title}
        placeholder="Title"
      />
      <TextInput
        style={{
          height: 100,
          borderColor: 'gray',
          borderWidth: 1,
          margin: 10,
          padding: 5,
        }}
        onChangeText={text => handleChange('description', text)}
        value={taskDetails.description}
        placeholder="Description"
        multiline={true}
      />
      {/* Add more input fields for other task details */}
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}
