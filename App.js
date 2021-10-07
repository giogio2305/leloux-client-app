import React, {useState} from 'react';
import AppLoading from 'expo-app-loading';
import AsyncStorage  from '@react-native-async-storage/async-storage';
// React navigation stack
import RootStack from './navigators/RootStack';
import { CredentialsContext } from './components/CredentialsContext';
import { MenuProvider } from 'react-native-popup-menu';
import { useFonts } from 'expo-font';




export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

  const checkCredentials = () =>{
    AsyncStorage.getItem('LelouxCredentials')
    .then((result)=>{
      if(result !== null){
          setStoredCredentials(JSON.parse(result));
      }else{
            setStoredCredentials(null);
      }
    })
      .catch(error => console.log(error))

  }
  const [loaded] = useFonts({
    osbold: require('./assets/fonts/OpenSans-Bold.ttf'),
    ossemibold: require('./assets/fonts/OpenSans-SemiBold.ttf'),
    osr: require('./assets/fonts/OpenSans-Regular.ttf'),
    Kabel: require('./assets/fonts/KabelBold.otf'),
    
  });

  if (!loaded) {
    return null;
  }

  if(!appReady){
    return <AppLoading
    startAsync={checkCredentials}
    onFinish = {()=>{setAppReady(true)}}
    onError= {console.warn}
    />
  }
  return (
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
      <MenuProvider>
        <RootStack />
      </MenuProvider>
    </CredentialsContext.Provider>
  );
}
