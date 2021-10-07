import React, { useState, useEffect, useContext, useLayoutEffect } from 'react'
import { StyledContainer, InnerConatainer, PageLogo, PageSubTitle, SubTitle, StyledFormArea, LeftIcon, StyledLabel, StyledTextInput, RightIcon, StyledBtn, StyledBtnText, Msgbox, ExtraView, ExtraText, TextLink, TextLinkContent, OptIcon, EmptyArea, EmptyBadge, EmptyBadgeText, EmptyIbox, EmptyTitle, EmptySeText, NotifBadge, StyledView, StyledPopUp, StyledPopItem, StyledPopLink, Spcr } from '../components/style'
import { Icon } from 'react-native-elements'
import { TouchableOpacity, View, Text, StyleSheet, Dimensions, Image, TextInput, Pressable, ScrollView, SafeAreaView  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../components/CredentialsContext';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import EmptyState from '../components/EmptyState';
import { BottomSheet } from 'react-native-elements/dist/bottomSheet/BottomSheet';
import Loadingscrn from '../components/Loadingscrn';
import { FlatList } from 'react-native-gesture-handler';
import Moment from 'moment';
import 'moment/locale/fr'
import Dlist from '../components/Dlist';


const Histo = ({ navigation }) => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { nom, mail } = storedCredentials;



    return (
            <Dlist navigation={navigation}/>
    );
}

export default Histo