import React, { useState, useContext } from 'react'
import { StyledContainera, InnerConatainer,Logo , StyledDnBtnText, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledLabel, StyledTextInput, RightIcon, StyledBtn, StyledBtnText, Msgbox, ExtraView, ExtraText, TextLink, TextLinkContent, BackBtn, BackBtnText, StyledDbtn, StyledDbtnText, StyledNBtn, StyledNBtnText, StyledDnBtn } from '../components/style'
import { Formik } from 'formik';
import { View, ActivityIndicator , Text} from 'react-native';
import { Icon } from 'react-native-elements'
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';
import { CredentialsContext } from './../components/CredentialsContext';
import Loadingscrn from '../components/Loadingscrn';
import env from '../env';

const MailSchema = Yup.object().shape({
    otp: Yup.string().min(4, 'code OTP invalide').max(4,'code OTP invalide'),
    mail: Yup.string().email('votre adresse mail est invalide').required('Veuillez remplir ce champs'),
  });
const uri = env.api_url;

const MailEdit = ({navigation}) => {
    const { storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const [isSucces, setIsSucces] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [isLoading, setSubmitting] = useState(false);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [page, setPage] = useState(1);

    const { id, nom, mail, tel } = storedCredentials;

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
    const handleCheck = (credentials, setSubmitting) => {
        handleMessage(null);
        const url =uri + '/checkumail';
        axios.put(url, credentials)
        .then ((response)=>{
            if (!response) {
                handleMessage("Aucune reponse");
            }
            const result = response.data;
            const { message, status, data } = result;

            if (status !== 'SUCCESS') {
                handleMessage(message, status);
                setIsFailed(true)
            } else {
                setPage(page + 1);
                console.log({...data});
            }
            setSubmitting(false);
        })
        .catch(error => {
            //console.log(error.JSON());
            handleMessage("Une erreur est survenue. Veerifiez votre connexion internet");
            setIsFailed(true)
            setSubmitting(false);
        })
    }
    const handleSign = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = uri + "/changeumail";
        axios
            .put(url, credentials)
            .then((response) => {

                if (!response) {
                    handleMessage("Aucune reponse");
                }
                
                const result = response.data;
                const { message, status, data } = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message, status);
                    setIsFailed(true)
                } else {
                    setIsSucces(true)
                    console.log({...data});
                persistLogin({ ...data }, message, status);
                }
                setSubmitting(false);
            })
            .catch(error => {
                //console.log(error.JSON());
                handleMessage("Une erreur est survenue. Veerifiez votre connexion internet");
                setIsFailed(true)
                setSubmitting(false);
            })
    }
    if(isLoading){
        return(
            <Loadingscrn/>
        );
    }
    return (
        <StyledContainera>
        <InnerConatainer>

       
            <Formik initialValues={{  mail:mail, id: id, mailOtp: null}} 
                onSubmit={(values, { setSubmitting }) => {
                    if ( values.mail == '') {
                        handleMessage("Remplissez tous les espaces")
                        setSubmitting(false);
                    } else {
                        if(values.mailOtp == null){
                                handleCheck(values,setSubmitting)
                        }
                        else{
                            handleSign(values, setSubmitting);
                        }
                        
                    }
                 }}
                 validationSchema={MailSchema}
                 >
                {

                    ({ handleChange, handleBlur, handleSubmit, isSubmitting , values, errors, touched  }) => (
                        <StyledFormArea>

        {!isSucces && !isFailed && 
        <>
        {page==1 &&
        <>
        <SubTitle>Quelle est votre nouvelle adresse mail ?</SubTitle>
                                    <ModInput
                                    label=" "
                                    name= 'mail'
                                    icon="at-outline"
                                    placeholder="nom@mail.com"
                                    placeholderTextColor='#6a6c7b'
                                    onChangeText={handleChange('mail')}
                                    onBlur={handleBlur('mail')}
                                    value={values.mail}
                                    keyboardType="email-address"
                                />
                                <Text style={{fontFamily: 'osr', fontSize: 12, lineHeight:19.32,margin: 20}}>Vous allez peut etre recevoir un code dans votre boite mail pour confirmer votre  nouvelle adresse.</Text>
                                {errors.mail && touched.mail ? <Text>{errors.mail}</Text> : null}
                                <View style={{flexDirection: 'row', alignItems:'center',}}> 
                                <StyledBtn onPress={handleSubmit}>
                                <StyledBtnText>
                                Modifier
                                </StyledBtnText>
                                </StyledBtn>

                        </View>
                        </>
                        }
                                {page==2 &&
        <>
        <SubTitle>Nous vous avons envoyé un code a l'adresse {values.mail}</SubTitle>
                                    <ModInput
                                    label=" "
                                    name= 'mailOtp'
                                    icon="at-outline"
                                    placeholder="Entrez le code"
                                    placeholderTextColor='#6a6c7b'
                                    onChangeText={handleChange('mailOtp')}
                                    onBlur={handleBlur('mailOtp')}
                                    value={values.otp}
                                    //keyboardType = 'numeric'
                                />
                                <Text style={{fontFamily: 'osr', fontSize: 12, lineHeight:19.32,margin: 20}}>Vous allez peut etre recevoir un code dans votre boite mail pour confirmer votre  nouvelle adresse.</Text>
                                {errors.otp && touched.otp ? <Text>{errors.otp}</Text> : null}
                                <View style={{flexDirection: 'row', alignItems:'center',}}> 
                                <StyledBtn onPress={handleSubmit}>
                                <StyledBtnText>
                                Modifier
                                </StyledBtnText>
                                </StyledBtn>

                        </View>
                        </>
                        }
                        </>
                        }

                        {isSucces && !isFailed &&
                        <>
                        <View style={{alignItems:'center', justifyContent: 'center'}}>
                                <Icon color="#5bc402" type='ionicon' name='checkmark-circle' size={88} />
                                <Text
                                style={{
                                    fontSize: 22.6,
                                    fontFamily: 'osbold',
                                    lineHeight: 32,
                                    letterSpacing: -0.546,
                                    textAlign: 'center',
                                    color: '#2f3037',
                                    marginTop: 8
                
                                }}
                                >Votre adresse mail a bien été  modifiée </Text>
                                </View>
                        </>
                        }

                        {!isSucces && isFailed &&
                        <>
                        <View style={{alignItems:'center', justifyContent: 'center'}}>
                        <Icon color="#de4949" type='ionicon' name='sad-outline' size={88} />
                                <Text
                                style={{
                                    fontSize: 22.6,
                                    fontFamily: 'osbold',
                                    lineHeight: 32,
                                    letterSpacing: -0.546,
                                    textAlign: 'center',
                                    color: '#2f3037',
                
                                }}
                                >Ooops!</Text>
                                <Text               
                                style={{
                                    fontSize: 17.33,
                                    fontFamily: 'osr',
                                    lineHeight: 22,
                                    letterSpacing: -0.08,
                                    textAlign: 'center',
                                    color: '#6A6C7B',
                                    marginVertical: 12,
                                }}>
                                    Une erreur est survenue.
                                    </Text>
                                </View>
                        </>
                        }  



        </StyledFormArea>
                    )}
        </Formik>
        </InnerConatainer>
        </StyledContainera>
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
export default MailEdit
