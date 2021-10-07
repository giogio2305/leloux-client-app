import React, { useState, useEffect, useContext, useLayoutEffect } from 'react'
import { StyledContainer, InnerConatainer, PageLogo, PageSubTitle, SubTitle, StyledFormArea, LeftIcon, StyledLabel, StyledTextInput, RightIcon, StyledBtn, StyledBtnText, Msgbox, ExtraView, ExtraText, TextLink, TextLinkContent, OptIcon, EmptyArea, EmptyBadge, EmptyBadgeText, EmptyIbox, EmptyTitle, EmptySeText, NotifBadge, StyledView, StyledPopUp, StyledPopItem, StyledPopLink, spcr, Spcr, Pamc, PaBarM, PaBox, PropaTi, PropaMt } from './../../components/style'
import { Icon } from 'react-native-elements'
import { Text } from 'react-native-elements';
import { TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../../components/CredentialsContext';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import EmptyState from './../../components/EmptyState';
import { BottomSheet } from 'react-native-elements/dist/bottomSheet/BottomSheet';


const Compte = ({navigation}) => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { nom, mail, tel } = storedCredentials;
    const [emptyPark, setEmptyPark] = useState(true);
    const [emptyDiag, setEmptyDiag] = useState(true);
    const items =[
        {
            icon: 'person',
            title: 'Nom d\'utilisateur',
            value: nom,
            isedit: true
        },
        {
            icon: 'at',
            title: 'Adresse mail',
            value: mail,
            isedit: true
        },
        {
            icon: 'call',
            title: 'Téléphone',
            value: tel,
            isedit: true
        },
        {
            icon: 'lock-open-outline',
            title: 'Code d\'acces ',
            value: '*********',
            isedit: true
        },
    ]
    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerConatainer>
<Pamc>
{items.map((item)=>(
<Bar
key={item.id}
icon ={item.icon}
title= {item.title}
value={item.value}
isedit= {item.isedit}
/>
))}
</Pamc>
            </InnerConatainer>
        </StyledContainer>
    )
}
const Bar = ({icon, title, isedit, value}) =>{
    return (<PaBarM>
        <PaBox><Icon color="#8d96ca" type='ionicon' name={icon} size={28} /></PaBox>
        <PaBox>
            <PropaTi>{title}</PropaTi>
            <PropaMt>{value}</PropaMt>
        </PaBox>
        {isedit 
        ? <PaBox>
            <TouchableOpacity>
            <Icon color="#121212" type='ionicon' name='pencil' size={20} />
            </TouchableOpacity>
            </PaBox>
            
        : <PaBox></PaBox>}
    </PaBarM>);

}
export default Compte
