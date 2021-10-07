import React, { Component } from "react";
import { CredentialsContext } from './../../components/CredentialsContext';
import { Dimensions, Picker } from "react-native";
import { Image, StyleSheet, View, TouchableOpacity, TextInput, Text } from "react-native";
import { Icon } from 'react-native-elements'
import styled from "styled-components";
import { StyledBtn, StyledBtnText, StyledDbtn, StyledDbtnText, StyledPicker } from "../style";
import axios from "axios";
import env from './../../env'


class Adi1 extends Component {
    static contextType = CredentialsContext

    constructor(props) {
        super(props);
        this.uri = env.api_url;
        this.state = {
            cars: [],
            totalSteps: "",
            currentStep: "",
            selectedTrans: null,
            clientid: null,
        };
    }
    


    componentDidMount() {
        const { storedCredentials, setStoredCredentials } = this.context;
        const { nom, mail, id } = storedCredentials;
        this.setState({clientid: id});
        axios
        .get( this.uri +"/crud/Customers")
    .then((response) => {
        const data = JSON.stringify(response.data.data);
        const cars = JSON.parse(data)
        const carsnum = cars.filter(cars => cars.owner == nom);
        this.setState({cars: carsnum});
    })
    .catch(error => {console.log(error);})
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
        saveState({ cars: this.state.selectedTrans, clid: this.state.clientid });

        // Go to next step
        next();
    };

    goBack() {
        const { back } = this.props;
        // Go to previous step
        back();
    }

    render() {
        const { currentStep, totalSteps } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.tico}>
                    <Text style={styles.title}>
                        Quel véhicule a besion d'un diagnostic ?</Text>
                </View>

                <View style={styles.body}>

<View style={styles.picker}>
<View style={styles.sic}>
                    <Icon color="#6A6C7B" type='ionicon' name='car' size={24} />
                    </View>
<StyledPicker
mode = 'dropdown'
    selectedValue={this.state.selectedTrans}
    onValueChange={(itemValue, itemIndex) => {
        //setFieldValue('trans', itemValue)
        this.setState({selectedTrans: itemValue})

    }}
>
    <StyledPicker.Item enabled={false} label="Veuillez choisir" value={null} />
        {this.state.cars.map((car) => (
            <StyledPicker.Item style={{fontFamily: 'osr'}} key={car.id} label={car.marque} value={car.id} />
        ))}
</StyledPicker>
{/*<View style={styles.sic}>
                    <Icon color="#6A6C7B" type='ionicon' name='chevron-down' size={20} />
                    </View>*/}
</View>

</View>

                <View style={{
                    marginLeft: 15,
                    marginRight: 15,
                }}>
                    {this.state.selectedTrans !== null 
                    ?
                    <StyledBtn onPress={this.nextStep}>
                    <StyledBtnText>Suivant</StyledBtnText>
                </StyledBtn>
                :
                <StyledDbtn>
                    <StyledDbtnText>Suivant</StyledDbtnText>
                </StyledDbtn>
                    }

                </View>
            </View>
        );
    }
}

export default Adi1;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
    },
    tico:{
        margin: 16,
        maxWidth: 230,
        textAlign: 'center',
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
        marginVertical: 8,
    },
    body: {
        flex:1,
        justifyContent: 'center',
        marginHorizontal:  25, 
        alignItems: 'center',

    },
    picker: {
        backgroundColor: 'hsl(210, 9%, 96%)',
        paddingLeft: 40,
        paddingRight: 40,
        width: 220,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
    },
    
});
