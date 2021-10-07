import React, { useState, useContext } from 'react'
import {StyledContainera, InnerConatainer,Logo ,  PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledLabel, StyledTextInput, RightIcon, StyledBtn, StyledBtnText, Msgbox, ExtraViewa, ExtraText, TextLink, TextLinkContent}  from '../components/style'
import Button from '../components/button'
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { View,  ActivityIndicator} from 'react-native';
import { Icon } from 'react-native-elements'
import  KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../components/CredentialsContext';
import Constants from "expo-constants";
import env from '../env'
const { manifest } = Constants;

const uri = env.api_url;




const Login = ({ navigation }) =>{

    const [hidePassword, setHidePassword] = useState(true); 
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);



    const handleLogin = (credentials, setSubmitting) =>{
        handleMessage(null);
        console.log(credentials);
        const url = uri + "/cclient";
            axios.post(url, credentials)
            .then((response) => {

                if(!response){
                    handleMessage("Aucune reponse");
                }
                    const result = response.data;
                    const {message, status, data} = result;

                    if(status !== 'SUCCESS'){
                                handleMessage(message, status);
                    }else{
                        persistLogin({ ...data }, message, status);
                    }
                    setSubmitting(false);
            })
            .catch(error =>{
                console.log(error);
                console.log (uri)
                handleMessage("Une erreur est survenue. Veerifiez votre connexion internet");
                setSubmitting(false);
            })
            .finally(()=>{
                setSubmitting(false)
            })
    }

    const handleMessage = (message, type ='FAILED') =>{
            setMessage(message);
            setMessageType(type);
    }

    const persistLogin = (credentials, message, status) => {
        AsyncStorage.setItem('LelouxCredentials', JSON.stringify(credentials))
        .then(() => {
            handleMessage(message, status);
            setStoredCredentials(credentials);
        })
        .catch(error => {
            console.log(error);
            handleMessage("Login persist Failed")
        })
    };

    return(
            <StyledContainera>
                <InnerConatainer>
                    
                    {/*<Logo>Leloux</Logo>*/}
                    <Icon color="#707cbd" type='ionicon' name='lock-closed' size={72} />
                    <SubTitle>Nous sommes heureux de vous revoir</SubTitle>
                    <SubTitle>Connectez-vous</SubTitle>
                    <Formik initialValues={{ nom: '', pass: '' }} 
                    onSubmit={(values, { setSubmitting }) => {

                            if(values.nom == '' || values.pass ==''){
                                handleMessage("Remplissez tous les espaces")
                                setSubmitting(false);
                            }else{
                                handleLogin(values, setSubmitting);
                            }
                        
                        }}>
                        {
                            ({ handleChange, handleBlur, handleSubmit, isSubmitting, values }) => (
                                <StyledFormArea>
                                    <ModInput
                                        label="Nom d'utilisateur"
                                        icon="person-outline"
                                        placeholder="Ella Jean"
                                        placeholderTextColor='#6a6c7b'
                                        onChangeText={handleChange('nom')}
                                        onBlur={handleBlur('nom')}
                                        value={values.nom}
                                    />

                                    <ModInput
                                        label="Mot de passe"
                                        icon="lock-closed-outline"
                                        placeholder="8+ caracteres"
                                        placeholderTextColor='#6a6c7b'
                                        onChangeText={handleChange('pass')}
                                        onBlur={handleBlur('pass')}

                                        value={values.pass}
                                        isPassword
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePassword}
                                        secureTextEntry={hidePassword}
                                    />
                                    <Msgbox type={messageType}>{message}</Msgbox>

                                   {!isSubmitting && <StyledBtn onPress={handleSubmit}>
                                        <StyledBtnText>
                                            Connexion
                                        </StyledBtnText>
                                    </StyledBtn>}
                                    {isSubmitting && <StyledBtn disabled={true}>
                                        <ActivityIndicator size="small" color="#fff"/>
                                    </StyledBtn>}

                                    <ExtraViewa>
                                        <ExtraText>Pas encore de compte ? </ExtraText>
                                        <TextLink>
                                            <TextLinkContent onPress={() => navigation.navigate('Sign')}>Inscrivez-vous</TextLinkContent>
                                        </TextLink>
                                    </ExtraViewa>

                                </StyledFormArea>
                            )
                        }
                    </Formik>
                </InnerConatainer>
            </StyledContainera>

              
    );
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

export default Login;

