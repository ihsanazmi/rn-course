import React, { useState } from 'react'
import { View, StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'

import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'
import NumberComponent from '../components/NumberComponent'

const StartGameScreen = props =>{
    const [enteredVal, setEnteredVal] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSetSelectedNumber] = useState()
    
    const numberInputHandler = inputText =>{
        setEnteredVal(inputText.replace(/[^0-9]/g, ''))
    } 

    const resetInputHandler = ()=>{
        setEnteredVal('')
        setConfirmed(false)
    }

    const confirmInputHandler = ()=>{
        const choosenNumber = parseInt(enteredVal)
        if( isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99){
            Alert.alert('Invalid Number!', 'Number has to be number from 1 to 99', [{text: 'Okay', style:'destructive', onPress:resetInputHandler}])
            return;
        }
         
        setConfirmed(true)
        setSetSelectedNumber(choosenNumber)
        setEnteredVal('')
        Keyboard.dismiss()
    }

    let confirmedOutput;
    if(confirmed){
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You Selected</Text>
                <NumberComponent>{selectedNumber}</NumberComponent>
                <Button title='START GAME!'/>
            </Card>
        )
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a Number!</Text>
                    <Input style={styles.input} 
                        blurOnSubmit 
                        autoCapitalize='none' 
                        keyboardType='number-pad' 
                        autoCorrect={false} 
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredVal}
                    />
                    <View style={styles.btnContainer}>
                        <View style={styles.btn}>
                            <Button title='Reset' onPress={resetInputHandler} color={Colors.accent} />
                        </View>
                        <View style={styles.btn}>
                            <Button title='Confirm' onPress={confirmInputHandler} color={Colors.primary}/>
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        padding: 10,
        alignItems:'center',
        justifyContent:'flex-start'
    },
    title:{
        fontSize: 20.,
        marginVertical:10,

    },
    inputContainer:{
        width: 300,
        maxWidth: '80%',
        alignItems:'center',
    },
    btnContainer : {
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        padding:15
    },
    btn : {
        width: 90
    },
    input:{
        width:50,
        textAlign:'center'
    },
    summaryContainer:{
        marginTop: 20,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default StartGameScreen