import React, {createContext, useState, useEffect} from 'react';
import {auth} from '../firebase';
import {sortItems} from '../screens/helpers/functions';
import {API_URL} from '@env';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [userData, setUserData] = useState(null);
  const [items, setItems] = useState([]);
  const [pantryItems, setPantryItems] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [importedRecipes, setImportedRecipes] = useState([]);
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
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error.message);
    } finally {
      setIsItemsLoading(false);
    }
  };

  const fetchPantryItems = async userEmail => {
    try {
      if (!userEmail) {
        console.error('User email is not available');
        return;
      }

      const response = await fetch(`${API_URL}/pantryItems?email=${userEmail}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPantryItems(data);
    } catch (error) {
      console.error('Error fetching pantry items:', error.message);
    }
  };

  const fetchFavoriteRecipes = async userEmail => {
    try {
      const response = await fetch(`${API_URL}/favorites/user/${userEmail}`);
      if (!response.ok) {
        throw new Error('Failed to fetch favorite recipes');
      }
      const data = await response.json();
      setFavoriteRecipes(data);
    } catch (error) {
      console.error('Error fetching favorite recipes:', error.message);
    }
  };

  const fetchImportedRecipes = async userEmail => {
    try {
      const response = await fetch(
        `${API_URL}/importedRecipes?email=${userEmail}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch imported recipes');
      }
      const data = await response.json();
      setImportedRecipes(data);
    } catch (error) {
      console.error('Error fetching imported recipes:', error.message);
    }
  };

  useEffect(() => {
    const userEmail = auth.currentUser?.email;
    if (userEmail) {
      fetchUserData(userEmail);
      fetchItems(userEmail);
      fetchPantryItems(userEmail);
      fetchFavoriteRecipes(userEmail);
      fetchImportedRecipes(userEmail);
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
        pantryItems,
        setPantryItems,
        fetchPantryItems,
        favoriteRecipes,
        setFavoriteRecipes,
        fetchFavoriteRecipes,
        importedRecipes,
        setImportedRecipes,
        fetchImportedRecipes,
        loading,
        itemsLoading,
      }}>
      {children}
    </UserContext.Provider>
  );
};
