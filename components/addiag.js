import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import AnimatedMultistep from "react-native-animated-multistep";
import { Icon } from 'react-native-elements'

/* Define the steps  */

import Adi1 from "./steps/adi1";
import Adi2 from "./steps/adi2";
import Adi3 from './steps/adi3';
import { StyledBtn, StyledBtnText, StyledNBtn, StyledNBtnText } from './style';

const allSteps = [
    { name: "step 1", component: Adi1 },
    { name: "step 2", component: Adi2 },
    { name: "step 3", component: Adi3 },
];


/* Define your class */
export default class Diag extends Component {
    /* define the method to be called when you go on next step */

    constructor(props) {
        super(props);
        this.state = {
        // what ever
        };
    
        this.props.navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity                
                onPress={() => this.props.navigation.navigate('home',{refresh: true})}
            >
             <Icon style = {{paddingLeft : 10}} name="close" size={28} type='ionicon' color="#484848" />
            </TouchableOpacity>
    
            ),
        });
    }
    

    onNext = () => {
        console.log("Next");
        console.log(this.props)
    };

    /* define the method to be called when you go on back step */

    onBack = () => {
        console.log("Back");
    };

    /* define the method to be called when the wizard is finished */

    finish = (userState) => {
        console.log(userState);
    };
    /* render MultiStep */
    render() {
        return (
         
            <View style={{ backgroundColor: "#fff",
            height: 300,
            flex:1,
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            paddingTop:8, }}>
                <AnimatedMultistep
                    steps={allSteps}
                    onFinish={this.finish}
                    onBack={this.onBack}
                    onNext={this.onNext}
                    ontoggle = {this.props.toggle}
                    comeInOnNext="slideInRight"
                    comeInOnBack="slideInLeft"
                />
            </View>
        );
    }
}