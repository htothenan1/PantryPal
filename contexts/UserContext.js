import React, {createContext, useState, useEffect} from 'react';
import {auth} from '../firebase';
import {sortItems} from '../screens/helpers/functions';
import {API_URL} from '@env';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [userData, setUserData] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemsLoading, setIsItemsLoading] = useState(true);

  const fetchUserData = async userEmail => {
    try {
      const response = await fetch(`${API_URL}/users/data?email=${userEmail}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchItems = async userEmail => {
    try {
      if (!userEmail) {
        console.error('User email is not available');
        setIsItemsLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/items?email=${userEmail}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const sortedItems = sortItems(data);

      setItems(sortedItems);
    } catch (error) {
      console.error('Error fetching items:', error.message);
    } finally {
      setIsItemsLoading(false);
    }
  };

  useEffect(() => {
    const userEmail = auth.currentUser?.email;
    if (userEmail) {
      fetchUserData(userEmail);
      fetchItems(userEmail);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        fetchUserData,
        items,
        setItems,
        fetchItems,
        loading,
        itemsLoading,
      }}>
      {children}
    </UserContext.Provider>
  );
};