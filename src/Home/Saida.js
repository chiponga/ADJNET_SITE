import { View, Text, TextInput, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import Estilo from '../Css/Saida'
import { useState, useRef, useEffect } from 'react';
import { getData, getRandomInt } from '../Gerador/index'
import { Criptografar, Descriptografar } from './../Cripto/index'
import Download from './../DownloadImage/index'
import Socket from '../Socket';
import Save from './../Save/index'
import { useNavigation } from '@react-navigation/native'
import Rotas from '../Rotas';

export default function Home() {
    const [foto, setFotos] = useState('index')
    const [input, setInput] = useState('')
    const [Horas, setHoras] = useState('--:--:--')
    const [Nome, setNome] = useState('--:--:--')
    const [Atrasos, setAtrasos] = useState('--:--:--')
    const [Turma, setTurmas] = useState('--:--:--')
    const [loop, setLoop] = useState(0)
    const navigation = useNavigation();

    const inputRef = useRef(null);


    useEffect(() => {

        setTimeout(() => setLoop(loop + 1), 1000)

        inputRef.current.focus();
        restartServer()

        if (loop !== 1200) return

        setHoras('--:--:--');
        setNome('--:--:--');
        setAtrasos('--:--:--');
        setTurmas('--:--:--');
        setFotos('');
        setAtivador('');
        setLoop(0)

    }, [loop])




    useEffect(() => {
        Saida()
        async function Saida() {
            Socket.socket.on(`SaidaResponse`, handlerSaidaResponse)
            Socket.socket.on(`AlunoNaoEncontrado`, handlerAlunoNaoEncontrado)
        }

    }, [])


    const handleKeyPress = async ({ nativeEvent }) => {
        if (nativeEvent.key === 'Enter') {


            Socket.socket.emit('SaidaRequest', {
                Code: Criptografar('9856334874'),
                Codigo: Criptografar(input.length === 0 ? '9999999' : input),
                Horas: Criptografar(getRandomInt()),
                Data: Criptografar(getData()),
                Escola: Criptografar(await Save.Load('Escola')),
                Login: Criptografar(await Save.Load('Login'))
            })


            setInput('')
        }
    };


    const handlerAlunoNaoEncontrado = ((data) => {
        if (Descriptografar(data.Code) === '9856321450') {
            setHoras('--:--:--')
            setNome('--:--:--')
            setAtrasos('--:--:--')
            setTurmas('--:--:--')
            setFotos('')
            setAtivador('')
            Download.AlunoNaoEncontrado();
        }
    })

    const handlerSaidaResponse = ((data) => {
        const Resultado = Descriptografar(data.Resultado)

        if (Descriptografar(data.Code) === '9856321452') {

            setHoras(getRandomInt())
            setNome(Resultado[0].Aluno)
            setAtrasos(Resultado[0].Atrasos)
            setTurmas(Resultado[0].Turma);
            setFotos(Resultado[0].Imagem);
        }
    })

    function restartServer() {

        var today = new Date()
        const dayName = new Array("domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado")

        var HoraAtual = (((today.getHours()) < 10 ? ("0" + (today.getHours())) : (today.getHours())) + ":" + (today.getMinutes() < 10 ? ("0" + today.getMinutes()) : today.getMinutes()) + ":" + (today.getSeconds() < 10 ? ("0" + today.getSeconds()) : today.getSeconds()));


        if (dayName[today.getDay()] !== "sábado" && dayName[today.getDay()] !== "domingo") {
            //console.log(`${HoraAtual !== '15:39:00'}  ${HoraAtual}`)
            if (HoraAtual === '06:20:00' || HoraAtual === '12:20:00' || HoraAtual === '18:20:00') {
                navigation.reset({

                    index: 0,
                    routes: [{ name: 'Entrada' }],

                });
            }
        }
    }
    const screenDimensions = Dimensions.get('screen');
    const windowDimensions = Dimensions.get('window');
    const isPortrait = screenDimensions.height > screenDimensions.width;

    const imageHeight = isPortrait ? 0.60 * windowDimensions.height : '75%';
    const imageWidth = isPortrait ? 0.70 * windowDimensions.width : '25%';


    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require("./../Assets/Fundo.jpg")} resizeMode='cover' style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }} >
            <Image
                source={foto ? { uri: `data:image/jpeg;base64,${foto}` } : require('./../../Fotos/index.jpg')}
                style={ { height: imageHeight, width: imageWidth }}
                onError={() => {
                    this.setState({
                        fallback: require('./../../Fotos/index.jpg')
                    });
                }}
            />

                <View style={Estilo.ViewNome} >
                    <Text style={Estilo.TextNome}>
                        {Nome}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', maxWidth: '90%', marginBottom: 20 }}>
                    <View style={Estilo.ViewTurma} >
                        <Text style={Estilo.TextTurma}>
                            {Turma}
                        </Text>
                    </View>
                    <View style={Estilo.ViewEntrada} >
                        <Text style={Estilo.TextEntrada}>
                            {Horas}
                        </Text>
                    </View>
                    <View style={Estilo.ViewAtrasos} >
                        <Text style={Estilo.TextAtrasos}>
                            {Atrasos}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Entrada' }] })} style={Estilo.ViewTipo} >
                        <Text style={Estilo.TextTipo}>
                            SAIDA
                        </Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>

            <TextInput
                ref={inputRef}
                onChangeText={setInput}
                onKeyPress={handleKeyPress}
                value={input}
            />
        </View>
    );
}