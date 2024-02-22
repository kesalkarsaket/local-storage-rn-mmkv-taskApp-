import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const saveData = data => {
  storage.set('data', JSON.stringify(data));
};
const getData = () => {
  const data = storage.getString('data');
  return data ? JSON.parse(data) : [];
};
export const TaskStore = {
  saveData,
  getData,
};
