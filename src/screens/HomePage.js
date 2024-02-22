// // HomeScreen.js

import TaskCard from './TaskCard';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  Button,
  SafeAreaView,
  StyleSheet,
  Animated,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {TaskStore} from '../../utils/TaskStore';
import {RectButton} from 'react-native-gesture-handler';

export default function HomePage({navigation}) {
  const [tasksData, setTasksData] = useState([
    {id: 1, title: 'Task 1', description: 'Description 1', completed: false},
    {id: 2, title: 'Task 2', description: 'Description 2', completed: false},
  ]);
  useEffect(() => {
    const storedData = TaskStore.getData();
    console.log(storedData, 'stored');
    if (storedData && storedData.length > 0) {
      setTasksData(storedData);
    }
  }, []);
  const toggleTaskCompletion = taskId => {
    setTasksData(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? {...task, completed: !task.completed} : task,
      ),
    );
  };

  const deleteTask = taskId => {
    const newTodos = tasksData.filter(todo => todo.id !== taskId);
    TaskStore.saveData(newTodos);
    setTasksData(newTodos);
  };

  // Update storage whenever tasksData changes
  useEffect(() => {
    TaskStore.saveData(tasksData);
  }, [tasksData]);

  const swipeableRowRef = useRef(null);

  const renderRightActions = (progress, dragX, taskId) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <RectButton
        style={styles.rightAction}
        onPress={() => {
          deleteTask(taskId);
        }}>
        <Animated.Text onPress={() => deleteTask(taskId)}>Delete</Animated.Text>
      </RectButton>
    );
  };

  const close = () => {
    swipeableRowRef.current.close();
  };

  const styles = StyleSheet.create({
    leftAction: {
      flex: 1,
      backgroundColor: '#497AFC',
      justifyContent: 'center',
    },
    rightAction: {
      flex: 1,
      backgroundColor: '#dd2c00',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    actionIcon: {
      width: 30,
      marginHorizontal: 10,
    },
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#e8c8e8',
        marginTop: 20,
      }}>
      <View>
        <FlatList
          data={tasksData}
          renderItem={({item}) => {
            return (
              <Swipeable renderRightActions={renderRightActions}>
                <TaskCard
                  task={item}
                  toggleTaskCompletion={toggleTaskCompletion}
                  deleteTask={id => {
                    deleteTask(id);
                  }}
                  navigation={navigation}
                />
              </Swipeable>
            );
          }}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <View
        style={{
          marginHorizontal: 10,
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
          borderRadius: 10,
        }}>
        <Button
          title="Create Task"
          onPress={() =>
            navigation.navigate('TaskCreation', {
              onTaskCreated: newTask => {
                setTasksData(prevTasks => [...prevTasks, newTask]);
              },
            })
          }
        />
      </View>
    </SafeAreaView>
  );
}
