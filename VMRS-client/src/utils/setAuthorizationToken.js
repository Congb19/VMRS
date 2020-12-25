import axios from "axios";

const setAuthorizationToken = (token) => {
  //如果有token就带过去
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("bearer ok");
  } else {
    delete axios.defaults.headers.common['Authorization'];
    console.log("unbearer ok");
  }
}

export default setAuthorizationToken;