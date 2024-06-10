import { View, Text, ImageBackground, TouchableOpacity, Dimensions, TextInput, ActivityIndicator, Modal, Pressable } from 'react-native';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import './../../Css/App.css'
import Estilo from './../../Css/Entrada.js';
import { Criptografar, Descriptografar } from './../../Cripto/index.js'
import Cabecalho from './../ButtonSair/index.js'
import Socket from '../../Socket/index.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [columnData, setColumnData] = useState(null);
    const [Banco, setBanco] = useState([])
    const [Mensagem, setMensagem] = useState('');
    const [Ativador, setAtivador] = useState(false);
    const [AtivadorButton, setAtivadorButton] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [ModalButton, setModalButton] = useState(false)
    const [contador, setContador] = useState(0)

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        // Ler o arquivo Excel
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Extrair os dados da primeira planilha
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Definir as colunas que você deseja extrair (Aqui exemplo A e B)
            const columnsToExtract = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
            const extractedData = {};

            columnsToExtract.forEach((col) => {
                extractedData[col] = [];
            });

            // Iterar sobre as células da planilha e extrair os dados das colunas desejadas
            Object.keys(sheet).forEach((cellAddress) => {
                const col = cellAddress.charAt(0);
                if (columnsToExtract.includes(col)) {
                    extractedData[col].push(sheet[cellAddress].v);
                }
            });

            // Definir os dados extraídos no estado
            setColumnData(extractedData);
        };

        reader.readAsArrayBuffer(file);
    };


    async function rodar() {
        setAtivadorButton(true)

        const Identification = await AsyncStorage.getItem('Login')

        for (let i = 1; i < columnData.A.length; i++) {
            Banco.push({ Codigo: columnData.A[i], Senha: 'e73d9330d802247ffdbf57bbf707b746d4c1c8c4', Autorization: columnData.C[i], Aluno: columnData.D[i], Escola: columnData.E[i], Modalidade: columnData.F[i], Data: columnData.G[i], Turma: columnData.H[i], AnoSerie: columnData.I[i], Turno: columnData.J[i], Sexo: columnData.K[i], Ano: columnData.L[i], Atrasos: columnData.M[i], Entradas: columnData.N[i] })
            setBanco([...Banco])
        }



        Socket.socket.emit('RegistrarEscola', {

            Code: Criptografar('968545616547'),
            Alunos: Criptografar(Banco),
            Escola: Criptografar(columnData.E[1]),
            Identification: Criptografar(Identification)

        })


        Socket.socket.on(`CriarDados${Identification}`, (data) => {
            if (Descriptografar(data.Code) === '9956546546521') {

                setAtivador(true)
                setMensagem("AGUARDE UM MOMENTO, ESTAMOS CRIANDO UMA LISTA DE ALUNOS!")
                setModalVisible(true)

            }
        })

        Socket.socket.on(`Contador${Identification}`, (data) => {
            if (Descriptografar(data.Code) === '65435436554') {

                setContador(Descriptografar(data.contador))

            }
        })

        Socket.socket.on(`Finalizar${Identification}`, (data) => {
            if (Descriptografar(data.Code) === '984854153165') {

                setMensagem("PRONTO, Terminamos!")
                setModalButton(true)

            }
        })
    }


    function fechar() {
        setModalVisible(false)
        setAtivador(false)
        setMensagem("")
        setModalVisible(false)
        setColumnData(null)
        setAtivadorButton(false)
        setBanco([])
        setSelectedFile(null)
        setModalButton(false)

    }


    return (

        <View style={Estilo.Total}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ImageBackground source={require("./../../Assets/Fundo.jpg")} resizeMode='cover' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }} >

                    <Cabecalho />
                    <View style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20, height: 0.5 * Dimensions.get('window').height, width: 0.5 * Dimensions.get('window').width, backgroundColor: "#FFF", alignItems: 'center', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 25, marginBottom: 20, fontWeight: 'bold' }}>
                            Selecione o arquivo excel.
                        </Text>


                        {columnData !== null ?
                            <View style={{ width: '100%', flexDirection: 'column', alignItems: 'center' }}>

                                <Text style={{ fontSize: 25, marginBottom: 10 }}>
                                    Escola: {columnData.E[1]} encontrada!
                                </Text>


                                <Pressable disabled={AtivadorButton} onPress={rodar} style={{
                                    height: 50,
                                    width: '40%',
                                    backgroundColor: AtivadorButton === true ? '#2e6089' : "#4ba2dd",
                                    borderRadius: 99,
                                    borderColor: '#8b8b8b',
                                    borderWidth: 1,
                                    fontSize: 15,
                                    marginTop: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{ fontSize: 16, color: '#FFF' }}>
                                        Cadastrar
                                    </Text>

                                </Pressable>
                            </View>
                            :
                            <div>
                                <input id="file-upload" className="custom-file-upload" type="file" onChange={handleFileChange} />
                            </div>
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

                        {Ativador === true ?

                            <View>
                                <Text style={{ fontSize: 20, marginBottom: 10, color: 'red', textAlign: 'center', width: 300 }}>
                                    {Mensagem}
                                </Text>
                                {
                                    contador > 0 ?
                                        <Text style={{ fontSize: 20, color: 'red', textAlign: 'center', width: 300 }}>
                                            {contador} / {Banco.length}
                                        </Text>
                                        :
                                        <></>
                                }
                            </View>
                            :
                            <></>
                        }

                        {ModalButton === true ?

                            <Pressable onPress={fechar} style={{
                                height: 50,
                                width: '40%',
                                backgroundColor: "#4ba2dd",
                                borderRadius: 99,
                                borderColor: '#8b8b8b',
                                borderWidth: 1,
                                fontSize: 15,
                                marginTop: 10,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{ fontSize: 16, color: '#FFF' }}>
                                    Finalizar
                                </Text>

                            </Pressable>

                            :

                            <ActivityIndicator style={{ height: 100, width: 100 }} size="large" color={'blue'} />

                        }



                    </View>
                </View>
            </Modal>

        </View>
    );


}