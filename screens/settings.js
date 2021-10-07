import React, { useState, useEffect, useContext, useLayoutEffect } from 'react'
import { StyledContainer, InnerConatainer, PageLogo, PageSubTitle, SubTitle, StyledFormArea, LeftIcon, StyledLabel, StyledTextInput, RightIcon, StyledBtn, StyledBtnText, Msgbox, ExtraView, ExtraText, TextLink, TextLinkContent, OptIcon, EmptyArea, EmptyBadge, EmptyBadgeText, EmptyIbox, EmptyTitle, EmptySeText, NotifBadge, StyledView, StyledPopUp, StyledPopItem, StyledPopLink, Propa, Pamc, Dvdr, PropaBar, PropaBox, PropaTi, PropaMt, PropaTih, PaBar, PaBox, Logo, Spcr, StyledDbtn, StyledDbtnText } from '../components/style'
import { Icon } from 'react-native-elements'
import { TouchableOpacity,Pressable, View, Text, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../components/CredentialsContext';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import EmptyState from '../components/EmptyState';
import { BottomSheet } from 'react-native-elements/dist/bottomSheet/BottomSheet';
import { ScrollView } from 'react-native';


const Params = ({navigation}) => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { nom, mail, tel } = storedCredentials;
    const [emptyPark, setEmptyPark] = useState();
    const [emptyDiag, setEmptyDiag] = useState(true);
    const [mMv, setMMv]  = useState(false);
    const [mt, setMt] = useState('Modifier votre adresse mail');
    const [mu, setMu] = useState('/changeumail');

    const goToHelp = () =>
    {
        navigation.navigate('aide')
    }

    const Editmail = () =>
    {
        navigation.navigate('mailedit');         
    }

    const Editphone = () =>
    {
        navigation.navigate('phoneedit');         
    }

    const Pitems =[
        {
            title: 'Adresse mail',
            value: mail,
            icon: 'pencil',
            action: Editmail,
        },
        {
            title: 'Téléphone',
            value: tel,
            icon: 'pencil',
            action: Editphone
        },
        {
            title: 'Code d\'acces',
            value: "********",
            icon: 'pencil',
        },
        {
            title: 'Aide',
            value: "Confidentialité, infos.",
            icon: 'chevron-forward',
            action: goToHelp,
        },
    ]


    const logout = () => {
        AsyncStorage.removeItem('LelouxCredentials')
            .then(() => {
                setStoredCredentials("");
                navigation.navigate('Login')
            })
            .catch(error => {
                console.log(error);
            })
            
        }
    return (
 <ScrollView 
 style={styles.container}
 >
            <Propa>

                <PropaBar>
                <TouchableOpacity
                    style={styles.pp}
                    >
                            <Text
                            style={styles.ppt}
                            >+ Ajouter</Text>
                    </TouchableOpacity>
                    </PropaBar>
                                <PropaBar>
                    <PropaTih>{nom} </PropaTih>
                    
                </PropaBar>
                    
                    <PropaBar>
                        <PropaBox>
                            <PropaTi>2</PropaTi>
                            <PropaMt>Vehicules</PropaMt>
                        </PropaBox>
                        <PropaBox>
                            <PropaTi>0</PropaTi>
                            <PropaMt>interventions</PropaMt>
                        </PropaBox>
                    </PropaBar>
            </Propa>
            <Spcr/>
            <View  style={styles.pc}>
                {Pitems.map((item)=>{
                    return (
                        <TouchableOpacity style={styles.pb} key={item.title} onPress={item.action}>
                        <View style={styles.pbh}>
                            <Text style={styles.pbht}>{item.title}</Text>
                            <Icon color="#7e89c4" type='ionicon' name={item.icon} size={24} />
                        </View>
                        <Text style={styles.pbb}>{item.value}</Text>
                        </TouchableOpacity>
                    );
                })}


            </View>


<View style={{
    paddingTop: '4%',
    paddingHorizontal: '30%',
}}>
<Pressable style={{
                width: 180,
                 padding: 16,
                            backgroundColor: '#7e89c4',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 8,
                            color: '#fff',
                            
                }}
                onPress={logout}
                >

                    <Text style={{fontFamily: 'ossemibold',fontSize:14, color: '#fff',}}>Déconnexion</Text>
                </Pressable>
</View>
            
            </ScrollView>
    )
}




const ModInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props}) =>{

    return (
    <View>
        <LeftIcon><Icon color="#121212" type='ionicon' name={icon} size={30} /></LeftIcon>
        <StyledLabel>{label}</StyledLabel>
        <StyledTextInput {...props} />
        {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Icon color="#121212" type='ionicon' name={hidePassword? 'md-eye-off-outline' : 'md-eye-outline'} size={30} />
            </RightIcon>
        )}
    </View>
    );

}

export default Params


const styles = StyleSheet.create({
container: {
    flex: 1,
     paddingTop: 4,
     margin: 0,
     backgroundColor: '#fff',
 },
 pp:{
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 1.2,
    borderColor: '#878787',
    borderStyle: 'dashed',
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',

},
ppt:{
    fontFamily: 'osr',
    fontSize: 13,
    color: '#878787'
},
pc: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 12,
    paddingTop: 2,
},
pb: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 16,
    width: '100%',
},
pbh: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
},
pbht:{
    fontFamily:'osbold',
    fontSize: 14,
    lineHeight: 19.32,
},
pbb:{
    fontFamily: 'osr',
    fontSize: 18,
    color: '#6A6C7B',
},
ab:{
width:28,
height:28,
borderRadius: 14,
},
mdl:{
    flex: 1,
    backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)',
    justifyContent: 'center',
    alignItems:'center',
},
mdc: {
    padding: 0,
    width: 460,
    height: 340,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 8,
},
cmdl: {
   position: 'absolute',
    top: 12,
    left: 12,
},
mtc:{
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
},
mtb:{
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',

},
mtf: {
    flex: 0.2,
}
})