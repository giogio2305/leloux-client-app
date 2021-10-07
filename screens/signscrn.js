import React, { useState, useContext } from 'react'
import { StyledContainera, InnerConatainer,Logo , StyledDnBtnText, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledLabel, StyledTextInput, RightIcon, StyledBtn, StyledBtnText, Msgbox, ExtraView, ExtraText, TextLink, TextLinkContent, BackBtn, BackBtnText, StyledDbtn, StyledDbtnText, StyledNBtn, StyledNBtnText, StyledDnBtn } from '../components/style'
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { View, ActivityIndicator , Text} from 'react-native';
import { Icon } from 'react-native-elements'
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';
import { CredentialsContext } from './../components/CredentialsContext';
import Constants from "expo-constants";
import Loadingscrn from '../components/Loadingscrn';

const { manifest } = Constants;

const uri = `http://localhost:5000`;



const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const SignupSchema = Yup.object().shape({
    nom: Yup.string()
      .min(2, 'Trop Court!')
      .max(50, 'Trop Long!')
      .required('Veuillez remplir ce champs'),
      tel: Yup.string()
      .min(13, 'Ce numéro  n\'est pas valide')
      .max(13, 'Ce numéro  n\'est pas valide')
      .required('Veuillez remplir ce champs'),
    adr: Yup.string()
      .min(2, 'Trop Court!')
      .max(50, 'Trop Long!')
      .required('Veuillez remplir ce champs'),
      pass: Yup.string()
      .min(8, 'Mot de passe trop court!')
      .max(50, 'Mot de passe trop long!')
      .required('Veuillez remplir ce champs'),
    mail: Yup.string().email('votre adresse mail est invalide').required('Veuillez remplir ce champs'),
  });


const Sign = ({ navigation }) => {

    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [page, setPage] = useState(1)
    const [scte, setScte] = useState(true)

    const { storedCredentials, setStoredCredentials} = useContext(CredentialsContext);



    const handleSign = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = uri + "/register";
        axios
            .post(url, credentials)
            .then((response) => {

                if (!response) {
                    handleMessage("Aucune reponse");
                }
                
                const result = response.data;
                const { message, status, data } = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message, status);
                } else {
                    console.log({...data});
                    persistLogin({ ...data }, message, status);
                }
                setSubmitting(false);
            })
            .catch(error => {
                console.log(error.JSON());
                handleMessage("Une erreur est survenue. Veerifiez votre connexion internet");
                setSubmitting(false);
            })
    }

    const handleMessage = (message, type = 'FAILED') => {
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

    return (
        <StyledContainera>
            <InnerConatainer>

           
                <Formik initialValues={{ nom: '', mail:'', tel:'', adr:'',  pass:'' }} 
                    onSubmit={(values, { setSubmitting }) => {
                        if (values.nom == '' || values.mail == '' || values.tel == '' || values.adr == '' || values.pass == '') {
                            handleMessage("Remplissez tous les espaces")
                            setSubmitting(false);
                        } else {
                            setPage(page + 1);
                            handleSign(values, setSubmitting);
                        }
                     }}
                     validationSchema={SignupSchema}
                     >
                    {

                        ({ handleChange, handleBlur, handleSubmit, isSubmitting , values, errors, touched  }) => (
                            <StyledFormArea>
                            {page === 4 && 
                            <>
            <SubTitle>Comment vous appele-t-on ?</SubTitle>
                                <ModInput
                                    label=" "
                                    name= 'nom'
                                    icon="person-outline"
                                    placeholder="Entrez votre pseudo"
                                    placeholderTextColor='#6a6c7b'
                                    onChangeText={handleChange('nom')}
                                    autoCapitalize="words"
                                    onBlur={handleBlur('nom')}
                                    value={values.nom}
                                />
                                {errors.nom && touched.nom ? <Text>{errors.nom}</Text> : null}
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <BackBtn onPress={()=>{setPage(page - 1)}}>
                                    <BackBtnText>Retour</BackBtnText>
                                </BackBtn>
                                {errors.nom == null ?  
                                <StyledNBtn onPress={()=>{setPage(page + 1)}}>
                                <StyledNBtnText>
                                Suivant
                                </StyledNBtnText>
                                </StyledNBtn>
                                :
                                <StyledDnBtn>
                                    <StyledDnBtnText>
                                        Suivant
                                    </StyledDnBtnText>
                                </StyledDnBtn>

                                }
                                </View>
                                </>}


                           {page==1 && 
                           <>
                           <SubTitle>Quel est votre numéro de téléphone ?</SubTitle>
                                <ModInput
                                    label=" "
                                    name= 'tel'
                                    icon="call-outline"
                                    placeholder="+237....."
                                    placeholderTextColor='#6a6c7b'
                                    onChangeText={handleChange('tel')}
                                    onBlur={handleBlur('tel')}
                                    value={values.tel}
                                    keyboardType="phone-pad"
                           />
                           {errors.tel && touched.tel ? <Text>{errors.tel}</Text> : null}
                           <View style={{marginTop: 16}}>
                            {errors.tel == null ?  
                                <StyledBtn onPress={()=>{setPage(page + 1)}}>
                                <StyledBtnText>
                                    Suivant
                                </StyledBtnText>
                            </StyledBtn>
                                :

                                <StyledDbtn>
                                <StyledDbtnText>Suivant</StyledDbtnText>
                            </StyledDbtn>

                                }
                                 </View>
                           </>
                           }

                               {page ===5 &&
                               <>
                               <SubTitle>Ou vivez vous ?</SubTitle>
                               <ModInput
                                    label=" "
                                    name= 'adr'
                                    icon="location-outline"
                                    placeholder="Douala"
                                    placeholderTextColor='#6a6c7b'
                                    onChangeText={handleChange('adr')}
                                    autoCapitalize="words"
                                    onBlur={handleBlur('adr')}
                                    value={values.adr}
                               />
                               <Text style={{fontFamily: 'osr', fontSize: 12, lineHeight:19.32,margin: 20}}>Entrez votre ville de residence principal.</Text>
                               {errors.adr && touched.adr ? <Text>{errors.adr}</Text> : null}
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <BackBtn onPress={()=>{setPage(page - 1)}}>
                                    <BackBtnText>Retour</BackBtnText>
                                </BackBtn>
                                {errors.adr == null ?  
                                <StyledNBtn onPress={()=>{setPage(page + 1)}}>
                                <StyledNBtnText>
                                Suivant
                                </StyledNBtnText>
                                </StyledNBtn>
                                :
                                <StyledDnBtn>
                                    <StyledDnBtnText>
                                        Suivant
                                    </StyledDnBtnText>
                                </StyledDnBtn>

                                }
                                </View>
                               </>
                               }
                               {page===3 && 
                               <>
                               <SubTitle>Créer un mot de pase</SubTitle>
                                <ModInput
                                    label=" "
                                    name= 'pass'
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
                                <Text style={{fontFamily: 'osr', fontSize: 12, lineHeight:19.32,margin: 20}}>Votre mot de passe doit contenir 8 caracteres minimum</Text>
                                {errors.pass && touched.pass ? <Text>{errors.pass}</Text> : null}
                                <View style={{flexDirection: 'row', alignItems:'center'}}>
                                <BackBtn onPress={()=>{setPage(page - 1)}}>
                                    <BackBtnText>Retour</BackBtnText>
                                </BackBtn>
                                
                                {errors.pass == null ?  
                                <StyledNBtn onPress={()=>{setPage(page + 1)}}>
                                <StyledNBtnText>
                                Suivant
                                </StyledNBtnText>
                                </StyledNBtn>
                                :
                                <StyledDnBtn>
                                    <StyledDnBtnText>
                                        Suivant
                                    </StyledDnBtnText>
                                </StyledDnBtn>

                                }
                                </View>
                               </>
                               }

                               { page===2 &&

                               <>
                               <SubTitle>Quel est votre adresse mail?</SubTitle>
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
                                <Text style={{fontFamily: 'osr', fontSize: 12, lineHeight:19.32,margin: 20}}>Vous devrez confirmer votre adresse mail plutard. via un lien que nous vous enverons.</Text>
                                {errors.mail && touched.mail ? <Text>{errors.mail}</Text> : null}
                                <View style={{flexDirection: 'row', alignItems:'center',}}>
                                <BackBtn onPress={()=>{setPage(page - 1)}}>
                                    <BackBtnText>Retour</BackBtnText>
                                </BackBtn>
                                
                                {errors.mail == null ?  
                                <StyledNBtn onPress={()=>{setPage(page + 1)}}>
                                <StyledNBtnText>
                                Suivant
                                </StyledNBtnText>
                                </StyledNBtn>
                                :
                                <StyledDnBtn>
                                    <StyledDnBtnText>
                                        Suivant
                                    </StyledDnBtnText>
                                </StyledDnBtn>

                                }
                        </View>

                               </>
                               }
                               {page > 6 &&
                               
                                    <Loadingscrn/>

                               }
                               {page === 6 &&

                               <>
                               <View style={{flexDirection:'row', alignItems: 'center', textAlign:'center'}}>
                               <Text style={{
                                textAlign: 'center',
                                fontFamily: 'ossemibold',
                                color: '#484848',
                                fontSize: 22.33,textAlign:'center'

                            }}>Bienvenue sur <Text style={{
                                fontFamily: 'Kabel',
                                color: '#707cbd',
                                fontSize: 26.66
                            }}>LeLoux</Text></Text> 

                               </View>

                               <Text style={{fontFamily: 'osr', fontSize: 14, lineHeight:19.32,margin: 40, letterSpacing: 0.5,}}>En cliquant sur  "J'accepte" ci-dessous, vous adhérez automatiquement auxTermes d'usage et a la Police de confidentialité de l,application</Text>

                               <View style={{marginTop: 8}}>
                                <StyledBtn  onPress={handleSubmit}>
                                    <StyledBtnText>
                                        J'accepte
                                    </StyledBtnText>
                                </StyledBtn>
                                </View>
                               </>

                               }
                                {/*<Msgbox type={messageType}>{message}</Msgbox>*/}


                                {/*{isSubmitting ? 
                                <StyledBtn disabled={true}>
                                    <ActivityIndicator size="small" color="#fff" />
                                </StyledBtn>
                                :
                                }*/}


                            </StyledFormArea>
                        )
                    }
                </Formik>
            </InnerConatainer>
        </StyledContainera>
    );
}

const ModInput = ({ label, icon,name, isPassword, hidePassword, setHidePassword, ...props }) => {

    return (
        <View>
            <LeftIcon><Icon color="#121212" type='ionicon' name={icon} size={28} /></LeftIcon>
            <StyledLabel>{label}</StyledLabel>
            <StyledTextInput {...props}  name ={name}/>
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Icon color="#121212" type='ionicon' name={hidePassword ? 'md-eye-off' : 'md-eye'} size={28} />
                </RightIcon>
            )}
        </View>
    );

}

export default Sign;

