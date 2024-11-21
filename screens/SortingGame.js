import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import {IconLeaf, IconLeafOff} from '@tabler/icons-react-native';
import {items} from './data/emojis';
import {auth} from '../firebase';
import {API_URL} from '@env';
import styles from './styles/sortingGame';

const {width, height} = Dimensions.get('window');
const midpoint = height / 3;

const bins = [
  {type: 'compost', label: 'Compost', color: 'green'},
  {type: 'trash', label: 'Not Compost', color: 'red'},
];

const SortingGame = () => {
  const [fallingItems, setFallingItems] = useState([]);
  const [points, setPoints] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [flashColor, setFlashColor] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const userEmail = auth.currentUser?.email;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/users/data?email=${userEmail}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const userData = await response.json();
        setMaxScore(userData.maxScore);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userEmail) {
      fetchUserData();
    }
  }, [userEmail]);

  const getItemSpeed = score => {
    if (score >= 50) {
      return 900;
    }
    if (score >= 45) {
      return 1200;
    }
    if (score >= 40) {
      return 1300;
    }
    if (score >= 35) {
      return 1400;
    }
    if (score >= 30) {
      return 1500;
    }
    if (score >= 25) {
      return 1600;
    }
    if (score >= 20) {
      return 2000;
    }
    if (score >= 15) {
      return 2200;
    }
    if (score >= 10) {
      return 2400;
    }
    return 2500;
  };

  useEffect(() => {
    if (gameStarted && !gameEnded) {
      const interval = setInterval(() => {
        const randomItem = items[Math.floor(Math.random() * items.length)];
        const newItem = {
          ...randomItem,
          id: Math.random().toString(),
          x: new Animated.Value(width / 2 - 35),
          y: new Animated.Value(0),
        };
        setFallingItems(prevItems => [...prevItems, newItem]);

        const itemSpeed = getItemSpeed(points);

        Animated.timing(newItem.y, {
          toValue: height - 50,
          duration: itemSpeed,
          useNativeDriver: false,
        }).start(() => {
          setFallingItems(prevItems =>
            prevItems.filter(item => item.id !== newItem.id),
          );
        });
      }, 1750);

      return () => clearInterval(interval);
    }
  }, [points, gameEnded, gameStarted]);

  const createPanResponder = item =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.moveY < midpoint) {
          item.x.setValue(gestureState.moveX - 35); // Adjusting to center the emoji
        }
        item.y.setValue(gestureState.moveY - 35); // Adjusting to center the emoji
      },
      onPanResponderRelease: (event, gestureState) => {
        const binWidth = width / 2;

        if (gestureState.moveY > midpoint) {
          let toX = width / 5 - 20; // Center the item in the middle of the left bin
          if (gestureState.moveX < binWidth) {
            toX = width / 5 - 20; // Center the item in the middle of the left bin
            if (item.type === 'compost') {
              setPoints(points + 1);
              setFlashColor('lightgreen');
            } else {
              setFlashColor('lightcoral');
              setGameEnded(true);
            }
          } else {
            toX = (3 * width) / 4; // Center the item in the middle of the right bin
            if (item.type === 'trash') {
              setPoints(points + 1);
              setFlashColor('lightgreen');
            } else {
              setFlashColor('lightcoral');
              setGameEnded(true);
            }
          }

          Animated.spring(item.x, {
            toValue: toX,
            useNativeDriver: false,
          }).start(() => {
            Animated.timing(item.y, {
              toValue: height,
              duration: 500, // Faster falling speed once past midpoint
              useNativeDriver: false,
            }).start(() => {
              setFallingItems(prevItems =>
                prevItems.filter(fallingItem => fallingItem.id !== item.id),
              );
              setTimeout(() => setFlashColor(null), 1);
            });
          });
        } else {
          Animated.spring(item.x, {
            toValue: gestureState.moveX - 10,
            useNativeDriver: false,
          }).start();

          Animated.spring(item.y, {
            toValue: gestureState.moveY - 35,
            useNativeDriver: false,
          }).start();
        }
      },
    });

  const handleBinPress = binType => {
    if (fallingItems.length === 0) {
      return;
    }

    const lastItem = fallingItems[fallingItems.length - 1];

    if (binType === 'trash') {
      Animated.spring(lastItem.x, {
        toValue: width / 5 - 50, // Center the item in the middle of the left bin
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(lastItem.y, {
          toValue: height,
          duration: 500, // Faster falling speed once past midpoint
          useNativeDriver: false,
        }).start(() => {
          setFallingItems(prevItems =>
            prevItems.filter(item => item.id !== lastItem.id),
          );
          if (lastItem.type === 'trash') {
            setPoints(points + 1);
            setFlashColor('lightgreen');
          } else {
            setFlashColor('lightcoral');
            setGameEnded(true);
          }
          setTimeout(() => setFlashColor(null), 300);
        });
      });
    } else if (binType === 'compost') {
      Animated.spring(lastItem.x, {
        toValue: (3 * width) / 4, // Center the item in the middle of the right bin
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(lastItem.y, {
          toValue: height,
          duration: 500, // Faster falling speed once past midpoint
          useNativeDriver: false,
        }).start(() => {
          setFallingItems(prevItems =>
            prevItems.filter(item => item.id !== lastItem.id),
          );
          if (lastItem.type === 'compost') {
            setPoints(points + 1);
            setFlashColor('lightgreen');
          } else {
            setFlashColor('lightcoral');
            setGameEnded(true);
          }
          setTimeout(() => setFlashColor(null), 300);
        });
      });
    }
  };

  const handleStart = () => {
    setPoints(0);
    setGameEnded(false);
    setFallingItems([]);
    setGameStarted(true);
  };

  const handleRestart = () => {
    setPoints(0);
    setGameEnded(false);
    setFallingItems([]);
  };

  useEffect(() => {
    if (points > maxScore) {
      setMaxScore(points);

      const updateMaxScore = async newMaxScore => {
        try {
          const response = await fetch(`${API_URL}/users/maxScore`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: userEmail,
              maxScore: newMaxScore,
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        } catch (error) {
          console.error('Error updating max score:', error);
        }
      };

      updateMaxScore(points);
    }
  }, [points, maxScore, userEmail]);

  return (
    <View style={styles.container}>
      {fallingItems.map(item => (
        <Animated.View
          key={item.id}
          {...createPanResponder(item).panHandlers}
          style={[
            styles.item,
            {transform: [{translateX: item.x}, {translateY: item.y}]},
          ]}>
          <Text style={styles.emoji}>{item.emoji}</Text>
        </Animated.View>
      ))}
      <View style={styles.midpointLine} />
      <View style={styles.binsContainer}>
        <TouchableOpacity
          onPress={() => handleBinPress('trash')}
          style={[styles.binSection, {backgroundColor: '#B22222'}]}>
          <IconLeafOff size={50} color="white" />
          <Text style={styles.binLabel}>{bins[1].label}</Text>
        </TouchableOpacity>
        <View
          style={[
            styles.middleSection,
            flashColor ? {backgroundColor: flashColor} : {},
          ]}>
          <Text style={styles.maxScoreText}>Max Score: {maxScore}</Text>
          <Text style={styles.pointsText}>Points: {points}</Text>
          {!gameStarted && (
            <TouchableOpacity
              onPress={handleStart}
              style={styles.restartButton}>
              <Text style={styles.restartButtonText}>Start</Text>
            </TouchableOpacity>
          )}
          {gameEnded && gameStarted && (
            <TouchableOpacity
              onPress={handleRestart}
              style={styles.restartButton}>
              <Text style={styles.restartButtonText}>Restart</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={() => handleBinPress('compost')}
          style={[styles.binSection, {backgroundColor: '#228B22'}]}>
          <IconLeaf size={50} color="white" />
          <Text style={styles.binLabel}>{bins[0].label}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SortingGame;
