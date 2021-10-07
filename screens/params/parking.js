import React, { useState, useEffect, useContext, useLayoutEffect } from 'react'
import { StyledContainer, InnerConatainer, PageLogo, PageSubTitle, SubTitle, StyledFormArea, LeftIcon, StyledLabel, StyledTextInput, RightIcon, StyledBtn, StyledBtnText, Msgbox, ExtraView, ExtraText, TextLink, TextLinkContent, OptIcon, EmptyArea, EmptyBadge, EmptyBadgeText, EmptyIbox, EmptyTitle, EmptySeText, NotifBadge, StyledView, StyledPopUp, StyledPopItem, StyledPopLink, spcr, Spcr } from './../../components/style'
import { Icon } from 'react-native-elements'
import { TouchableOpacity, View, StyleSheet, Text, ScrollView, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../../components/CredentialsContext';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import EmptyState from './../../components/EmptyState';
import { BottomSheet } from 'react-native-elements/dist/bottomSheet/BottomSheet';
import { TextInput } from 'react-native';
import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import env from '../../env'

const uri = env.api_url;



const Park = ({navigation}) => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { nom, mail } = storedCredentials;
        let udata = [];
    const [emptyPark, setEmptyPark] = useState(true);
    const [emptyDiag, setEmptyDiag] = useState(true);
    const [fida, setFida] = useState([]);



    useEffect(() => {
        axios
            .get( uri + "/crud/Customers")
        .then((response) => {
            const data = JSON.stringify(response.data.data);
            const cars = JSON.parse(data)
            const carsnum = cars.filter(cars => cars.owner == nom);
            setFida(carsnum);
        })
        .catch(error => {console.log(error);})
 }, [])


    const renderItem = ({item}) => {
        return(            
                        <TouchableOpacity style={{        
                            padding: 20,
                            marginBottom: 20,
                            flexDirection: 'row',
                            borderRadius: 8,
                        }}
                        onPress={()=>{navigation.navigate('car', item)}}
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
                                                <Icon color="#707cbd" type='ionicon' name='car-outline' size={32} />
                                                </View>

                                                <View>
                    <Text style={{fontSize:17.33, fontFamily: 'ossemibold', color: '#484848',}}>{item.marque} &nbsp; {item.modele}</Text>
                    <Text style={{marginTop:4,fontSize:13, fontFamily: 'osr', color: '#6A6C7B',}}>{item.year}  - {item.immat}</Text>
                </View>
                </TouchableOpacity>
            );

    }
    return (
<SafeAreaView style={styles.container}>
        {/*<View style={styles.sp}>

                <View style={styles.sc}>
                    <View style={styles.sic}>
                    <Icon color="#6A6C7B" type='ionicon' name='search' size={20} />
                    </View>
                
                    <TextInput
                    style={styles.si}
                    placeholder="Search box"
                    />
                </View>

                <Pressable style={styles.fb}>
                    <Icon color="#6A6C7B" type='ionicon' name='swap-vertical' size={20} />

                    <Text style={{marginLeft: 6, color: '#6A6C7B',}}>Filtres</Text>
                </Pressable>

    </View>*/}
        <Pressable style={styles.ncb} onPress={()=>{navigation.navigate('addcar')}}>
                    <View style={styles.icb}>
                    <Icon color="#8d96ca" type='ionicon' name='car-sport' size={24} />
                    </View>
                    <Text style={{marginLeft: 6, color: '#6A6C7B',}}>Ajouter un véhicule</Text>
                    
                    <Icon color="#8d96ca" type='ionicon' name='add-circle' size={24} />
                </Pressable>
            <View style={{
                padding: 20,
            }}>
                <FlatList
                style={{
                    backgroundColor: '#mmm',
                }}
                    data ={fida}
                    renderItem = {renderItem}
                    keyExtractor={item=>item.id.toString()}
                    />
                    </View>

            </SafeAreaView>
    )
}
export default Park

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        color: '#6A6C7B',
        flexDirection: 'column',
        padding: 20,
        paddingTop: '8%',
    },
    sp:{
        paddingHorizontal: 12,
        marginBottom: 28,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    sc: {
        width: '50%',
        padding: 8,
        backgroundColor: 'hsl(210, 9%, 96%)',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 24,
    },
    si:{
        paddingLeft: 20,
        paddingRight: 20,
        height: 28,
        backgroundColor: 'hsl(210, 9%, 96%)'
    },
    sic: {
        position: 'absolute',
        top: 11,
        left: 10,
        zIndex: 1000,
    },
    fb:{
        width: 88,
        padding: 8,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.2,
        borderColor: '#8d96ca',
        borderRadius: 8,
    },
    ncb:{
        borderWidth: 1,
        borderColor: '#8d96ca',
        borderRadius: 8,
        padding: 12,
        marginHorizontal: Dimensions.get('screen').width / 6,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    icb:{
        width: 48,
        padding: 4,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.4,
        borderStyle: 'dashed',
        borderColor: '#8d96ca',
        borderRadius: 8,
    }
    ,
    item:{
        backgroundColor: '#707cbd',
        padding: 5,
        marginHorizontal: 8,
        marginVertical: 4,
    }
});