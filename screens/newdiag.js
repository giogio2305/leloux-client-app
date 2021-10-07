import React, { useState, useEffect, useContext, useLayoutEffect } from 'react'
import { StyledContainer, InnerConatainer,MainVbtn, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledLabel, StyledTextInput, RightIcon, StyledBtn, StyledBtnText, Msgbox, ExtraView, ExtraText, TextLink, TextLinkContent, OptIcon, EmptyArea, EmptyBadge, EmptyBadgeText, EmptyIbox, EmptyTitle, EmptySeText, NotifBadge, StyledView, HorView, StyledPicker, PageSubTitle, RecordingView, Spcr } from '../components/style'
import { Icon } from 'react-native-elements'
import { TouchableOpacity, View, ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../components/CredentialsContext';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import EmptyState from '../components/EmptyState';
import { Formik } from 'formik';
import { BottomSheet } from 'react-native-elements/dist/bottomSheet/BottomSheet';
import vn, { Vn } from '../components/vn';


const newdiag = ({ navigation }) => {
    const { storedCredentials, setStoredCrednetials } = useContext(CredentialsContext);
    const { nom, mail } = storedCredentials;
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [selectedTrans, setSelectedTrans] = useState(null);
    const [selectedCarb, setSelectedCarb] = useState(null);
    const [isRecording, setIsRecording] = useState();
    let [minutes, setMinutes] = useState(0);
    let [seconds, setSeconds] = useState(0);
    let [isClear, setIsClear]= useState(false);
    let interval;

    const start_timer = () => {
        setIsRecording(true);
    

    }

    

    const send = () => {
        setIsRecording(false)
    }
    return (
            <StyledContainer>
                <InnerConatainer>
                <Spcr />
                <Spcr />
                    <Formik
                    initialValues={{ owner: nom, chassis: '', marque: '', modele: '', year: '', immat: '', trans: '', carb: '' }}
                    onSubmit={(values, { setSubmitting }) => {
                        if (values.marque == '' || values.modele == '' || values.year == '' || values.immat == '' || values.trans == '' || values.carb == '') {
                            handleMessage("Remplissez tous les espaces")
                            setSubmitting(false);
                        } else {
                            handleSign(values, setSubmitting);
                        }
                    }}
                    >
                    {
                        ({ handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting, values }) => (
                           <StyledFormArea>

                                    <View>
                                    <StyledLabel>Type de carburant</StyledLabel>
                                    <StyledPicker
                                        mode='dropdown'
                                        selectedValue={selectedCarb}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setFieldValue('carb', itemValue)
                                            setSelectedCarb(itemValue)
                                            handleChange(itemValue);
                                            console.log(itemValue);
                                        }}
                                    >
                                        <StyledPicker.Item enabled={false} label="Veuillez choisir" value={null} />
                                        <StyledPicker.Item label="Essence" value="ESS" />
                                        <StyledPicker.Item label="Gasoil" value="GAS" />
                                    </StyledPicker>
                                    </View>
                               

                                    <View>
                                    <StyledLabel>Type de Transmission</StyledLabel>
                                    <StyledPicker
                                        selectedValue={selectedTrans}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setFieldValue('trans', itemValue)
                                            setSelectedTrans(itemValue)
                                            console.log(itemValue);
                                            console.log({ values })
                                        }}
                                    >
                                        <StyledPicker.Item enabled={false} label="Veuillez choisir" value={null} />
                                        <StyledPicker.Item label="Manuelle" value="Manuelle" />
                                        <StyledPicker.Item label="Automatique" value="Automatique" />
                                    </StyledPicker>
                                    </View>

                                <RecordingView>
                                    <Vn />
                                </RecordingView>
                                
                                <Msgbox type={messageType}>{message}</Msgbox>
                                {!isSubmitting && <StyledBtn onPress={handleSubmit}>
                                    <StyledBtnText>
                                        Ajouter le véhicule
                                    </StyledBtnText>
                                </StyledBtn>}

                                {isSubmitting && <StyledBtn disabled={true}>
                                    <ActivityIndicator size="small" color="#fff" />
                                </StyledBtn>}


                            </StyledFormArea>
                        )
                    }
                    </Formik>
                </InnerConatainer>
            </StyledContainer>
    )
}
export default newdiag
