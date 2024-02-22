// TaskContext.js
import React, {createContext, useContext, useEffect, useState} from 'react';
import {TaskStore} from '../../utils/TaskStore';

const TaskContext = createContext();

export const TaskProvider = ({children}) => {
  const [tasksData, setTasksData] = useState([]);
  useEffect(() => {
    setTasksData(TaskStore.getData());
  }, []);

  return (
    <TaskContext.Provider value={{tasksData, setTasksData}}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
