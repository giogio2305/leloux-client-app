import React from 'react'
import { StyleSheet,Image, Text, View } from 'react-native'

const Loadingscrn = () => {
    return (
        <View style={styles.container}>
                                              <Image
                              style={{
                                    width: 68,
                                    height: 68,
                              }}
                              source={require('./../assets/ldr.gif')}
                              />
        </View>
    )
}

export default Loadingscrn

const styles = StyleSheet.create({
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    zIndex: 1000
}
})
