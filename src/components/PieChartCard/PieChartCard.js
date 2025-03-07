// src/components/PieChartCard/PieChartCard.js
import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import styles from './PieChartCard.styles';

const { width } = Dimensions.get('window');

const PieChartCard = ({ data, title }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <PieChart
          data={data}
          width={width - 40}
          height={200}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    </View>
  );
};

export default PieChartCard;