import React, { useState, useEffect, useContext, useLayoutEffect } from 'react'
import { StyledContainer,PageSubTitle,Spcr, InnerConatainer, StyledPicker,Logo , StyledDnBtnText, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledLabel, StyledTextInput, RightIcon, StyledBtn, StyledBtnText, Msgbox, ExtraView, ExtraText, TextLink, TextLinkContent, BackBtn, BackBtnText, StyledDbtn, StyledDbtnText, StyledNBtn, StyledNBtnText, StyledDnBtn } from '../components/style'
import { Icon } from 'react-native-elements'
import { TouchableOpacity, View, ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../components/CredentialsContext';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import EmptyState from '../components/EmptyState';
import { Formik } from 'formik';
import { BottomSheet } from 'react-native-elements/dist/bottomSheet/BottomSheet';
import Loadingscrn from '../components/Loadingscrn';

const addcar = ({navigation}) => {
    const { storedCredentials, setStoredCrednetials } = useContext(CredentialsContext);
    const { nom, mail } = storedCredentials;
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [selectedTrans, setSelectedTrans] = useState(null);
    const [selectedCarb, setSelectedCarb] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    



    const handleSign = (credentials, setSubmitting) => {
        handleMessage(null);
        setIsLoading(true);
        console.log(credentials);
        const url = "http://localhost:5000/crud/customer";
        axios
            .post(url, credentials)
            .then((response) => {
                    setTimeout(() => {
                        setIsLoading(false) 
                    }, 2000);
                if (!response) {
                    handleMessage("Aucune reponse");
                }

                const result = response.data;
                const { message, status, data } = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message, status);
                } else {
                    handleMessage(message, status);
                }
                setSubmitting(false);
            })
            .catch(error => {
                setTimeout(() => {
                    setIsLoading(false)
                }, 2000);
                console.log(error);
                handleMessage("Une erreur est survenue. Veerifiez votre connexion internet");
                setSubmitting(false);
            })
            .finally(()=>{
                setTimeout(() => {
                    setIsLoading(false)
                }, 2000);
            })
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }



    return (
            <StyledContainer>
                <InnerConatainer>
                    {/*{isVisible &&
                        <BottomSheet>


                        </BottomSheet>
                    }*/}
                    <Spcr/>
                    <Spcr/>
                    <Spcr/>
                    <Formik
                    initialValues={{ owner: nom, chassis: '', marque: '', modele: '', year: '', immat: '', trans: '', carb: '' }}
                    onSubmit={(values, { setSubmitting }) => {
                        if (values.marque == '' || values.modele == '' || values.year == '' || values.immat == '' || values.trans == '' || values.carb == '') {
                            handleMessage("Remplissez tous les espaces")
                            setSubmitting(false);
                        } else {
                            setPage(page + 1);
                            handleSign(values, setSubmitting);
                        }
                    }}
                    >
                    {
                        ({ handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting, values }) => (
                            <StyledFormArea>
                                {page ===2 &&
                                <>
                                <SubTitle>Quel est le numéro de chassis de votre véhicule ?</SubTitle>
                                <ModInput
                                    label=" "
                                    icon="car-outline"
                                    placeholder="Entrez le numéro de chassis "
                                    placeholderTextColor='#6a6c7b'
                                    onChangeText={handleChange('chassis')}
                                    onBlur={handleBlur('chassis')}
                                    value={values.chassis}
                                />
                            <Text style={{fontFamily: 'osr', fontSize: 12, lineHeight:19.32,margin: 8}}>le numéro de chassis ne doit pas contenir des valeurs comme ...</Text>
                                 
                                 <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <BackBtn onPress={()=>{setPage(page - 1)}}>
                                    <BackBtnText>Retour</BackBtnText>
                                </BackBtn>

                                <StyledNBtn onPress={()=>{setPage(page + 1)}}>
                                <StyledNBtnText>
                                Suivant
                                </StyledNBtnText>
                                </StyledNBtn>

                                </View>
                                </>
                                }

                                {page === 3 &&
                                <>
                                <SubTitle>Quel est la marque de votre véhicule ?</SubTitle>
                                <ModInput
                                    label=" "
                                    icon="car-outline"
                                    placeholder="Mercedes"
                                    placeholderTextColor='#6a6c7b'
                                    onChangeText={handleChange('marque')}
                                    onBlur={handleBlur('marque')}
                                    value={values.marque}
                                    isautoCapitalize
                                    cp='words'
                                />
                                                                 <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <BackBtn onPress={()=>{setPage(page - 1)}}>
                                    <BackBtnText>Retour</BackBtnText>
                                </BackBtn>

                                <StyledNBtn onPress={()=>{setPage(page + 1)}}>
                                <StyledNBtnText>
                                Suivant
                                </StyledNBtnText>
                                </StyledNBtn>

                                </View>
                                </>
                                }

                               {page ===4  &&
                               <>
                               <SubTitle>Quel est le modele de votre {values.marque == '' ? 'véhicule': values.marque} ?</SubTitle>
                               <ModInput
                                    label=" "
                                    icon="car-outline"
                                    placeholder="Entrez le modele"
                                    placeholderTextColor='#6a6c7b'
                                    onChangeText={handleChange('modele')}
                                    onBlur={handleBlur('modele')}
                                    value={values.modele}
                                    isautoCapitalize
                                    cp='words'
                                />
                                <Text style={{fontFamily: 'osr', fontSize: 12, lineHeight:19.32,margin: 8}}>Pour la marque Toyota les modeles sont yaris, starlet, camry...</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <BackBtn onPress={()=>{setPage(page - 1)}}>
                                    <BackBtnText>Retour</BackBtnText>
                                </BackBtn>

                                <StyledNBtn onPress={()=>{setPage(page + 1)}}>
                                <StyledNBtnText>
                                Suivant
                                </StyledNBtnText>
                                </StyledNBtn>

                                </View>
                                </>
                               }

                                {page === 7 &&
                                <>
                                <SubTitle>En quelle annee avez vous acquis votre {values.marque == '' ? 'véhicule': values.marque} ?</SubTitle>
                                <ModInput
                                    label=" "
                                    icon="car-outline"
                                    placeholder="2001"
                                    placeholderTextColor='#6a6c7b'
                                    onChangeText={handleChange('year')}
                                    onBlur={handleBlur('year')}
                                    value={values.year}
                                    keyboardType="numeric"
                                />
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <BackBtn onPress={()=>{setPage(page - 1)}}>
                                    <BackBtnText>Retour</BackBtnText>
                                </BackBtn>

                                <StyledNBtn onPress={handleSubmit}>
                                <StyledNBtnText>
                                Suivant
                                </StyledNBtnText>
                                </StyledNBtn>

                                </View>
                            </>
                            }
                                {page == 1 &&
                                <>
                                <SubTitle>Quel est le numéro d'Immatriculation de votre vehicule ?</SubTitle>
                                <ModInput
                                label=" "
                                icon="car"
                                placeholder="LT 075 DV"
                                placeholderTextColor='#6a6c7b'
                                onChangeText={handleChange('immat')}
                                onBlur={handleBlur('immat')}
                                value={values.immat}
                            />
                            {/*<Text style={{fontFamily: 'osr', fontSize: 12, lineHeight:19.32,margin: 20}}>entrez un matricule valide</Text>*/}
                            <View style={{padding: 16}}>
                                {!isSubmitting && <StyledBtn onPress={()=>{setPage(page + 1)}}>
                                    <StyledBtnText>
                                        Suivant
                                    </StyledBtnText>
                                </StyledBtn>}
                                </View>
                            </>
                                }
                                
                                    {page === 5 &&
                                    <>
                                    <SubTitle>Quel type de transmission possede votre {values.marque == '' ? 'véhicule': values.marque}?</SubTitle>
                                    <Spcr/>
                                    <StyledPicker
                                    style={{
                                            backgroundColor: '#edf2f7',
                                    }}
                                        selectedValue={selectedTrans}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setFieldValue('trans', itemValue)
                                            setSelectedTrans(itemValue)
                                            console.log(itemValue);
                                            console.log({values})
                                        }}
                                    >
                                        <StyledPicker.Item enabled={false} label="Transmission" value={null} />
                                        <StyledPicker.Item label="Manuelle" value="Manuelle" />
                                        <StyledPicker.Item label="Automatique" value="Automatique" />
                                    </StyledPicker>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <BackBtn onPress={()=>{setPage(page - 1)}}>
                                    <BackBtnText>Retour</BackBtnText>
                                </BackBtn>

                                <StyledNBtn onPress={()=>{setPage(page + 1)}}>
                                <StyledNBtnText>
                                Suivant
                                </StyledNBtnText>
                                </StyledNBtn>

                                </View>
                                    </>
                                    }

                                    {page === 6 &&
                                    <>
                                    <SubTitle>Quel type de carburant votre {values.marque == '' ? 'véhicule': values.marque} consome ?</SubTitle>
                                    <Spcr/>
                                    <StyledPicker
                                        selectedValue={selectedCarb}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setFieldValue('carb', itemValue)
                                            setSelectedCarb(itemValue)
                                            handleChange(itemValue);
                                            console.log(itemValue);
                                        }}
                                    >
                                        <StyledPicker.Item enabled={false} label="Carburant" value={null} />
                                        <StyledPicker.Item label="Essence" value="ESS" />
                                        <StyledPicker.Item label="Gasoil" value="GAS" />
                                    </StyledPicker>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <BackBtn onPress={()=>{setPage(page - 1)}}>
                                    <BackBtnText>Retour</BackBtnText>
                                </BackBtn>

                                <StyledNBtn onPress={()=>{setPage(page + 1)}}>
                                <StyledNBtnText>
                                Suivant
                                </StyledNBtnText>
                                </StyledNBtn>

                                </View>
                                </>
                                    }
                                    {page=== 8 &&
                                    <>
                                    {isLoading ? <Loadingscrn/> :
                                    <>
                                    <PageSubTitle>{message}</PageSubTitle>
                                    <StyledBtn onPress={()=>{navigation.navigate('home')}}>
                                        <StyledBtnText>
                                            Ok
                                        </StyledBtnText>
                                    </StyledBtn>
                                    </>
                                    }
                                    </>
                                    }
                                {/*<Msgbox type={messageType}>{message}</Msgbox>*/}
                                {/*{!isSubmitting && <StyledBtn onPress={handleSubmit}>
                                    <StyledBtnText>
                                        Ajouter le véhicule
                                    </StyledBtnText>
                                </StyledBtn>}

                                {isSubmitting && <StyledBtn disabled={true}>
                                    <ActivityIndicator size="small" color="#fff" />
                                    </StyledBtn>}*/}


                            </StyledFormArea>
                        )
                    }
                    </Formik>
                </InnerConatainer>
            </StyledContainer>
    )
}
const ModInput = ({ label, icon, isPassword, hidePassword, isautoCapitalize, cp,  setHidePassword, ...props }) => {

    return (
        <View>
            <LeftIcon><Icon color="#121212" type='ionicon' name={icon} size={28} /></LeftIcon>
            <StyledLabel>{label}</StyledLabel>
            { isautoCapitalize ?
                <StyledTextInput
                autoCapitalize = {cp}
                    {...props}

                />
                : 
                <StyledTextInput
                    {...props}

                />
        }
        </View>
    );

}

export default addcar
