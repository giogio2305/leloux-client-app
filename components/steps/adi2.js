import React, { Component } from "react";
import { Dimensions, Picker } from "react-native";
import { Image, StyleSheet, View, TouchableOpacity, TextInput, Text } from "react-native";
import { Icon } from 'react-native-elements'
import { Tile } from "react-native-elements/dist/tile/Tile";
import styled from "styled-components";
import { BackBtn, BackBtnText, BtnT, Cardx, NextBtn, PropaTim, Spcr, StyledBtn, StyledBtnText, StyledDnBtn, StyledDnBtnText, StyledNBtn, StyledNBtnText, StyledPicker } from "../style";

class Adi2 extends Component {
    constructor(props) {
        super(props);
        this.items = [
            {
                title: 'Climatisation',
                icon: 'snow-outline',
                isSelected: false
            },
            {
                title: 'Electricité',
                icon: 'flash-outline',
                isSelected: false
            },
            {
                title: 'Electronique',
                icon: 'git-compare-outline',
                isSelected: false
            },
            {
                title: 'Mécanique',
                icon: 'build-outline',
                isSelected: false
            },
            {
                title: 'Thermique',
                icon: 'flame-outline',
                isSelected: false
            },
            {
                title: 'Inconnu',
                icon: 'help-circle-outline',
                isSelected: false
            },
        ]
        this.state = {
            totalSteps: "",
            currentStep: "",
            selectedTrans: '',
            isSelected: {},
            syst: null
        };

        this.selectSyst = this.selectSyst.bind(this)
    }

    static getDerivedStateFromProps = props => {
        const { getTotalSteps, getCurrentStep } = props;
        return {
            totalSteps: getTotalSteps(),
            currentStep: getCurrentStep()
        };
    };

    nextStep = () => {
        const { next, saveState } = this.props;
        // Save state for use in other steps
        saveState({ syst: this.state.syst });

        // Go to next step
        next();
    };

    goBack() {
        const { back } = this.props;
        // Go to previous step
        back();
    }

    handlecheck = (slct, title)=>{
        return (event) =>{
            this.setState({
                isSelected: {
                  ...this.state.isSelected,
                  [title]: !this.state.isSelected[title],
                  well: this.state.isSelected[title]
                }
              });
                setTimeout(() => {
                    this.setState({well: this.state.isSelected[title],syst: title})
                }, 200);
              

        }
    }

    selectSyst(title){
        if(this.state.syst === title)
        {
            this.setState({syst: null})
        }else{
        this.setState({syst: title})
        }
    }
    render() {
        const { currentStep, totalSteps, selectedTrans, isSelected } = this.state;
        const items = this.items;
        const {syst} =this.state;
        return (
            <View style={styles.container}>
                <View style={styles.tico}>
                <Text style={styles.title}>
                        Quel systeme suspectez-vous ?</Text>
                </View>
                <View style={styles.body}>
                    {items.map((item)=>{
                        return(
                            <Checkcard
                            key={item.title}
                            title = {item.title}
                            icon = {item.icon}
                            isSelected = {syst === item.title}
                            onPress={() => this.selectSyst(item.title)}
                            />
                        );
                    })}
                
                
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: '45%',
                    paddingTop: 32,
                    
                }}>

                            <BackBtn onPress={this.props.back}>
                            <BackBtnText>Retour</BackBtnText>
                            </BackBtn>
                        {this.state.syst !== null ?
                        
                        <StyledNBtn onPress={this.nextStep}>
                            <StyledNBtnText>Suivant</StyledNBtnText>
                        </StyledNBtn>
                        :
                        <StyledDnBtn>
                            <StyledDnBtnText>
                                Suivant
                            </StyledDnBtnText>
                        </StyledDnBtn>
    }
                        




                </View>
            </View>
        );
    }
}
const Checkcard = ({icon, title, onPress, isSelected}) =>{
    return (
                <Cardx onPress={onPress} 
                isSelected ={isSelected}
>
        <Icon color="#6A6C7B" type='ionicon' name={icon} size={32} />
        <PropaTim>{title}</PropaTim>
                </Cardx>
    );
}
export default Adi2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        padding: 12,
    },
    tico:{
        flex: 0.2,
        margin: 8,
        maxWidth: 230,
    },
    title: {
            fontSize: 20,
            fontFamily: 'osbold',
            lineHeight: 28,
            letterSpacing: -0.146,
            textAlign: 'center',
        color: '#2f3037',
    },
    foot: {
        flex: 0.2,
        flexDirection: 'row',
        marginVertical: 3,
        justifyContent: 'center',
        backgroundColor: '#707cbd'
    },
    body: {  
        flex: 0.6,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: Dimensions.get('screen').height / 16,
        marginHorizontal: Dimensions.get('screen').width - 8,
        justifyContent: 'center',
        width: Dimensions.get('screen').width - 90,

    },
    picker: {
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'hsl(210, 9%, 96%)',
        height: 92,
        width: 92,
        padding: 2,
        borderRadius: 8,
        margin: 4,
        borderColor: '#707cbd',
        borderWidth:  1.8,
    }
});
