import React, { useState, useEffect, useContext, useLayoutEffect } from 'react'
import { StyledContainer, InnerConatainer, PageLogo, PageSubTitle, SubTitle, StyledFormArea, LeftIcon, StyledLabel, StyledTextInput, RightIcon, StyledBtn, StyledBtnText, Msgbox, ExtraView, ExtraText, TextLink, TextLinkContent, OptIcon, EmptyArea, EmptyBadge, EmptyBadgeText, EmptyIbox, EmptyTitle, EmptySeText, NotifBadge, StyledView, StyledPopUp, StyledPopItem, StyledPopLink, spcr, Spcr } from './../../components/style'
import { Icon } from 'react-native-elements'
import { TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../../components/CredentialsContext';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import EmptyState from './../../components/EmptyState';
import { BottomSheet } from 'react-native-elements/dist/bottomSheet/BottomSheet';


const Aide = ({navigation}) => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { nom, mail } = storedCredentials;
    const [emptyPark, setEmptyPark] = useState(true);
    const [emptyDiag, setEmptyDiag] = useState(true);
    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerConatainer>
                {emptyPark && <>
                    <EmptyState
                        pagetitle="Notifications"
                        icon="notifications-outline"
                        maintitle="Aucun rendez-vous en vue"
                        des="Pour en avoir, prenez rendez vous avec votre reparateur"
                    />
                    <StyledBtn onPress={() => { navigation.navigate("addcar") }}>
                        <StyledBtnText>
                            Ajouter un Véhicule
                        </StyledBtnText>
                    </StyledBtn></>
                }
            </InnerConatainer>
        </StyledContainer>
    )
}

export default Aide
