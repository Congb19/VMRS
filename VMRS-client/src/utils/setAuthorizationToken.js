import axios from "axios";

const setAuthorizationToken = (token) => {
  //如果有token就带过去
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export default setAuthorizationToken;