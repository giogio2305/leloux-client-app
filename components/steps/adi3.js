import React, { Component } from "react";
import { Picker } from "react-native";
import { Image,Pressable, StyleSheet, View, TouchableOpacity, TextInput, Text,FlatList } from "react-native";
import { Icon } from 'react-native-elements'
import { Tile } from "react-native-elements/dist/tile/Tile";
import styled from "styled-components";
import { BackBtn, BackBtnText, BtnT, Cardx, EmptySeText, EmptyTitle, NextBtn, PropaTim, Spcr, StyledBtn, StyledBtnText, StyledDnBtn, StyledDnBtnText, StyledNBtn, StyledNBtnText, StyledPicker } from "../style";
import { CredentialsContext } from './../../components/CredentialsContext';
import axios from "axios";
import { SafeAreaView } from "react-native";
import { Dimensions } from "react-native";
import Modal from 'react-native-modal';
import env  from './../../env'




class Adi3 extends Component {
    static contextType = CredentialsContext
    constructor(props) {
        super(props);
        this.uri= env.api_url;
        this.renderItem = ({item, onPress}) => {
            return(            
                    <TouchableOpacity style={{        
                        width: Dimensions.get('screen').width -40,
                        marginVertical: 4,
                        paddingHorizontal:40,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        height: 56,
                    }}
                        key={item.id}
                        isSelected = {this.state.repa === item.id}
                        onPress={() => this.selectRepa(item.id)}
                        >
                        <View>
                        <Text style={{fontSize:16, color: '#2f3037', fontFamily: 'osbold',}}>{item.repa}</Text>
                        <Text style={{marginTop:4,fontSize:12, color: '#6A6C7B',fontFamily: 'osr',  overflow: 'hidden'}}>{item.cat == 'gar' ? 'Garage':'Reparateur'} | {item.add}</Text>
                        </View>
                        {this.state.repa === item.id 
                        ?
                        <Icon color="#707cbd" type='ionicon' name='checkmark-circle' size={28} />
                        :
                        <Icon color="#f4f4f4" type='ionicon' name='radio-button-off' size={28} />
        }
                    </TouchableOpacity>
        
                );
        
        }
        this.state = {
            fixas: [],
            totalSteps: "",
            currentStep: "",
            isSelected: {},
            repa: null,
            well: false,
            isModalVisible: false,
            isloading: false,
            isSuccess: false,
            isfailed: false,
            isNo: true
        };
        this.selectRepa = this.selectRepa.bind(this)
    }

    componentDidMount() {
        const { storedCredentials, setStoredCredentials } = this.context;
        const { nom, mail, id } = storedCredentials;
        axios
        .get( this.uri + "/crud/reparateurs")
    .then((response) => {
        const data = JSON.stringify(response.data.data);
        this.setState({fixas: response.data.data});
        console.log(id);
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
        const { next, getState } = this.props;
            // Save state for use in other steps
        console.log(this.props)
        // Go to next step
        next();
        console.log(getState().cars)
        this.setState({isloading: true, isNo: false});
        const values= {
            vid: getState().cars,
            syst: getState().syst,
            repaid: getState().repa,
            clid: getState().clid
        }
        axios
        .post( this.uri + '/crud/diagno', values)
        .then((response)=>{
            if(!response){
                console.log("Aucune reponse");
            }
                const result = response.data;
                    const {message, status, data} = result;

                    if(status !== 'SUCCESS'){
                        setTimeout(() => {
                            this.setState({isloading: false, isSuccess: false, isfailed: true});
                        }, 1500);
                                
                    }else{
                        setTimeout(() => {
                            this.setState({isloading: false, isSuccess: true, isfailed: false});
                        }, 1500);
                        
                    }
        })
        .catch(error =>{
            this.setState({isloading: false, isSuccess: false});
            console.log(error);
            console.log("Une erreur est survenue. Veerifiez votre connexion internet");
            
        })
    };

    goBack() {
        const { back } = this.props;
        // Go to previous step
        back();
    }

    offit(){
        const {ontoggle} = this.props
        ontoggle();
    }
    handlecheck = (pri)=>{
        return (event) =>{
            this.setState({
                isSelected: {
                  ...this.state.isSelected,
                  [pri]: !this.state.isSelected[pri],
                },
                
              });
                setTimeout(() => {
                    this.setState({repa: pri})
                    const ici =[this.state.isSelected]
                    alert(JSON.stringify(this.state.repa))
                }, 50);
              

        }
    }
    selectRepa(pri){
        const { next, saveState, finish } = this.props;
        if(this.state.repa === pri)
        {
        this.setState({repa: null})
        saveState({ repa: null });
    }else
    {
        this.setState({repa: pri})
        saveState({ repa: pri });
    }
    }
    render() {
        const { currentStep, totalSteps, selectedTrans, isSelected } = this.state;
        return (
            
            <View style={styles.container}>
                <View style={styles.tico}>
                    {this.state.isNo &&
                <Text style={styles.title}>
                        Choisissez votre reparateur</Text>
    }
                </View>
                
                <SafeAreaView style={styles.body}>
                {this.state.isloading && !this.state.isSuccess && !this.state.isfailed &&
                              <Image
                              style={{
                                    width: 68,
                                    height: 68,
                              }}
                              source={require('./../../assets/ldr.gif')}
                              />
                            }
                            {this.state.isSuccess && !this.state.isloading && !this.state.isfailed &&
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
                                >Demande envoyée</Text>
                                <Text                                 style={{
                                    fontSize: 17.33,
                                    fontFamily: 'osr',
                                    lineHeight: 22,
                                    letterSpacing: -0.08,
                                    textAlign: 'center',
                                    color: '#6A6C7B',
                                    marginVertical: 12,
                                }}>Vous recevrez une reponse d'ici peu.</Text>
                                </View>
                                </>
    }{this.state.isfailed && !this.state.isloading && !this.state.isSuccess &&
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
                                <Text                                 style={{
                                    fontSize: 17.33,
                                    fontFamily: 'osr',
                                    lineHeight: 22,
                                    letterSpacing: -0.08,
                                    textAlign: 'center',
                                    color: '#6A6C7B',
                                    marginVertical: 12,
                                }}>Une erreur est survenue.</Text>
                                </View>
                                </>
    }
{!this.state.isloading && !this.state.isSuccess && !this.state.isfailed &&
                <FlatList
                style={{
                    backgroundColor: '#mmm',
                }}
                    data ={this.state.fixas}
                    renderItem = {this.renderItem}
                    keyExtractor={item=>item.id.toString()}
                    />
                }
                </SafeAreaView>
                {this.state.isNo &&
          <View style={{
                    marginBottom: -44,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 65,
                    marginRight: 65, 
                }}>

                            <BackBtn onPress={this.props.back}>
                            <BackBtnText>Retour</BackBtnText>
                            </BackBtn>
                        {this.state.repa !== null?
                        
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
                }

            </View>

        );
    }
}



export default Adi3;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 12,
    },
    tico:{
        marginTop: 12,
        padding: 2,
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
        flex:1,
        flexDirection: 'row',
        marginVertical: 3,
        justifyContent: 'center',
        backgroundColor: '#707cbd'
    },
    body: {  
        marginLeft: 16,
        marginRight: 16, 
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

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
