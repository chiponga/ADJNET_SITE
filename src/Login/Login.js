import { View, ImageBackground, Dimensions, Text, TextInput, TouchableOpacity, Image, Modal, ActivityIndicator } from 'react-native';
import Estilo from './../Css/Entrada';
import { useEffect, useState } from 'react';
import { Criptografar, Descriptografar } from '../Cripto';
import { useNavigation } from '@react-navigation/native';
import Save from './../Save/index';
import { getRandomInt, getData } from './../Gerador/index'
import Socket from '../Socket';


export default function Login() {

    const [Logins, setLogin] = useState('');
    const [Senha, setSenha] = useState('');
    const [Mensagem, setMensagem] = useState('');
    const [ativador, setAtivador] = useState(false);
    const [AtivadorButton, setAtivadorButton] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);

    const navigation = useNavigation();




    function Login() {

        setAtivador(false);
        setAtivadorButton(true);

        if (Logins.length === 0 || Senha.length === 0) {
            setMensagem('Preencha os espaços em branco!');
            setAtivador(true);
            setAtivadorButton(false)
        } else {

            Socket.socket.emit('Login', {
                Code: Criptografar('9856325646516'),
                Login: Criptografar(Logins),
                Senha: Criptografar(Senha),
                Horas: Criptografar(getRandomInt()),
                Data: Criptografar(getData()),

            })



            Socket.socket.on(`AccessLogin`, (data) => {

                if (Descriptografar(data.Code) === '98563256465') {
                    const BancoDeDados = Descriptografar(data.data)

                    if (BancoDeDados === 0) {
                        setModalVisible(true)

                        setTimeout(() => {

                            setMensagem('Login ou senha inválidos!');
                            setAtivador(true);
                            setAtivadorButton(false)
                            setModalVisible(false)
                            setLogin('')
                            setSenha('')
                        }, 2000)


                    } else {

                        if (BancoDeDados[0].Console === '0') {
                            setTimeout(() => {
                                setModalVisible(false)
                                Save.Salvar(Logins, Senha, BancoDeDados[0].Console, BancoDeDados[0].Escola )
                                navigation.navigate('Home - Escolar')
                            }, 2000)
                        }
                        if (Descriptografar(data.data)[0].Console === '1') {
                            setTimeout(() => {
                                setModalVisible(false)
                                Save.Salvar(Logins, Senha, BancoDeDados[0].Console, BancoDeDados[0].Escola)
                                navigation.navigate('Home - Direção')
                            }, 2000)
                        }

                    }

                }
            })
        }
    }


    return (
        <View style={Estilo.Total}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ImageBackground source={require("./../Assets/Fundo.jpg")} resizeMode='cover' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }} >
                    <View style={{ height: 0.5 * Dimensions.get('window').height, width: 0.5 * Dimensions.get('window').width, backgroundColor: "#FFF", alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 99, borderBottomRightRadius: 99 }} >

                        <Image

                            style={{
                                width: 100,
                                height: 100,

                            }}
                            source={require('./../Assets/Logo.png')}

                        />
                        <Text style={{ fontSize: 25, marginBottom: 20 }}>
                            Faça seu login
                        </Text>

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
                            placeholder='Digite seu login'
                            placeholderTextColor={"#8b8b8b"}
                            onChangeText={setLogin}
                            value={Logins}

                        />

                        <TextInput

                            style={{
                                height: 50,
                                width: '60%',
                                backgroundColor: "#FFF",
                                borderRadius: 99,
                                borderColor: '#8b8b8b',
                                borderWidth: 1,
                                textAlign: 'center',
                                fontSize: 15,
                                marginTop: 10
                            }}
                            placeholder='Digite sua senha'
                            placeholderTextColor={"#8b8b8b"}
                            onChangeText={setSenha}
                            secureTextEntry={true}
                            value={Senha}

                        />

                        <TouchableOpacity disabled={AtivadorButton} onPress={Login} style={{
                            height: 50,
                            width: '60%',
                            backgroundColor: AtivadorButton === true ? '#2e6089' : "#4ba2dd",
                            borderRadius: 99,
                            borderColor: '#8b8b8b',
                            borderWidth: 1,
                            textAlign: 'center',
                            fontSize: 15,
                            marginTop: 10,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{ color: '#FFF', fontSize: 15 }}>
                                Entrar
                            </Text>
                        </TouchableOpacity>

                        {ativador === true ?
                            <Text style={{ fontSize: 15, marginBottom: 20, color: 'red', marginTop: 20 }}>
                                {Mensagem}
                            </Text>
                            :

                            <></>
                        }


                    </View>
                </ImageBackground>

            </View>


            <Modal visible={modalVisible}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        height: '100%',
                        width: '100%',
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        shadowColor: 'rgba(0, 0, 0, 0.2)',
                        shadowOpacity: 0.8,
                        elevation: 6,
                        shadowRadius: 15,
                        shadowOffset: { width: 4, height: 13 },

                    }}>



                        <ActivityIndicator style={{ height: 100, width: 100 }} size="large" color={'blue'} />


                    </View>
                </View>
            </Modal>


        </View>
    );
}