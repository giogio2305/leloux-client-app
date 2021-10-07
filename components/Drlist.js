import React, {useState, useEffect, useContext, useLayoutEffect} from 'react'
import { StyledContainer, InnerConatainer, PageLogo, PageSubTitle, SubTitle, StyledFormArea, LeftIcon, StyledLabel, StyledTextInput, RightIcon, StyledBtn, StyledBtnText, Msgbox, ExtraView, ExtraText, TextLink, TextLinkContent, OptIcon, EmptyArea, EmptyBadge, EmptyBadgeText, EmptyIbox, EmptyTitle, EmptySeText, NotifBadge, StyledView, StyledPopUp, StyledPopItem, StyledPopLink, Logo } from '../components/style'
import { Icon } from 'react-native-elements'
import { TouchableOpacity, View, Text, StyleSheet, Dimensions, Image, TextInput, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../components/CredentialsContext';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import EmptyState from '../components/EmptyState';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Moment from 'moment';
import 'moment/locale/fr'

import { BottomSheet } from "react-native-btr";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import Diag from '../components/addiag';
import { SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { isLoading } from 'expo-font';
import Loadingscrn from '../components/Loadingscrn';
import env from './../env';
import useFetch from './../components/useFetch'

const uri =env.api_url;

const Drlist = ({navigation, focus}) => {

    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { nom, mail, id } = storedCredentials;
    const [isLoading, setIsLoading] =useState(true)
    const [emptyPark, setEmptyPark] = useState(true);
    const [emptyDiag, setEmptyDiag] = useState(true);
    const [diagnos, setDiagnos] = useState();
    const [vehs, setVehs] = useState([]);
    


    const getPark = async () =>{
        await axios
        .get( uri+"/crud/Customers")
    .then((response) => { 
        const data = JSON.stringify(response.data.data);
        const cars = JSON.parse(data)
        setVehs(cars);
        const carsnum = cars.filter(cars => cars.owner == nom).length;
        const ccars = cars.filter(cars => cars.owner == nom);
        if(carsnum <= 0){
                setEmptyPark(true);
                setIsLoading(false);
        }else{
            setEmptyPark(false);
        }
    
    })
    .catch(error => {console.log(error);})
    }
    const getDiag = async () =>{
        axios
        .get( uri + `/crud/diagnos/${id}`)
    .then((response) => {
        const data = response.data.data;
        const diagsnum = data.length;
        if(diagsnum <= 0){
                setEmptyDiag(true);
                setIsLoading(false);
        }else{
            setEmptyDiag(false);
            setDiagnos(data)
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
            
        }
    
    })
    .catch(error => {console.log(error);})
    }
    useEffect(async() => {
        await getPark();
        await getDiag();
   
        /*if(!emptyDiag){
            const interval=setInterval(()=>{
           getDiag()
          },10000)
            
            
          return()=>clearInterval(interval)
       }*/
    }, [focus])

    Moment.locale('fr');
    if(isLoading){
        return( <Loadingscrn/>)
     }
    return (
        <View style={{
            flex:1,
            backgroundColor: '#fff'
        }}>
                {!emptyPark && emptyDiag && <>
                    <StyledContainer>
            <InnerConatainer>
                    <EmptyState
                        pagetitle="Diagnostic"
                        icon="construct-outline"
                        maintitle="Vous suspectez une panne ?"
                        des="Diagnostiquez votre véhicule pour en etre sure"
                    />
                    <StyledBtn onPress={()=>{navigation.navigate('adddiag')}}>
                        <StyledBtnText>
                            Soliciter un Diagnostic
                        </StyledBtnText>
                    </StyledBtn>
                    </InnerConatainer>
                    </StyledContainer>
                    </>
                }
                
            {emptyPark && !emptyDiag &&<>
                <EmptyState
                pagetitle ="Parking"
                icon= "car-sport-outline"
                maintitle= "Votre parking semble vide"
                des="Remplissez le en ajoutant vos vehicules"
                />

                <View style={{paddingHorizontal: 48}}>
                        <StyledBtn onPress={()=>{navigation.navigate("addcar")}}>
                        <StyledBtnText>
                        Ajouter un Véhicule
                        </StyledBtnText>
                    </StyledBtn>
                    </View>
                    </>
            }
                {!emptyPark && !emptyDiag && 
                    <View>
                        <View  style={{
                            padding: 20,
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                fontFamily: 'ossemibold',
                                color: '#484848',
                                fontSize: 22.33,
                            }}>Bienvenue sur <Text style={{
                                fontFamily: 'Kabel',
                                color: '#707cbd',
                                fontSize: 26.66
                            }}>LeLoux</Text></Text> 
                        </View>
                        <View style={{
                                    paddingHorizontal: '4%',
                                    marginTop: 28,
                                    marginBottom: 28,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                        }}>


                <Pressable style={{
                                    padding: 16,
                            backgroundColor: '#7e89c4',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 8,
                            color: '#fff',
                            
                }}
                onPress={() => navigation.navigate('adddiag') }
                >

                    <Text style={{fontFamily: 'ossemibold',fontSize:14, color: '#fff',}}>Nouveau diagnostic</Text>
                </Pressable>

        </View>
                            <FlatList
                                    data ={diagnos}
                                    Extradata= {diagnos}
                                    renderItem = {({item, index})=>{
                                        return (
                                        <TouchableOpacity style={{        
                                            padding: 16,
                                            marginBottom: 20,
                                            flexDirection: 'row',
                                        }}
                                            key={item.id}
                                            onPress={()=> navigation.navigate('diagno', item)}
                                            >
                                                <View
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    borderRadius: 8,
                                                    backgroundColor: '#e2e5f2',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginRight: 20,
                                                }}
                                                >
                                                <Icon color="#707cbd" type='ionicon' name='reader-outline' size={32} />
                                                </View>
                                                <View>
                    
                                            <Text style={{fontSize:17.33, color: '#484848',fontFamily: 'osbold'}}>Demande de diagnostic {item.id}</Text>
                                            <Text style={{fontSize:13, color: '#6a6c7b',fontFamily:'osr'}}>Systeme suspecté : {item.syst}</Text>
                                            <Text style={{fontSize:10, color: '#6a6c7b',fontFamily:'osr'}}>{ Moment(item.createdAt).format('ddd Do MMM YYYY, HH:mm ')}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        )
                                    }}
                                    keyExtractor={item=>item.id.toString()}
                                    contentContainerStyle={{
                                        alignItems:'center',
                                        justifyContent:'center',
                                        padding: 20
                                    }}
                                    />
                    </View>
                                    
                }
        </View>
            
    )
}

export default Drlist
