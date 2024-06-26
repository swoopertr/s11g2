import './App.css';
import AddFriendForm from './component/addFriendComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './component/Login'; //Import Login component
import FriendsList from './component/FriendsList';
import { useContext, useEffect } from "react";
import { LoginContext } from "./contexts/LoginProvider";


function App() {
    const { login, setLogin, storage } = useContext(LoginContext);

    useEffect(() => {

        if (storage?.token) {
            setLogin(true)
        }
    }, [])

    return (
        <Router>
            <div className="App">
                <h1>Client Auth Projesi: Friends</h1>
            </div>
            <Switch>
                <Route path="/friends/add">
                    <AddFriendForm />
                </Route>
                <Route path="/friends">
                    <FriendsList />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/">
                    <Login />
                </Route>
            </Switch>
        </Router>
    );
}
export default App;