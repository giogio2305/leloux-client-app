import React, { useState, useEffect, useContext, useLayoutEffect } from 'react'
import { StyledContainer, InnerConatainer, PageLogo, PageSubTitle, SubTitle, StyledFormArea, LeftIcon, StyledLabel, StyledTextInput, RightIcon, StyledBtn, StyledBtnText, Msgbox, ExtraView, ExtraText, TextLink, TextLinkContent, OptIcon, EmptyArea, EmptyBadge, EmptyBadgeText, EmptyIbox, EmptyTitle, EmptySeText, NotifBadge, StyledView, StyledPopUp, StyledPopItem, StyledPopLink, spcr, Spcr } from '../components/style'
import { Icon } from 'react-native-elements'
import { TouchableOpacity, View, Text, StyleSheet, Dimensions, Image, TextInput, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../components/CredentialsContext';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import EmptyState from '../components/EmptyState';
import { BottomSheet } from 'react-native-elements/dist/bottomSheet/BottomSheet';
import Moment from 'moment';
import 'moment/locale/fr'
import { FlatList } from 'react-native-gesture-handler';
import Loadingscrn from '../components/Loadingscrn';

const Notif = ({navigation}) => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { nom, mail } = storedCredentials;

    const [emptyNotifs, setEmptyNotifs] = useState();
    const [isLoadig, setIsLoading] = useState(true);
    const [notifs, setNotifs] = useState();
    useEffect(() => {
        axios
            .get("http://192.168.43.239:5000/crud/diagnos")
        .then((response) => {
            const data = response.data.data;
            if(data.length <= 0){
                    setEmptyNotifs(true);
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 2000);
            }else{
                setNotifs(data)
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
                
            }
    
        })
        .catch(error => {console.log(error);})
    }, [])
    if(isLoadig){
        return (
            <Loadingscrn/>
        );
    }
    return (
<>

                {emptyNotifs && <>
                    <StyledContainer>
                    <InnerConatainer>
                    <Spcr/>
                <Spcr/>
                    <EmptyState
                        pagetitle="Notifications"
                        icon="today"
                        maintitle="Aucun rendez-vous en vue"
                        des="Pour en avoir, prenez rendez vous avec votre reparateur"
                    />
                                </InnerConatainer>
        </StyledContainer>
</>
                }
                {!emptyNotifs &&
                <View>
                                                                           <FlatList
                                    data ={notifs}
                                    renderItem = {({item, index})=>{
                                        return (
                                        <TouchableOpacity style={{        
                                            padding: 20,
                                            marginBottom: 20,
                                            flexDirection: 'row',
                                        }}
                                            key={item.id}
                                            >
                                                <View
                                                style={{
                                                    width: 65,
                                                    height: 65,
                                                    borderRadius: 8,
                                                    backgroundColor: '#e2e5f2',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginRight: 18,
                                                }}
                                                >
                                                <Text style={{fontSize:12, color: '#707cbd',fontFamily:'osr',textTransform: 'none'}}>{Moment(item.createdAt).format('dddd')}</Text>
                                                <Text style={{fontSize:24, color: '#6a6c7b',fontFamily:'osr'}}>{ Moment(item.createdAt).format('Do')}</Text>
                                                </View>
                                                <View>
                    
                                            <Text style={{fontSize:17.33, color: '#484848',fontFamily: 'osbold'}}>Rendez-vous {item.id}</Text>
                                            <Text style={{fontSize:13, color: '#6a6c7b',fontFamily:'osr'}}>chez {item.syst}</Text>
                                            <Text style={{fontSize:10, color: '#6a6c7b',fontFamily:'osr'}}>{ Moment(item.createdAt).format('HH:mm')}</Text>
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
</>
    )
}

export default Notif
