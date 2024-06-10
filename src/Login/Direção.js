import { View, ImageBackground, Dimensions, Text, Pressable, Modal, ActivityIndicator } from 'react-native';
import Estilo from './../Css/Entrada';
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import Cabecalho from './../Login/ButtonSair/index'


export default function Login() {


    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);


    return (
        <View style={Estilo.Total}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ImageBackground source={require("./../Assets/Fundo.jpg")} resizeMode='cover' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }} >
                    <Cabecalho />

                    <View style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20, height: 0.5 * Dimensions.get('window').height, width: 0.5 * Dimensions.get('window').width, backgroundColor: "#FFF", alignItems: 'center', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 25, marginBottom: 5, fontWeight: 'bold' }}>
                            Escolha o que deseja acessar!
                        </Text>
                        <Text style={{ fontSize: 15, marginBottom: 40 }}>
                            Clique para acessar
                        </Text>
                        <View style={{ width: '100%', justifyContent: 'space-around', flexDirection: 'row' }}>

                            <Pressable onPress={() => {
                                setModalVisible(true);
                                setTimeout(() => {
                                    navigation.navigate('Validar - Carteirinha')
                                    setModalVisible(false);
                                }, 2000)
                            }

                            } style={{
                                backgroundColor: "#fff",
                                height: 200,
                                width: 200,
                                borderRadius: 20,
                                shadowColor: '#000',
                                shadowOffset: {
                                    height: 0,
                                    width: 0
                                },
                                shadowOpacity: 0.5,
                                shadowRadius: 5,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <MaterialCommunityIcons name="smart-card-outline" size={100} color="#448eca" />
                                <Text style={{ fontSize: 15 }}>
                                    Validar Carteirinha
                                </Text>
                            </Pressable>



                            <Pressable onPress={() => {
                                setModalVisible(true);
                                setTimeout(() => {
                                    setModalVisible(false);
                                    navigation.navigate('Adicionar Escola')
                                }, 2000)

                            }}
                                style={{
                                    backgroundColor: "#fff",
                                    height: 200,
                                    width: 200,
                                    borderRadius: 20,
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        height: 0,
                                        width: 0
                                    },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                <MaterialCommunityIcons name="draw-pen" size={100} color="#448eca" />
                                <Text style={{ fontSize: 15 }}>
                                    Cadastrar escola
                                </Text>
                            </Pressable>


                        </View>


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