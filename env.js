import Constants from "expo-constants";

const { manifest } = Constants;

//const uri = `http://${manifest.debuggerHost.split(':').shift()}:5000`;

const env = {
    api_url: 'http://127.0.0.1:5000',
}

export default env;