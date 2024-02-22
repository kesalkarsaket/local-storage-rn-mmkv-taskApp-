import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default CustomHeader = ({showTimer}) => {
  if (!showTimer) {
    return null; // Don't render the header if showTimer is false
  }
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = () => {
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const formattedDate = () => {
    const day = currentTime.getDate().toString().padStart(2, '0');
    const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
    const year = currentTime.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Home</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.headerDate}>{formattedTime()} </Text>
        <Text style={styles.headerDate}>{formattedDate()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#121212',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,

    paddingTop: 16,
  },

  headerDate: {
    fontSize: 14,
    color: '#121212',
  },
});
