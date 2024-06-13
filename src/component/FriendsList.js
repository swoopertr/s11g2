import React, { useState, useEffect, useContext } from 'react';
import { getFriends } from '../API/FriendFn';
import { LoginContext } from '../contexts/LoginProvider';


const FriendsList = () => {
    const [friends, setFriends] = useState([]);
    const [newFriend, setNewFriend] = useState('');
    
    const { login, setLogin, storage } = useContext(LoginContext);

    useEffect(() => {
        fetchFriends();
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
            console.error('Failed to fetch friends', error);
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