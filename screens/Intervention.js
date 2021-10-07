import axios from 'axios';
import React,{useEffect, useContext, useState} from 'react'
import { View, Text } from 'react-native'
import { CredentialsContext } from '../components/CredentialsContext'
import Loadingscrn from '../components/Loadingscrn';
import env from '../env';


const uri = env.api_url;
const Intervention = ({navigation, route:{params}}) => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const {id} = params;
    const [Loading, setLoading] = useState(true);
    const [Data, setData] = useState(null);


    useEffect(() => {
            axios.get(uri + `/crud/uintervention/${id}`)
            .then((response)=>{setData(response.data); setLoading(false);})
            .catch(error => {setLoading(false); console.log(error)})
            .finally(()=>{setLoading(false)});
    }, )
    if(Loading){
        return(
            <Loadingscrn/>
        );
    }

    return (
        <View>
            <Text>{Data !==null ? Data.id : 'Day we dont forget'}</Text>
        </View>
    )
}

export default Intervention
