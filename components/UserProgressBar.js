import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {lvlToXp} from './helpers/functions';
import ProgressBar from 'react-native-progress/Bar';
import styles from './styles/userProgressBar';

const UserProgressBar = ({loading, userData}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading && userData) {
      const newProgress =
        (userData.xp % 1000) / (lvlToXp(userData.level) / userData.level);
      setProgress(newProgress);
    }
  }, [loading, userData]);

  return (
    <View style={styles.progressContainer}>
      <Text style={styles.progressTitle}>Your Progress</Text>
      {loading ? (
        <ActivityIndicator
          style={styles.progressLoadingSpinner}
          size="small"
          color="#495057"
        />
      ) : (
        <>
          <ProgressBar
            progress={progress}
            width={null}
            height={10}
            borderRadius={5}
            color="#1b4965"
            unfilledColor="#E0E0E0"
            borderWidth={0}
            style={styles.progressBar}
            animated
          />
          <Text style={styles.progressText}>
            {userData?.xp}/{lvlToXp(userData?.level)} XP
          </Text>
        </>
      )}
    </View>
  );
};

export default UserProgressBar;
