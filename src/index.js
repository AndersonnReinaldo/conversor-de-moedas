import React,{useEffect, useState, useRef} from 'react';
import { View, Text, StyleSheet,TextInput,TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native';
import Picker from './components/Picker';
import api from './services/api';


export default function Index() {

  const [moedas, setMoedas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [moedaSelecionada, setMoedaSelecionada] = useState(null);
  const [moedaBValor, setmoedaBValor] = useState(0);

  const [valorMoeda, setValorMoeda] = useState(0);
  const [valorConvertido, setValorConvertido] = useState(0);

  useEffect(() => {

          async function buscarMoedas(){

              const response = await api.get('all');
              let arrayMoedas = [];
              Object.keys(response.data).map((key, index) => {

                  arrayMoedas.push({
                    key:index,
                    label:key,
                    value:key
                  })
              })
              setMoedas(arrayMoedas);
              setLoading(false);
          }
          buscarMoedas();
  },[])


    async function converter(){

        if( moedaSelecionada === null || moedaBValor === 0){
           alert('PREENCHA TODOS OS CAMPOS!');
           return;
        }
          const response = await api.get(`all/${moedaSelecionada}-BRL`);

          let resultado = (response.data[moedaSelecionada].ask * parseFloat(moedaBValor));
          setValorConvertido(`R$ ${resultado.toFixed(2)}`);
          setValorMoeda(moedaBValor);

          //FECHA O TECLADO
          setmoedaBValor(0);
          Keyboard.dismiss();

        
    }

  if(loading){
    return <View style={styles.containerLoading}>
              <ActivityIndicator
              color='#FB4B57'
              size={45}
              />
            </View>
  }else{

    return (
      <View style={styles.container}>
        <View style={styles.areaMoeda}>
           <Text style={styles.titulo}>Selecione sua moeda</Text>
           <Picker moedas={moedas} onChange={(value) => setMoedaSelecionada(value)}/>
        </View>
   
        <View style={styles.areaValor}>
        <Text style={styles.titulo}>Digite um valor para converter em (R$)</Text>
         <TextInput 
             style={styles.input}
             placeholder='EX:150'
             keyboardType='numeric'
             onChangeText={(value) => setmoedaBValor(value)}
         />
        </View>
   
        <TouchableOpacity style={styles.botaoArea} onPress={() => converter()}>
          <Text style={styles.botaoTexto}>Converter</Text>
        </TouchableOpacity>

        {valorConvertido !== 0  &&  (
          <View style={styles.areaResultado}> 
           <Text style={styles.valorConvertido}>
              {`${valorMoeda} ${moedaSelecionada}`} 
            </Text>
            <Text style={[styles.valorConvertido, {fontSize:18, margin:10}]}>
              Corresponde a
            </Text>
            <Text style={styles.valorConvertido}>
              {valorConvertido}
            </Text>
          </View>
        ) }
       
     </View>
     
     ); 
  }
}

const styles = StyleSheet.create({

      container:{
        flex:1,
        alignItems: 'center',
        backgroundColor:'#101215',
        paddingTop:40
      },
      areaMoeda:{
        width:'90%',
        backgroundColor:'#f9f9f9',
        paddingTop:9,
        borderTopLeftRadius:9,
        borderTopRightRadius:9,
        marginBottom:1
      },
      titulo:{
        fontSize:15,
        color:'#000',
        paddingTop:5,
        paddingLeft:5,
      },
      areaValor:{
        width:'90%',
        backgroundColor:'#f9f9f9',
        paddingTop:9,
        paddingBottom:9,
      },
      input:{
        width:'100%',
        padding:10,
        height:45,
        fontSize:20,
        marginTop:8, 
        color:'#000'
      },
      botaoArea:{
        width:'90%',
        backgroundColor:'#FB4B57',
        height:45,
        borderBottomLeftRadius:9,
        borderBottomRightRadius:9,
        justifyContent:'center',
        alignItems: 'center',
      },
      botaoTexto:{
        fontSize:18,
        color:'#FFF',
        fontWeight:'bold',
      },
      areaResultado:{
        width:'90%',
        backgroundColor:'#FFF',
        marginTop:35,
        alignItems:'center',
        justifyContent: 'center',
        padding:25
      },
      valorConvertido:{
        fontSize:39,
        color:'#000',
        fontWeight:'bold'
      },
      containerLoading:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
      }


})