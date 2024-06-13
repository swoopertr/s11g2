import React, { useState, useContext, useEffect  } from 'react';
import { addFriend, checkEmailAvailability } from '../API/FriendFn';
import { LoginContext } from '../contexts/LoginProvider';
import { useHistory } from 'react-router-dom';


const AddFriendForm = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [friendSince, setFriendSince] = useState('');
    const [emailAvailable, setEmailAvailable] = useState(true);

    const { storage } = useContext(LoginContext);
    
    const history = useHistory()
    useEffect(() => {
        const isLoginFromLoco = storage?.token;
        if(!isLoginFromLoco){
            history.push("/login")
        }
      }, []);


    
    const handleSubmit = async event => {
        event.preventDefault();

        const newFriend = {
            name,
            age,
            email,
            friendSince,
        };

        try {
            const isAvailable = await checkEmailAvailability(email, storage?.token);

            if (!isAvailable) {
               
                alert('Email is already registered. Please use a different email.');
                return;
            }
            
            // Proceed with adding friend if email is available
            await addFriend(newFriend, storage?.token);

            console.log('New friend added successfully:', newFriend);

            // Reset form inputs after successful submission
            setName('');
            setAge('');
            setEmail('');
            setFriendSince('');
            history.push("/friends")
        } catch (error) {
            console.error('Error adding new friend:', error.message);
            // Handle error state or display error message to the user
        }
    };


    return (
        <div className="AddFriendFormContainer">
            <h1>Add Friend</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="age">Age:</label>
                    <input type="number" id="age" value={age} onChange={e => setAge(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="friendSince">Friend Since:</label>
                    <input type="date" id="friendSince" value={friendSince} onChange={e => setFriendSince(e.target.value)} required />
                </div>
                <button type="submit">Add Friend</button>
            </form>
        </div>
    );
};

export default AddFriendForm;
