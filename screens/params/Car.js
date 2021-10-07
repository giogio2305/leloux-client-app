import axios from 'axios';
import React, {useState, useContext, useEffect} from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { CredentialsContext } from './../../components/CredentialsContext';
import env from '../../env';
import Loadingscrn from '../../components/Loadingscrn';
import hr from '../../assets/Electric car-rafiki.png';
import { Icon } from 'react-native-elements'

const uri = env.api_url;

const Car = ({navigation, route: {params} }) => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const {id} = params;
    const [Loading, setLoading] = useState(true);
    const [Data, setData] = useState(null);

    useEffect(() => {
        axios.get(uri + `/crud/customer/${id}`)
        .then((response)=>{setData(response.data); setLoading(false); })
        .catch(error=>{setLoading(false); console.log(error)})
        .finally(()=>{setLoading(false)})
    }, )
    if(Loading){
        return (
            <Loadingscrn/>
        );
    }
    return (
            <View style={styles.container}>
                <View style={styles.hrc}>
                    <Image resizeMode='cover'  style={styles.hero} source={hr}/>
                </View>

            <View>
            <Text style={styles.hdt}>{Data.marque} {Data.modele}</Text>
        <View style={styles.od}>
            <Icon color="#707cbd" type='ionicon' name='options-outline' size={16} />
            <Text style={styles.dt}>{Data.immat}</Text>
        </View>
                <View style={styles.od}>
            <Icon color="#707cbd" type='ionicon' name='options-outline' size={16} />
            <Text style={styles.dt}>{Data.chassis}</Text>
        </View>
               <View style={styles.od}>
            <Icon color="#707cbd" type='ionicon' name='car-outline' size={16} />
            <Text style={styles.dt}>{Data.carb}</Text>
        </View>
               <View style={styles.od}>
            <Icon color="#707cbd" type='ionicon' name='car-outline' size={16} />
            <Text style={styles.dt}>{Data.trans}</Text>
        </View>
                       <View style={styles.od}>
            <Icon color="#707cbd" type='ionicon' name='time-outline' size={16} />
            <Text style={styles.dt}>{Data.year}</Text>
        </View>
                </View>

        </View>
    )
}

export default Car

const styles = StyleSheet.create({
 container: {
     flex: 1,
     backgroundColor: '#fff',
    padding: 20,
 },
 hrc: {
     margin: 12,
    width: '100%',
    height: Dimensions.get('screen').height / 2, 
 },
 hero: {
     width: '100%',
     height: '100%',
},
hdt: {
    fontFamily: 'osbold',
    margin: 16,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: -0.41,
    lineHeight: 34.5,
},
od: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
},
dt: {
    fontFamily: 'ossemibold',
    fontSize: 13,
    letterSpacing: 0.5,
    fontWeight: 600,
    margin: 6,
},
})
