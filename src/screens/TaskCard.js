// TaskCard.js

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
export default function TaskCard({
  task,
  toggleTaskCompletion,
  deleteTask,
  navigation,
}) {
  console.log(task, 'newt');
  const handleToggleCompletion = () => {
    toggleTaskCompletion(task.id);
  };

  const handleDeleteTask = () => {
    deleteTask(task.id);
  };

  return (
    <View
      style={{
        marginHorizontal: 10,
        borderRadius: 6,
        marginTop: 10,
      }}>
      <TouchableOpacity onLongPress={handleDeleteTask}>
        <View
          style={{
            backgroundColor: task.completed ? 'lightgreen' : '#ffe4e1',
            padding: 10,
            borderRadius: 10,
            marginBottom: 10,
          }}>
          <Text>{task.title}</Text>
          <Text>{task.description}</Text>
          <TouchableOpacity onPress={handleToggleCompletion}>
            <Text style={{color: 'blue'}}>
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TaskEditing', {
                taskId: task.id,
                // tasksData: tasksData,
                // onTasksDataUpdated: updatedTasksData => {
                //   // Update tasksData with the updatedTasksData received from EditTaskScreen
                //   setTasksData(updatedTasksData);
                // },
              })
            }>
            <Text style={{color: 'blue'}}>Edit Task</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}
