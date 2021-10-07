import React, { useState } from 'react';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

import { Colors } from './../components/style';
const { darkLight, brand, primary, tertiary, secondary } = Colors;
// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CredentialsContext } from '../components/CredentialsContext';

import { View, Text } from 'react-native'
import { StyledContainer, InnerConatainer, PageLogo, PageSubTitle, SubTitle, StyledFormArea, LeftIcon, StyledLabel, StyledTextInput, RightIcon, StyledBtn, StyledBtnText, Msgbox, ExtraView, ExtraText, TextLink, TextLinkContent, OptIcon, EmptyArea, EmptyBadge, EmptyBadgeText, EmptyIbox, EmptyTitle, EmptySeText, NotifBadge, StyledView, StyledPopUp, StyledPopItem, StyledPopLink } from '../components/style'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native';
// screens
import Login from './../screens/loginscrn';
import Sign from './../screens/signscrn';
import Home from './../screens/profile';
import addcar from '../screens/addcar';
import newdiag from '../screens/newdiag';
import Notif from '../screens/notif';
import Histo from '../screens/historique';
import Params from '../screens/settings';
import Park from '../screens/params/parking';
import Compte from '../screens/params/compte';
import Aide from '../screens/params/aide';
import Diagno from '../screens/diagno';
import Diag from '../components/addiag';
import Welcome from '../screens/welcome';
import MailEdit from '../screens/MailEdit';
import PhoneEdit from '../screens/PhoneEdit';
import Car from '../screens/params/Car';
import Intervention from '../screens/Intervention';

const Stack = createStackNavigator();

const RootStack = () => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <CredentialsContext.Consumer>
            {({storedCredentials}) => (
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: 'transparent',
                            },
                            headerTintColor: tertiary,
                            headerTransparent: true,
                        }}
                        initialRouteName="welcome"
                    >
                        {storedCredentials ? (
                            <>
                            <Stack.Screen  name="home"   component={Home} />
                                <Stack.Screen name="addcar" options={{ headerTitle: 'Nouveau véhicule'}} component={addcar} />
                                <Stack.Screen name="newdiag" options={{ headerTitle: 'Demande de Diagnostic' }} component={newdiag} />
                                <Stack.Screen name="notif" options={{ headerTitle: 'Notifications',headerStyle:{backgroundColor:'#7e89c4',elevation: 0,borderBottomWidth: 0}, headerTransparent: false,headerTintColor: '#fff', }} component={Notif} />
                                <Stack.Screen name="histo" options={{ headerTitle: 'Historique',headerStyle:{backgroundColor:'#7e89c4',elevation: 0,borderBottomWidth: 0}, headerTransparent: false,headerTintColor: '#fff', }} component={Histo} />
                                <Stack.Screen name="params" options={{ headerTitle: 'Parametres',headerStyle:{backgroundColor:'#7e89c4',elevation: 0,borderBottomWidth: 0}, headerTransparent: false,headerTintColor: '#fff', }} component={Params} />
                                <Stack.Screen name="park" options={{ headerTitle: 'Parking',headerStyle:{backgroundColor:'#7e89c4',elevation: 0,borderBottomWidth: 0}, headerTransparent: false,headerTintColor: '#fff',}} component={Park} />
                                <Stack.Screen name="adddiag" options={{headerTitle: ' ',headerStyle:{backgroundColor:'#fff',elevation: 0,borderBottomWidth: 0}, headerTransparent: false,headerTintColor: '#484848',}} component={Diag} />
                                <Stack.Screen name="aide" options={{ headerTitle: 'Aide',headerStyle:{backgroundColor:'#7e89c4',elevation: 0,borderBottomWidth: 0}, headerTransparent: false,headerTintColor: '#fff', }} component={Aide} />
                                <Stack.Screen name="diagno" options={{headerTitle: ' ',headerStyle:{backgroundColor:'#7e89c4',elevation: 0,borderBottomWidth: 0}, headerTransparent: false,headerTintColor: '#fff', }} component={Diagno} />
                                <Stack.Screen name="car" options={{headerTitle: ' ',headerStyle:{backgroundColor:'#7e89c4',elevation: 0,borderBottomWidth: 0}, headerTransparent: false,headerTintColor: '#fff', }} component={Car} />
                                <Stack.Screen name="intervention" options={{headerTitle: ' ',headerStyle:{backgroundColor:'#7e89c4',elevation: 0,borderBottomWidth: 0}, headerTransparent: false,headerTintColor: '#fff', }} component={Intervention} />


                                <Stack.Screen name="mailedit" options={{headerTitle: ' ',headerStyle:{backgroundColor:'#fff',elevation: 0,borderBottomWidth: 0}, headerTransparent: false,headerTintColor: '#484848',}} component={MailEdit} />
                                <Stack.Screen name="phoneedit" options={{headerTitle: ' ',headerStyle:{backgroundColor:'#fff',elevation: 0,borderBottomWidth: 0}, headerTransparent: false,headerTintColor: '#484848',}} component={PhoneEdit} />

                            </>
                            )
                            : (
                            <>
                                <Stack.Screen name="welcome" component={Welcome} options={{headerTitle: ' ',headerStyle:{backgroundColor:'#fff',elevation: 0,borderBottomWidth: 0}, headerTransparent: false,headerTintColor: '#484848', }} />
                                <Stack.Screen name="Login" component={Login} options={{headerTitle: ' ',headerStyle:{backgroundColor:'#fff',elevation: 0,borderBottomWidth: 0}, headerTransparent: false,headerTintColor: '#484848', }} />
                                <Stack.Screen name="Sign" component={Sign} options={{headerTitle: ' ',headerStyle:{backgroundColor:'#fff',elevation: 0,borderBottomWidth: 0}, headerTransparent: false,headerTintColor: '#484848', }} />
                            </>
                            )}

                        
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </CredentialsContext.Consumer>
       
    );
};

export default RootStack;
