import styled from 'styled-components/native'
import { Image, Text, View, TextInput, Picker } from 'react-native'
import  Constants  from 'expo-constants'
import { Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';



export const Colors = {
    primary: '#ffffff',
    secondary: '#E5E7EB',
    tertiary: '#1F2937',
    darkLight: '#9CA3AF',
    brand: '#707cbd',
    green: '#10B981',
    red: '#EF4444',
    headcolor:'#484848',
  maincolor: '#6A6C7B',
};

const { primary, secondary, tertiary, darkLight, brand, green, red, headcolor, maincolor } = Colors;


const StatusBarHeight = Constants.statusBarHeight;

export const StyledContainera = styled.View`
flex: 1;
padding: 4%;
padding-top: ${StatusBarHeight - 2}px;
background-color : #fff;
margin: 0;
font-family: osr;
color: ${maincolor};
`;

export const StyledContainer = styled.View`
flex: 1;
padding: 18px;
padding-top: ${StatusBarHeight - 12}%;
background-color : #fff;
margin: 0;
font-family: osr;
color: ${maincolor};
`;
export const Spcr = styled.View`
height: 20px;
padding:8px;
`;
export const InnerConatainer = styled.View`
flex: 1;
width: 100%;
align-items: center;
`;

export const PageLogo = styled.Image`
width: 250px;
height: 200px;
`;

export const PageTitle = styled.Text`
font-size: 45.33px;
letter-spacing: 0.546px;
text-align: center;
font-family: osbold;
color: ${headcolor};
padding: 8px;
`;

export const Logo = styled.Text`
font-size: 45.33px;
letter-spacing: 0.41px;
text-align: center;
color: #707cbd;
font-family: Kabel;
padding: 4px;
`;


export const SubTitle = styled.Text`
font-size: 18px;
margin-top: 3px;
letter-spacing: 1px;
font-weight: normal;
color: ${headcolor};
font-family: osbold;
`;

export const PageSubTitle = styled.Text`
font-size: 20.66px;
margin-left: 5px;
margin-top: 5px;
margin-bottom: 10px;
letter-spacing: 0.04px;
font-family: osbold;
color: ${headcolor};
`;

export const StyledFormArea = styled.View`
width: 92%;
max-width: 100%;
margin-vertical: 20px;
`;

export const StyledTextInput = styled.TextInput`
background-color: #edf2f7;
padding: 12px;
font-size: 18px;
font-weight:500;
padding-left: 55px;
padding-right: 55px;
border-radius: 8px;
height: 55px;
margin-vertical: 4px;
margin-bottom: 6px;
font-family: osr;
color: ${maincolor};
`;


export const StyledLabel = styled.Text`
font-family: osr;
font-size: 18px;
font-weight: 500;
margin: 8px;
color: ${maincolor};
`;

export const LeftIcon = styled.View`
left: 15px;
top: 55px;
position: absolute;
z-index:1;
`;

export const RightIcon = styled.TouchableOpacity`
right: 15px;
top: 55px;
position: absolute;
z-index:1;
`;

export const StyledBtn = styled.Pressable`
  height: 45px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  background-color: #7e89c4;
  border-radius: 8px;
  padding: 12px;
  margin: 16px;
`;

export const StyledBtnText = styled.Text`
font-size: 16px;
line-height: 21px;
font-family: ossemibold;
letter-spacing: 0.25px;
color: #fff;
text-transform: none;
`;

export const StyledDbtn = styled.Pressable`
  height: 45px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  background-color: hsl(210, 9%, 96%);
  border-radius: 8px;
  padding: 12px;
  margin: 16px;
`;

export const StyledDbtnText = styled.Text`
font-size: 16px;
line-height: 21px;
font-family: ossemibold;
letter-spacing: 0.25px;
color: ${maincolor};
text-transform: none;
`;

export const Msgbox = styled.Text`
font-size: 14px;
font-weight: bold;
text-align: center;
color: ${(props) => (props.type == 'SUCCESS' ? green : red)};
`;

export const ExtraView = styled.View`
justify-content: center;
align-items: center;
flex-direction: row;
padding: -3px;
`;
export const ExtraViewa = styled.View`
justify-content: center;
align-items: center;
flex-direction: row;
padding: 12px;
`;

export const ExtraText = styled.Text`
justify-content: center;
align-items: center;
color: #6a6c7b;
font-size: 15px;
font-family: osr;
`;

export const TextLink = styled.TouchableOpacity`
justify-content: center;
align-items: center;
`;

export const TextLinkContent = styled.Text`
font-family: osr;
color: #707cbd;
font-size: 15px;
`;

export const EmptyArea = styled.View`
margin-top: 8%;
align-items: center;
justify-content: center;
margin-left: 16%;
margin-right: 16%;
max-width: 95%;
`;
export const EmptyIbox = styled.View`
  width: 150px;
  height: 150px;
  align-items: center;
  justify-content: center;
  margin-bottom: -4%;
`;
export const EmptyBadge = styled.View`
  position: absolute;
  right: 68;
  top: 21;
  background-color: ${brand};
  border-radius: 16;
  width: 32;
  height: 32;
  justify-content: center;
  align-items: center;
  z-index:1000;
  border: 3px solid #fff
`;

export const NotifBadge = styled.View`
  position: absolute;
  right: 1;
  top: 2;
  background-color: ${red};
  border-radius: 7;
  width: 14;
  height: 14;
  justify-content: center;
  align-items: center;
  z-index:1000;
  border: 2px solid #fff
`;

export const EmptyBadgeText = styled.Text`
font-size: 16px;
font-weight: bold;
color: #fff;
`;

export const EmptyTitle =styled.Text`
font-size: 22.66px;
font-family: osbold;
line-height: 32px;
text-align: center;
letter-spacing: -0.546px;
margin-vertical: -2%;
z-index:10000;
color: ${headcolor};
`;

export const EmptySeText = styled.Text`
font-size: 17.33px;
font-weight: normal;
line-height: 22px;
letter-spacing: -0.08px;
margin-vertical: 4%;
margin-bottom: 2%;
text-align: center;
font-family: osr;
color: ${maincolor};
`;

export  const StyledView =styled.View`
background-color: '#fff';
`;
export const HorView = styled.View`
flex: 1;
padding: 15px;
flex-direction: row;
justify-content: center;
align-items: center;
padding-left: 55px;
padding-right: 55px;
margin-vertical: 5px;
margin-bottom: 0px;
height: 45px;
`;

export const StyledPicker = styled.Picker`
background: #edf2f7;
padding: 8px;
font-size: 18px;
font-weight:500;
border-radius: 8px;
height: 45px;
width: 100%;
color: #6a6c7b;
margin: 5px;
`;

export const MainVbtn = styled.Pressable`
width: 52px;
height: 52px;
border-radius: 26px;
background-color: ${brand};
align-items: center;
justify-content: center;
margin-left: 8px;
`;

export const RecordingView = styled.View`
flex:1;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 15px;
align-items: center;
padding-left: 60px;
padding-right: 60px;
margin-vertical: 15px;
margin-bottom: 5px;
height: 55px;
`;

export const Liti = styled.View`
flex: 1;
flex:1;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

export const StyledPopUp = styled.View`
flex: 1;
width: 160px;
position: absolute;
right: 3;
top: 2;
justify-content:center;
align-item:center;
padding: 2rem;
background-color: #f4f4f4;
z-index: 100000;
`;

export const StyledPopItem = styled.Pressable`
flex:1;
justify-content:center;
align-item:center;
padding: 6px;
`;

export const StyledPopLink = styled.Text`
font-size: 16px;
font-weight: bold;
`;

export const Propa = styled.View`
flex:1;
max-height: 280px;
padding: 16px;
flex-direction: column;
align-items: center;
justify-content:center;
`;
export const PropaBar = styled.View`
align-items: center;
justify-content:center;
flex-direction: row;
`;

export const PropaBox = styled.View`
flex-direction: column;
align-items: center;
justify-content:center;
margin:8px;
`;
export const PropaTih = styled.Text`
font-size: 25px;
font-family: osbold;
line-height: 32px;
text-align: center;
letter-spacing: -0.146px;
color: ${headcolor};
margin: 8px;
`;
export const PropaTi =styled.Text`
font-size: 15.33px;
font-family: osbold;
line-height: 19px;
letter-spacing: -0.546px;
color: ${headcolor};
`;

export const PropaMt = styled.Text`
font-size: 12.8px;
font-family: osr;
line-height: 18px;
letter-spacing: -0.08px;
color: ${maincolor};
`;

export const Pamc = styled.View`
flex:1;
flex-direction: column;
align-items: baseline;
justify-content: flex-start;
padding: 20px;
`;


export const PaBar = styled.TouchableOpacity`
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 20px;
max-height: 75px;
width: 100%;
`;
export const PaBarM = styled.View`
flex-direction: row;
align-items: center;
justify-content: center;
padding: 0;
margin-vertical: 2%;
max-height: 75px;
`;

export const PaBox = styled.View`
flex-direction: column;
`;

export const Dvdr = styled.View`
height: 1px;
width: 100%;
background-color: #bbb;
`;

export const StyledNBtn = styled.Pressable`
  height: 45px;
  width:130px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  background-color: #7e89c4;
  border-radius: 8px;
  padding: 12px;
  margin: 4px;
`;

export const StyledNBtnText = styled.Text`
font-size: 16px;
line-height: 21px;
font-family: ossemibold;
letter-spacing: 0.25px;
color: #fff;
text-transform: none;
`;

export const StyledDnBtn = styled.Pressable`
  height: 45px;
  width:130px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  background-color: hsl(210, 9%, 96%);
  border-radius: 8px;
  padding: 12px;
  margin: 4px;
`;

export const StyledDnBtnText = styled.Text`
font-size: 16px;
line-height: 21px;
font-family: ossemibold;
letter-spacing: 0.25px;
color: ${maincolor};
text-transform: none;
`;
export const BackBtn = styled.Pressable`
  height: 45px;
  max-width:180px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  padding: 12px;
  margin: 15%;
`;

export const BackBtnText = styled.Text`
font-size: 16px;
line-height: 21px;
font-family: ossemibold;
letter-spacing: 0.25px;
color: ${headcolor};
text-transform: none;
`;

export const PropaTim =styled.Text`
font-size: 12.8px;
font-family: osbold;
line-height: 18px;
letter-spacing: -0.546px;
margin-top: 12px;
color: ${maincolor};
`;

export const Cardx = styled.Pressable`
flex-direction: column;
justify-content: center;
align-items: center;
background-color: ${(props) => (props.isSelected == true ? '#fff' : 'hsl(210, 9%, 96%)')};
width:92px;
height: 92px;
border-radius: 8px;
margin: 4px;
border:  1.8px solid ${(props) => (props.isSelected == true ? '#707cbd' : 'transparent')};
`;

export const Cardy = styled.TouchableOpacity`
max-width: 108px;
height: 114px;
border-radius: 8px;
padding: 18px;
background-color: #e2e5f2;
align-items: center;
justify-content: center;
margin-right: 16px;
border: 1.8px solid ${(props) => (props.isSelected == true ? '#707cbd' : 'transparent')};
`