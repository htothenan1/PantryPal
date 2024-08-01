import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import {IconLeaf, IconLeafOff} from '@tabler/icons-react-native';

import {auth} from '../firebase'; // Update this path based on your actual file structure
import {API_URL} from '@env'; // Ensure you have this set up in your environment

const {width, height} = Dimensions.get('window');
const midpoint = height / 3;
const lineHeight = midpoint / 3;

const bins = [
  {type: 'compost', label: 'Compost', color: 'green'},
  {type: 'trash', label: 'Not Compost', color: 'red'},
];

const items = [
  // Food Emojis
  {id: 1, type: 'compost', emoji: '🍇'},
  {id: 2, type: 'compost', emoji: '🍈'},
  {id: 3, type: 'compost', emoji: '🍉'},
  {id: 4, type: 'compost', emoji: '🍊'},
  {id: 5, type: 'compost', emoji: '🍋'},
  {id: 6, type: 'compost', emoji: '🍌'},
  {id: 7, type: 'compost', emoji: '🍍'},
  {id: 8, type: 'compost', emoji: '🍎'},
  {id: 9, type: 'compost', emoji: '🍏'},
  {id: 10, type: 'compost', emoji: '🍐'},
  {id: 11, type: 'compost', emoji: '🍑'},
  {id: 12, type: 'compost', emoji: '🍒'},
  {id: 13, type: 'compost', emoji: '🍓'},
  {id: 14, type: 'compost', emoji: '🫐'},
  {id: 15, type: 'compost', emoji: '🥝'},
  {id: 16, type: 'compost', emoji: '🍅'},
  {id: 17, type: 'compost', emoji: '🫒'},
  {id: 18, type: 'compost', emoji: '🥥'},
  {id: 19, type: 'compost', emoji: '🥑'},
  {id: 20, type: 'compost', emoji: '🍆'},
  {id: 21, type: 'compost', emoji: '🥔'},
  {id: 22, type: 'compost', emoji: '🥕'},
  {id: 23, type: 'compost', emoji: '🌽'},
  {id: 24, type: 'compost', emoji: '🌶️'},
  {id: 25, type: 'compost', emoji: '🫑'},
  {id: 26, type: 'compost', emoji: '🥒'},
  {id: 27, type: 'compost', emoji: '🥬'},
  {id: 28, type: 'compost', emoji: '🥦'},
  {id: 29, type: 'compost', emoji: '🧄'},
  {id: 30, type: 'compost', emoji: '🧅'},
  {id: 31, type: 'compost', emoji: '🍄'},
  {id: 32, type: 'compost', emoji: '🥜'},
  {id: 33, type: 'compost', emoji: '🌰'},
  {id: 34, type: 'compost', emoji: '🍞'},
  {id: 35, type: 'compost', emoji: '🥐'},
  {id: 36, type: 'compost', emoji: '🥖'},
  {id: 37, type: 'compost', emoji: '🥨'},
  {id: 38, type: 'compost', emoji: '🥯'},
  {id: 39, type: 'compost', emoji: '🫓'},
  {id: 40, type: 'compost', emoji: '🧇'},

  // Non-Food Emojis
  {id: 41, type: 'trash', emoji: '💻'},
  {id: 42, type: 'trash', emoji: '📱'},
  {id: 43, type: 'trash', emoji: '🖥️'},
  {id: 44, type: 'trash', emoji: '📺'},
  {id: 45, type: 'trash', emoji: '📷'},
  {id: 46, type: 'trash', emoji: '🎥'},
  {id: 47, type: 'trash', emoji: '🕹️'},
  {id: 48, type: 'trash', emoji: '🎮'},
  {id: 49, type: 'trash', emoji: '🎧'},
  {id: 50, type: 'trash', emoji: '💡'},
  {id: 51, type: 'trash', emoji: '🔌'},
  {id: 52, type: 'trash', emoji: '🔋'},
  {id: 53, type: 'trash', emoji: '🧯'},
  {id: 54, type: 'trash', emoji: '🛠️'},
  {id: 55, type: 'trash', emoji: '🧰'},
  {id: 56, type: 'trash', emoji: '🪛'},
  {id: 57, type: 'trash', emoji: '🛒'},
  {id: 58, type: 'trash', emoji: '🔑'},
  {id: 59, type: 'trash', emoji: '🗝️'},
  {id: 60, type: 'trash', emoji: '🔓'},
  {id: 61, type: 'trash', emoji: '🔒'},
  {id: 62, type: 'trash', emoji: '🚪'},
  {id: 63, type: 'trash', emoji: '🏠'},
  {id: 64, type: 'trash', emoji: '🛏️'},
  {id: 65, type: 'trash', emoji: '🛋️'},
  {id: 66, type: 'trash', emoji: '🚽'},
  {id: 67, type: 'trash', emoji: '🚿'},
  {id: 68, type: 'trash', emoji: '🛁'},
  {id: 69, type: 'trash', emoji: '🪣'},
  {id: 70, type: 'trash', emoji: '🧼'},
  {id: 71, type: 'trash', emoji: '🧽'},
  {id: 72, type: 'trash', emoji: '🧹'},
  {id: 73, type: 'trash', emoji: '🧺'},
  {id: 74, type: 'trash', emoji: '🧻'},
  {id: 75, type: 'trash', emoji: '🪠'},
  {id: 76, type: 'trash', emoji: '🧯'},
  {id: 77, type: 'trash', emoji: '🗑️'},
  {id: 78, type: 'trash', emoji: '🚬'},
  {id: 79, type: 'trash', emoji: '🪑'},
  {id: 80, type: 'trash', emoji: '🛍️'},
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
    if (score >= 35) return 1000;
    if (score >= 30) return 1500;
    if (score >= 25) return 2000;
    if (score >= 20) return 2500;
    if (score >= 15) return 3000;
    if (score >= 10) return 3500;
    return 3700;
  };

  useEffect(() => {
    if (gameStarted && !gameEnded) {
      const interval = setInterval(() => {
        const randomItem = items[Math.floor(Math.random() * items.length)];
        const newItem = {
          ...randomItem,
          id: Math.random().toString(),
          x: new Animated.Value(width / 2 - 35), // Center horizontally
          y: new Animated.Value(0),
        };
        setFallingItems(prevItems => [...prevItems, newItem]);

        const itemSpeed = getItemSpeed(points);

        Animated.timing(newItem.y, {
          toValue: height,
          duration: itemSpeed,
          useNativeDriver: false,
        }).start(() => {
          setFallingItems(prevItems =>
            prevItems.filter(item => item.id !== newItem.id),
          );
        });
      }, 2000);

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
          let toX = width / 3;
          if (gestureState.moveX < binWidth) {
            toX = 0;
            if (item.type === 'compost') {
              setPoints(points + 1);
              setFlashColor('lightgreen');
            } else {
              setFlashColor('lightcoral');
              setGameEnded(true);
            }
          } else {
            toX = width - 200; // Reduced the distance to drift less
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
              setTimeout(() => setFlashColor(null), 300);
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
    if (fallingItems.length === 0) return;

    const lastItem = fallingItems[fallingItems.length - 1];

    if (binType === 'trash') {
      Animated.spring(lastItem.x, {
        toValue: 0,
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
        toValue: width - 80, // Reduced the distance to drift less
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
          {/* <AntDesignIcon name="delete" size={50} color="white" /> */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  pointsContainer: {
    position: 'absolute',
    top: 50,
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  pointsText: {
    fontFamily: 'Avenir-Book',
    fontSize: 18, // Reduced font size
  },
  maxScoreText: {
    fontFamily: 'Avenir-Book',
    fontSize: 18, // Reduced font size
  },
  binsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'space-between', // Ensures bins are on the far left and right
    alignItems: 'center',
  },
  middleSection: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  binSection: {
    width: width / 3.5,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  binLabel: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
  },
  emptySpace: {
    width: width / 2.5,
    height: 100,
  },
  item: {
    position: 'absolute',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 50,
  },
  midpointLine: {
    position: 'absolute',
    top: lineHeight,
    width: '100%',
    height: 1,
    borderColor: 'black',
  },
  restartButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#1b4965',
    borderRadius: 10,
  },
  restartButtonText: {
    color: '#fff',
    fontFamily: 'Avenir-Book',
    fontSize: 16,
  },
});

export default SortingGame;
