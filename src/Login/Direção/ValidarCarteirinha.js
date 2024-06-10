import { View, Text, TextInput, ImageBackground, Dimensions } from 'react-native';
import { useState, useRef } from 'react';
import { Criptografar, Descriptografar } from './../../Cripto/index'
import Cabecalho from './../ButtonSair/index'
import { getAno } from './../../Gerador/index'
import Socket from '../../Socket';


export default function Home() {
  const [input, setInput] = useState('')
  const inputRef = useRef(null);
  const [Alertas, setAlertas] = useState({ Mensagem: '', Ativador: false })


  setInterval(() => {
    inputRef.current.focus();


  }, 200)

  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Enter') {

      Socket.socket.emit('Validar', {
        Code: Criptografar('1651653203'),
        Codigo: Criptografar(input.length === 0 ? '9999999' : input),
        Data: Criptografar(getAno() + '-03-30')

      })


      Socket.socket.on('CarteirinhaAtualizada', (data) => {
        if (Descriptografar(data.Code) === '98798456132') {

          setAlertas({ Mensagem: "Carteirinha validada com sucesso!", Ativador: true })

        }

      })

      Socket.socket.on('AlunoNaoEncontrado', (data) => {
        if (Descriptografar(data.Code) === '5456456465654') {

          setAlertas({ Mensagem: "Aluno não encontrado!", Ativador: true })

        }

      })

      Socket.socket.on('CarteirinhaJaValidada', (data) => {
        if (Descriptografar(data.Code) === '65486749848965') {

          setAlertas({ Mensagem: "Esta carteirinha ja foi validada!", Ativador: true })

        }
      })

      setInput('')

    }
  };



  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require("./../../Assets/Fundo.jpg")} resizeMode='cover' style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }} >
        <Cabecalho />
        <View style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20, height: 0.5 * Dimensions.get('window').height, width: 0.5 * Dimensions.get('window').width, backgroundColor: "#FFF", alignItems: 'center', justifyContent: 'center' }} >


          <Text style={{ fontSize: 25, marginBottom: 5, textAlign: 'center', width: 0.30 * Dimensions.get('window').width, fontWeight: 'bold', color: '#448eca' }}>
            Validação das carteirinhas.
          </Text>
          <Text style={{ fontSize: 13, marginBottom: 30 }}>
            Digite o codigo para validar
          </Text>
          {
            Alertas.Ativador === true ?
              <Text style={{ fontSize: 16, marginBottom: 20, textAlign: 'center', width: 0.40 * Dimensions.get('window').width, color: 'red' }}>
                {Alertas.Mensagem}
              </Text>

              :

              <></>
          }
          <TextInput
            style={{
              height: 50,
              width: '60%',
              backgroundColor: "#FFF",
              borderRadius: 99,
              borderColor: '#8b8b8b',
              borderWidth: 1,
              textAlign: 'center',
              fontSize: 15
            }}
            ref={inputRef}
            onChangeText={setInput}
            onKeyPress={handleKeyPress}
            value={input}
            placeholder='Codigo do aluno'
            placeholderTextColor={"#8b8b8b"}
          />
        </View>
      </ImageBackground>




    </View>
  );
}