import axios from "axios";

function LogUserActions(operation, data) {
  const logMessage = { operation: operation, data: data };
  axios
    .post("http://localhost:3009/log/", logMessage)
    .catch((err) => console.log(err));
}

export default LogUserActions;
