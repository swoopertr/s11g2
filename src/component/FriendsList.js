import React, { useState, useEffect, useContext } from "react";
import { getFriends } from "../API/FriendFn";
import { LoginContext } from "../contexts/LoginProvider";
import { useHistory } from "react-router-dom";

function FriendsList() {
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState("");

  const { login, setLogin, storage } = useContext(LoginContext);

  const history = useHistory();
  useEffect(() => {
    if (!storage?.token) {
      history.push("/login"); //redirection to the login page if token is not found
    } else {
      fetchFriends();
    }
  }, []);

  const fetchFriends = async () => {
    try {
      const token = storage?.token; // storage'dan token'ı alın
      if (!token) {
        throw new Error("No auth token found");
      }
      const friendsList = await getFriends(token); // getFriends fonksiyonuna token'ı parametre olarak geçin
      setFriends(friendsList);
    } catch (error) {
      console.error("Failed to fetch friends", error);
    }
  };

  return (
    <div>
      <h3>Friends List</h3>
      <ul>
        {friends.map((friend, index) => (
          <li key={index}>{friend.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default FriendsList;
