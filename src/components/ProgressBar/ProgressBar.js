import React from 'react';
import { View } from 'react-native';
import * as Progress from 'react-native-progress';
import styles from './ProgressBar.styles';

const ProgressBar = ({ progress, color }) => {
  return (
    <View style={styles.progressBarContainer}>
      <Progress.Bar
        progress={progress}
        width={null}
        height={10}
        color={color}
        style={styles.progressBar}
      />
    </View>
  );
};

export default ProgressBar;