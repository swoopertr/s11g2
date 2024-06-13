import { DOMAIN } from "../constants";

export const addFriend = async (newFriend, token) => {
    try {
        const myHeaders = new Headers();
        if (token) {
            myHeaders.append("Authorization", token);
        } else {
            throw new Error("No auth token provided");
        }
        myHeaders.append("Content-Type", "application/json");

        const response = await fetch(`${DOMAIN}/api/friends`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(newFriend),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let result = await response.text()
        return JSON.parse(result.length)
    } catch (error) {

        // Handle error state or display error to the user
    }
}

export const checkEmailAvailability = async (email, token) => {
    try {
        //todo : token should be added and token should get from localstorage
        const myHeaders = new Headers();
    if (token) {
        myHeaders.append("Authorization", token);
    } else {
        throw new Error("No auth token provided");
    }
        const response = await fetch(`${DOMAIN}/api/friends/check-email`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({ email: email }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }


        let data = await response.text();
        return JSON.parse(data); //.isExists
     
    } catch (error) {
        console.error('Error checking email availability:', error.message);
        throw error;
    }
};

export const getFriends = async (token) => {
    const myHeaders = new Headers();
    if (token) {
        myHeaders.append("Authorization", token);
    } else {
        throw new Error("No auth token provided");
    }

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch(`${DOMAIN}/api/friends`, requestOptions);

        if (!response.ok) {
            throw new Error('Failed to fetch friends');
        }

        let result = await response.text();
        let newResult = JSON.parse(result);
        return newResult;
    } catch (error) {
        console.error('Error fetching friends:', error);
        throw error;
    }
};
