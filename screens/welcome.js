import React from 'react'
import { Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import logo from './../assets/hero.png'

const Welcome = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={logo} resizeMode='contain'/>

            <Text style={styles.mtitle}>Faciliter la prise en charge de vos vehicules </Text>

            <View>
            <Pressable  style={styles.cta} onPress={()=> navigation.navigate('Sign')}>
                <Text style={styles.ctt}>Commencer</Text>
            </Pressable>
            <View style={styles.lc}>
            <Text style={styles.ld}>Deja inscrit ? </Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Login')}><Text style={styles.lk}>connectez-vous</Text></TouchableOpacity>
            </View>
            </View>

        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {flex:1, backgroundColor: '#fff',alignItems:'center',justifyContent:'space-between', padding: 20,paddingBottom:48, paddingTop: 8,},
    logo: {width: 350, height: 350},
    mtitle: {fontFamily: 'ossemibold', fontSize: 28, lineHeight: 39, textAlign:'center'},
    cta: {width: 180,padding: 16, marginBottom: 12 ,backgroundColor: '#7e89c4', flexDirection: 'row', justifyContent: 'center',
                   alignItems: 'center',
                   borderRadius: 8,
                   color: '#fff',},
    ctt: {fontFamily: 'ossemibold',fontSize:14, color: '#fff',},
    lc: { flexDirection:'row',alignItems:'center',justifyContent:'center'},
    ld: {fontFamily: 'osr', fontSize: 14, lineHeight:19.32,},
    lk: {fontFamily: 'osr', fontSize: 14, lineHeight:19.32, color:'#707cbd'},

})
