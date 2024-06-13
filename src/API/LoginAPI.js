import { DOMAIN } from "../constants";

export const login = async (credentials) => {
    try {
        const response = await fetch(`${DOMAIN}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        let result = await response.text()
        return JSON.parse(result);

    } catch (e) {
        console.log('login error', e)
    }
}