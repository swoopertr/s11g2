import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    //Delete local storage
    localStorage.removeItem("token");

    //Redirect to login page
    history.push("/login");
  }, []);

  return null;
};

export default Logout;
