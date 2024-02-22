import React, {useRef} from 'react';
import {Animated, StyleSheet, Text, View, I18nManager} from 'react-native';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const Swipable = ({children}) => {
  const swipeableRowRef = useRef(null);

  const renderLeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <RectButton style={styles.leftAction} onPress={close}>
        <AnimatedIcon
          name="archive"
          size={30}
          color="#fff"
          style={[styles.actionIcon]}
        />
      </RectButton>
    );
  };

  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <RectButton style={styles.rightAction} onPress={close}>
        <AnimatedIcon
          name="delete-forever"
          size={30}
          color="#fff"
          style={[styles.actionIcon]}
        />
      </RectButton>
    );
  };

  const close = () => {
    swipeableRowRef.current.close();
  };

  return (
    <Swipeable
      ref={swipeableRowRef}
      friction={2}
      leftThreshold={80}
      rightThreshold={41}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}>
      {children}
    </Swipeable>
  );
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

export default Swipeable;
