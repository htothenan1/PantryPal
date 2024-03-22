import React, {useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import {auth} from '../firebase';
import styles from './styles/insights';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';
import {BarChart} from 'react-native-chart-kit';

const Insights = () => {
  const [loading, setLoading] = useState(true);
  const [wastedItems, setWastedItems] = useState([]);
  const [consumedItems, setConsumedItems] = useState([]);

  const userEmail = auth.currentUser?.email;
  const API_URL = 'https://flavr-413021.ue.r.appspot.com/';

  useFocusEffect(
    React.useCallback(() => {
      if (userEmail) {
        const fetchUserData = async () => {
          try {
            setLoading(true);
            await fetchItemsData(userEmail);
          } catch (error) {
            console.error('Error fetching user data:', error.message);
          } finally {
            setLoading(false);
          }
        };

        const fetchItemsData = async emailString => {
          try {
            const response = await fetch(
              `${API_URL}/items/useremail/${emailString}`,
            );
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const res = await response.json();
            setWastedItems(res.wastedItems);
            setConsumedItems(res.consumedItems);
          } catch (error) {
            console.error('Error fetching items data:', error.message);
          }
        };

        fetchUserData();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  const consumedLabels = consumedItems.slice(0, 5).map(item => item.name);
  const consumedData = consumedItems.slice(0, 5).map(item => item.frequency);
  const wastedLabels = wastedItems.slice(0, 5).map(item => item.name);
  const wastedData = wastedItems.slice(0, 5).map(item => item.frequency);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#495057" />
      ) : (
        <>
          <View style={styles.chartContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Top 5 Consumed Items</Text>
              <AntDesignIcon
                style={styles.headerIcon}
                name="like2"
                size={20}
                color="green"
              />
            </View>
            <BarChart
              data={{
                labels: consumedLabels,
                datasets: [{data: consumedData}],
              }}
              width={Dimensions.get('window').width - 30}
              height={300}
              yAxisLabel=""
              chartConfig={chartConfig}
              verticalLabelRotation={30}
              fromZero={true}
              withInnerLines={false}
            />
          </View>

          <View style={styles.chartContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Top 5 Wasted Items</Text>

              <AntDesignIcon
                style={styles.headerIcon}
                name="dislike2"
                size={20}
                color="red"
              />
            </View>
            <BarChart
              data={{
                labels: wastedLabels,
                datasets: [{data: wastedData}],
              }}
              width={Dimensions.get('window').width - 30}
              height={300}
              yAxisLabel=""
              chartConfig={chartConfig}
              verticalLabelRotation={30}
              fromZero={true}
              withInnerLines={false}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Insights;
