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

const Dlist = ({ navigation }) => {

    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { nom, mail } = storedCredentials;
    const [emptyInt, setEmptyInt] = useState();
    const [ints, setInts] = useState()
    const [isLoadig, setIsLoading] = useState(true);
    useEffect(() => {
        axios
            .get("http://localhost:5000/crud/interventions")
        .then((response) => {
            const data = response.data.data;
            setInts(data);
            
            if(data.length <= 0){
                    setEmptyInt(true);
                    setIsLoading(false);
            }
            else{
                setInts(data);
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
                
            }
            //const cars = JSON.parse(data)
            //const carsnum = cars.filter(cars => cars.owner == nom);
        })
        .catch(error => {console.log(error);})
 }, [])
 Moment.locale('fr');




    if(isLoadig){
        return (
            <Loadingscrn/>
        );
        }
    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex:1,}}>
        {emptyInt && 
            <>
            <StyledContainer>
            <InnerConatainer>
        <Spcr/>
        <Spcr/>
            <EmptyState
                pagetitle="Historique"
                icon="build"
                maintitle="Aucun historique de vos reparations"
                des="Faites diagnostiquez, vos vehicules et reparer les"
            />
            </InnerConatainer>
            </StyledContainer>
</>

        }
        {!emptyInt &&

                <View style={{ backgroundColor: '#fff',}}>
                                               <FlatList
                            data ={ints}
                            renderItem = {({item, index})=>{
                                return (
                                <TouchableOpacity style={{        
                                    padding: 20,
                                    marginBottom: 20,
                                    flexDirection: 'row',
                                }}
                                    key={item.id}
                                    onPress={()=> navigation.navigate('intervention', item)}
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
                                        <Icon color="#707cbd" type='ionicon' name='receipt-outline' size={32} />
                                        </View>
                                        <View>
            
                                    <Text style={{fontSize:17.33, color: '#484848',fontFamily: 'osbold'}}>Intervention {item.id}</Text>
                                    <Text style={{fontSize:13, color: '#6a6c7b',fontFamily:'osr'}}>{item.marque} {item.modele} - {item.immat}</Text>
                                    <Text style={{fontSize:10, color: '#6a6c7b',fontFamily:'osr'}}>{ Moment(item.crat).format('ddd Do MMM YYYY ')}</Text>
                                    </View>
                                </TouchableOpacity>
                                )
                            }}
                            keyExtractor={item=>item.id.toString()}
                            contentContainerStyle={{
                                padding: 20
                            }}
                            />
                </View>
        }

</SafeAreaView>
    )
}

export default Dlist
