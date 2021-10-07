import React, { Component } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Liti, MainVbtn, RecordingView } from './style'
import { Icon } from 'react-native-elements'

export class Vn extends Component {
    constructor(props) {
        super(props);
        this.interval = 0;
        this.state = {
            seconds: 0,
            minutes: 0,
            isRecording: false,
            isPlaying: false,
            isRecorded: false,
        };
    }
 starttimer = () =>{
     this.setState({isRecording: true})
     this.interval = setInterval(() => {
         if (this.state.seconds >= 0) {
             this.setState({seconds : this.state.seconds += 1});
         }
         if (this.state.seconds === 59) {
             this.setState({minutes: this.state.minutes += 1});
             this.setState({seconds: this.state.seconds -= this.state.seconds});
         }
     }, 1000);
 }
cleartime = () => {
    clearInterval(this.interval);
    this.setState({ isRecording: false });
    this.setState({isRecorded: true});
}
playit = () =>{
    this.setState({isPlaying: true});
}
pauseit = () => {
    this.setState({isPlaying: false});
}
delit = () => {
    this.setState({seconds:0, minutes: 0});
    this.setState({isRecording: false, isRecorded: false});
}
    render() {
        const re = this.state.isRecording;
        const rd = this.state.isRecorded;
        const pl = this.state.isPlaying;
        return (
                <>
                    {
                    !re & !rd
                    ?
                    <MainVbtn onPress={this.starttimer}>
                        <Icon type="ionicon" color="#f5f5f5" size={24} name="mic-outline" />
                    </MainVbtn>
                    : null
                    }

                    {
                        re 
                        &&
                        <>
                        <Liti>
                            <MainVbtn onPress={this.cleartime}>
                                <Icon type="ionicon" color="#f5f5f5" size={24} name="stop" />
                            </MainVbtn>
                        </Liti>

                            <Liti>
                            <Icon type="ionicon" color="#EF4444" size={22} name="radio-button-on" />
                            <Text style={{ fontWeight: 'bold', fontSize: '16px' }}>{this.state.minutes}:{this.state.seconds < 10 ? 0 : ''}{this.state.seconds}</Text>

                            </Liti>
  </>
                    }

                    {
                        rd 
                        &&
                        <>
                        <Liti>
                            <MainVbtn onPress={pl ? this.pauseit : this.playit}>
                                {pl ? <Icon type="ionicon" color="#f5f5f5" size={24} name="pause-outline" />
                                    : <Icon type="ionicon" color="#f5f5f5" size={24} name="play-outline" />
                                }
                            </MainVbtn>
                        </Liti>
                                        <Liti>
                            <Text style={{ fontWeight: 'bold', fontSize: '16px' }}>{this.state.minutes}:{this.state.seconds < 10 ? 0 : ''}{this.state.seconds}</Text>
                            <Pressable onPress={this.delit}>
                                <Icon type="ionicon" color="#EF4444" size={24} name="trash-outline" />
                            </Pressable>
                                        </Liti>

                        
                        </>


                    }
                    </>
                   
        )
    }
}

export default Vn
