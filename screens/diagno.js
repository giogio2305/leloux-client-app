import React, {useState, useEffect, useContext, useLayoutEffect} from 'react'
import { StyledContainer, InnerConatainer, PageLogo, PageSubTitle, SubTitle, StyledFormArea, LeftIcon, StyledLabel, StyledTextInput, RightIcon, StyledBtn, StyledBtnText, Msgbox, ExtraView, ExtraText, TextLink, TextLinkContent, OptIcon, EmptyArea, EmptyBadge, EmptyBadgeText, EmptyIbox, EmptyTitle, EmptySeText, NotifBadge, StyledView, StyledPopUp, StyledPopItem, StyledPopLink, Logo, Dvdr, StyledDbtn, StyledDbtnText, Cardy } from '../components/style'
import { Icon } from 'react-native-elements'
import { TouchableOpacity, View, Text, StyleSheet, Dimensions, Image, TextInput, Pressable, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../components/CredentialsContext';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import EmptyState from '../components/EmptyState';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Moment from 'moment';
import 'moment/locale/fr'
import Loadingscrn from '../components/Loadingscrn';
import { ScrollView } from 'react-native';
import Constants from "expo-constants";

const { manifest } = Constants;

const uri = `http://localhost:5000`;


export default function Diagno({navigation, route: { params }}) {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const {id, syst, createdAt, vid, repaid, rt, dp, rdvo, rdvt, rdvth, cd, isr} = params
    const [veda , setVeda] = useState({});
    const [reda , setReda] = useState({});
    const [cds, setCds] = useState(isr)
    const [fd, setFd] = useState(cd)
    const[isLoading, setIsLoading] = useState(true);
    const [Submitting, setSubmitting] = useState(false)
    const [rc, setRc] = useState(null);


    useEffect(() => {
        axios
            .get( uri +'/crud/customer/'+vid)
        .then((response) => {
            const data = response.data;

                setTimeout(() => {
                    setIsLoading(false);
                    setVeda(data)
                }, 500);
                
    
        })
        .catch(error => {console.log(error);})
    }, [])
    

    useEffect(() => {
        axios
            .get(uri + '/crud/reparateur/'+repaid)
        .then((response) => {
            const data = response.data;

                setTimeout(() => {
                    setIsLoading(false);
                    setReda(data)
                }, 500);
                
    
        })
        .catch(error => {console.log(error);})
    }, [])
    

    function selectRdv(idf){
            if(rc === idf){
                setRc(null);
            }else{
                setRc(idf)
            }
    }

    const handleput = async () =>{
        setSubmitting(true);
        axios.put(uri + '/crud/codiagno',{dc: rc, id: id})
        .then((response)=>{ setSubmitting(false); console.log(response.data);setCds(response.data.isr); setFd(response.data.cd)})
        .catch(error => {setSubmitting(false); console.log(error)})
        .finally(()=>{setSubmitting(false)})
    }

    if(isLoading){
        return(
            <Loadingscrn/>
        );
    }
    return (
        <ScrollView
        style={{
            backgroundColor: '#fff',
        }}
        >
            <View
            style={{
                paddingLeft: 16,
                paddingTop: 48,
                paddingBottom: 16,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
            }}
            >
                <Text
                style={{
                    fontFamily: 'osbold',
                    fontSize: 25,
                    color: '#484848',
                }}
                >Demande de diagnostic {id}</Text>
                <View
                style={{
                    maxWidth: '96%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:'center',
                    paddingVertical: 20,
                }}
                >
                <Icon color="#6a6c7b" type='ionicon' name='calendar-sharp' size={16} />
                <Text
                 style={{
                                    fontFamily: 'osr',
                                    fontSize: 14,
                                    color: '#6a6c7b',
                                    marginLeft: 4,
                                }}
                >{Moment(createdAt).format('ddd Do MMM YYYY - HH:mm')}</Text>
                </View>
            </View>
                                    <View
                                    style={{
                                                    paddingLeft: 16,
                                                    paddingVertical: 8,
                                                }}
                                    >
                                        <View
                                                        style={{
                                                            maxWidth: '72%',
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'flex-start',
                                                            paddingBottom: 20,
                                                        }}
                                        >
                                        <Icon color="#6a6c7b" type='ionicon' name='car-sharp' size={22} />
                                    <Text
                                                     style={{
                                                        fontFamily: 'osr',
                                                        fontSize: 16,
                                                        color: '#6a6c7b',
                                                        marginLeft: 4,
                                                    }}
                                    >{veda.marque} {veda.modele} - {veda.immat}</Text>
                                        </View>
                                    <Text
                                                                                         style={{
                                                                                            fontFamily: 'osr',
                                                                                            fontSize: 16,
                                                                                            color: '#6a6c7b',
                                                                                            paddingBottom: 20,
                                                                                        }}
                                    >Systeme suspecté:  {syst}</Text>
                                    
                                    </View>
                                    <Dvdr/>
                                    <View
                                                style={{
                                                    paddingLeft: 16,
                                                    paddingTop: 28,
                                                    alignItems: 'flex-start',
                                                    justifyContent: 'flex-start',
                                               
                                                }}
                                    >
                                        <Text
                                                        style={{
                                                            fontFamily: 'osbold',
                                                            fontSize: 20,
                                                            color: '#484848',
                                                        }}
                                        >{reda.cat =='rep' ? "Réparateur":"Garage" } {reda.repa}</Text>
                                                        <View
                style={{
                    maxWidth: '96%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:'center',
                    paddingVertical: 12,
                }}
                >
                <Icon color="#6a6c7b" type='ionicon' name='location-sharp' size={16} />
                <Text
                 style={{
                                    fontFamily: 'osr',
                                    fontSize: 14,
                                    color: '#6a6c7b',
                                    marginLeft: 4,
                                }}
                >{reda.add} - {reda.tel}</Text>
                </View>


            <View>

            {rt !== null 

            ? 
            <>
            <View
                
                style={{
                    maxHeight: '40%',
                    paddingHorizontal: 12,
                    paddingVertical: 24,
                }}>

                    <Text
                                                         style={{
                                                            fontFamily: 'osr',
                                                            fontSize: 16,
                                                            color: '#484848',
                                                        }}
                    >
                        {rt}
                    </Text>
                    </View>
                
                <View>
                {cds === 0 ?
                <>
                <Text
                                                                         style={{
                                                                            fontFamily: 'osr',
                                                                            fontSize: 16,
                                                                            color: '#484848',
                                                                            padding: 8,
                                                                        }}
                >Selectionner le rendez-vous qui vous arrange:</Text> 

                <View
                style={{
                    flexDirection: 'row',
                    padding: 12,
                }}
                >
                    

                                           <Cardy onPress={()=>selectRdv(rdvo)} isSelected={rc == rdvo}>
                                                    
                                                <Text style={{fontSize:12, color: '#6a6c7b',fontFamily:'ossemibold',textTransform: 'none'}}>{Moment(rdvo).format('dddd')}</Text>
                                                <View 
                                                style={{
                                                    width:40,height:40,borderRadius:20,backgroundColor:'#707cbd',margin:4,alignItems: 'center',justifyContent: 'center'
                                                }}
                                                >
                                                    <Text style={{fontSize:20, color: '#f5f5f5',textAlign: 'center',fontFamily:'ossemibold'}}>{ Moment(rdvo).format('Do')}</Text>
                                                </View>
                                                
                                                <Text style={{marginBottom: 3,fontSize:12, color: '#6a6c7b',fontFamily:'ossemibold',textTransform: 'none'}}>{Moment(rdvo).format('MMM - YYYY')}</Text>
                                                <Text style={{fontSize:12, color: '#6a6c7b',fontFamily:'osr',textTransform: 'none'}}>{Moment(rdvo).format('HH:mm')}</Text>
                                                </Cardy>

                                               <Cardy
                                                onPress={()=>selectRdv(rdvt)}
                                                isSelected={rc == rdvt}
                                                >
                                                <Text style={{fontSize:12, color: '#6a6c7b',fontFamily:'ossemibold',textTransform: 'none'}}>{Moment(rdvt).format('dddd')}</Text>
                                                <View 
                                                style={{
                                                    width:40,height:40,borderRadius:20,backgroundColor:'#707cbd',margin:4,alignItems: 'center',justifyContent: 'center'
                                                }}
                                                >
                                                    <Text style={{fontSize:20, color: '#f5f5f5',textAlign: 'center',fontFamily:'ossemibold'}}>{ Moment(rdvt).format('Do')}</Text>
                                                </View>
                                                
                                                <Text style={{marginBottom: 3,fontSize:12, color: '#6a6c7b',fontFamily:'ossemibold',textTransform: 'none'}}>{Moment(rdvt).format('MMM - YYYY')}</Text>
                                                <Text style={{fontSize:12, color: '#6a6c7b',fontFamily:'osr',textTransform: 'none'}}>{Moment(rdvt).format('HH:mm')}</Text>
                                                </Cardy>
                                                <Cardy 
                                                onPress={()=>selectRdv(rdvth)}
                                                isSelected={rc == rdvth}
                                                >
                                                <Text style={{fontSize:12, color: '#6a6c7b',fontFamily:'ossemibold',textTransform: 'none'}}>{Moment(rdvth).format('dddd')}</Text>
                                                <View 
                                                style={{
                                                    width:40,height:40,borderRadius:20,backgroundColor:'#707cbd',margin:4,alignItems: 'center',justifyContent: 'center'
                                                }}
                                                >
                                                    <Text style={{fontSize:20, color: '#f5f5f5',textAlign: 'center',fontFamily:'ossemibold'}}>{ Moment(rdvth).format('Do')}</Text>
                                                </View>
                                                
                                                <Text style={{marginBottom: 3,fontSize:12, color: '#6a6c7b',fontFamily:'ossemibold',textTransform: 'none'}}>{Moment(rdvth).format('MMM - YYYY')}</Text>
                                                <Text style={{fontSize:12, color: '#6a6c7b',fontFamily:'osr',textTransform: 'none'}}>{Moment(rdvth).format('HH:mm')}</Text>
                                                </Cardy>

                                                
                </View>


                <Text
                                     style={{
                                        fontFamily: 'osr',
                                        fontSize: 16,
                                        color: '#484848',
                                        padding: 20,
                                    }}
                    >Prix du diagnostic: {dp <= 0 ? 'Gratuit': dp + ' Fcfa'} 
                    </Text>

                                    <View
                                    style={{
                                        paddingTop: 72,
                                        marginHorizontal: 120,
                                    }}
                                    >
                                       { rc === null ?
                                        <StyledDbtn>
                                            <StyledDbtnText>
                                                Confirmer
                                            </StyledDbtnText>
                                        </StyledDbtn>
                                        :
                                        <StyledBtn onPress={handleput}>{!Submitting ? <StyledBtnText>Confirmer</StyledBtnText>:<ActivityIndicator size='small'/>}</StyledBtn>
}
                                    </View>
                                  </>
                                  :
                                  <>
                                                  <Text
                                                                         style={{
                                                                            fontFamily: 'osr',
                                                                            fontSize: 16,
                                                                            color: '#484848',
                                                                            padding: 8,
                                                                        }}
                >Rendez-vous selectionné:</Text> 

                <View
                style={{
                    flexDirection: 'row',
                    padding: 12,
                }}
                >
                        
                        <Cardy isSelected={false}>
                                                    
                                                    <Text style={{fontSize:12, color: '#6a6c7b',fontFamily:'ossemibold',textTransform: 'none'}}>{Moment(cd).format('dddd')}</Text>
                                                    <View 
                                                    style={{
                                                        width:40,height:40,borderRadius:20,backgroundColor:'#707cbd',margin:4,alignItems: 'center',justifyContent: 'center'
                                                    }}
                                                    >
                                                        <Text style={{fontSize:20, color: '#f5f5f5',textAlign: 'center',fontFamily:'ossemibold'}}>{ Moment(cd).format('Do')}</Text>
                                                    </View>
                                                    
                                                    <Text style={{marginBottom: 3,fontSize:12, color: '#6a6c7b',fontFamily:'ossemibold',textTransform: 'none'}}>{Moment(cd).format('MMM - YYYY')}</Text>
                                                    <Text style={{fontSize:12, color: '#6a6c7b',fontFamily:'osr',textTransform: 'none'}}>{Moment(cd).format('HH:mm')}</Text>
                                                    </Cardy>
                    </View>
                    <Text
                                     style={{
                                        fontFamily: 'osr',
                                        fontSize: 16,
                                        color: '#484848',
                                        padding: 20,
                                    }}
                    >Prix du diagnostic: {dp <= 0 ? 'Gratuit': dp + " Fcfa"}
                    </Text>
                                  </>  
                                }
            </View>
            
                </>
                :
                <Text>Rien ici !</Text>

            }








                                                
                </View>
                                    </View>

        </ScrollView>
    )
}
