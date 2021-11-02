import React,{useState, useEffect} from 'react'
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, Text, View } from 'react-native'

const Picker = (props) => {


    const placeholder = {
        label: 'Selecione uma moeda...',
        value:null,
        color:'#000'
    }
    return (
        <RNPickerSelect
            placeholder={placeholder}
            items={props.moedas}
             onValueChange={props.onChange}
            style={{
                inputIOS:{
                    fontSize:20,
                    color:'#000'
                },
                inputAndroid:{
                    fontSize:20,
                    color:'#000'
                }
            }}
        
        />
    )
}

export default Picker

const styles = StyleSheet.create({})
