import { View, Text, TextInput, ImageBackground, Dimensions, Image } from 'react-native';
import Estilo from '../Css/Entrada'
import { useState, useRef, useEffect } from 'react';
import { getData, getRandomInt } from '../Gerador/index'
import Socket from '../Socket/index'
import { Criptografar, Descriptografar } from './../Cripto/index'
import Download from './../DownloadImage/index'
import Save from '../Save';
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler';




export default function Home() {
    const [foto, setFotos] = useState(null)
    const [input, setInput] = useState('')
    const [Horas, setHoras] = useState('--:--:--')
    const [Nome, setNome] = useState('--:--:--')
    const [Atrasos, setAtrasos] = useState('--:--:--')
    const [Turma, setTurmas] = useState('--:--:--')
    const [Ativador, setAtivador] = useState('')
    const [duplicado, setDuplicado] = useState([])
    const [ResetFotos, setResetFotos] = useState(false)
    const navigation = useNavigation();
    const [loop, setLoop] = useState(0)


    const inputRef = useRef(null);

    useEffect(() => {

        setTimeout(() => setLoop(loop + 1), 1000)

        inputRef.current.focus();
        restartServer()

        if(loop !== 1200) return 
        
        setHoras('--:--:--');
        setNome('--:--:--');
        setAtrasos('--:--:--');
        setTurmas('--:--:--');
        setFotos(null);
        setAtivador('');
        setLoop(0)

    }, [loop])



    useEffect(() => {
        Receive()
        async function Receive() {
            Socket.socket.on(`EntradaResponse`, handleEntradaResponse);
            Socket.socket.on(`CarteirinhaVencida`, handleCarteirinhaVencida);
            Socket.socket.on(`AlunoNaoEncontrado`, handleAlunoNaoEncontrado);
        }

    }, []);

    const handleKeyPress = async ({ nativeEvent }) => {
        if (nativeEvent.key === 'Enter') {

            Socket.socket.emit('EntradaRequest', {
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


    const handleEntradaResponse = (data) => {
        const Resultado = Descriptografar(data.Resultado)

        if (Descriptografar(data.Code) === '9856321452') {

            setHoras(getRandomInt());
            setNome(Resultado[0].Aluno);
            setAtrasos(Resultado[0].Atrasos);
            setTurmas(Resultado[0].Turma);
            setFotos(Resultado[0].Imagem);

            if (duplicado.filter((c) => c.Codigo === Resultado[0].Codigo).length === 0) {
                setDuplicado([...duplicado, { Codigo: Resultado[0].Codigo }]);
            } else {
                Download.CarteirinhaDuplicada();
                setAtivador('DUPLICADA');
            }
        }
    };

    const handleCarteirinhaVencida = (data) => {
        const Resultado = Descriptografar(data.Resultado)
        if (Descriptografar(data.Code) === '9856321451') {
            Download.CarteirinhaVencida();
            setHoras(getRandomInt());
            setNome(Resultado[0].Aluno);
            setAtrasos(Resultado[0].Atrasos);
            setTurmas(Resultado[0].Turma);
            setFotos(Resultado[0].Codigo);
        }
        setAtivador('VENCIDA');
    };

    const handleAlunoNaoEncontrado = (data) => {
        if (Descriptografar(data.Code) === '9856321450') {
            setHoras('--:--:--');
            setNome('--:--:--');
            setAtrasos('--:--:--');
            setTurmas('--:--:--');
            setFotos(null);
            setAtivador('');
            Download.AlunoNaoEncontrado();
        }
    };

    function restartServer() {

        var today = new Date()
        const dayName = new Array("domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado")

        var HoraAtual = (((today.getHours()) < 10 ? ("0" + (today.getHours())) : (today.getHours())) + ":" + (today.getMinutes() < 10 ? ("0" + today.getMinutes()) : today.getMinutes()) + ":" + (today.getSeconds() < 10 ? ("0" + today.getSeconds()) : today.getSeconds()));


        if (dayName[today.getDay()] !== "sábado" && dayName[today.getDay()] !== "domingo") {
            //console.log(`${HoraAtual !== '15:39:00'}  ${HoraAtual}`)
            if (HoraAtual === '11:00:00' || HoraAtual === '17:00:00' || HoraAtual === '21:00:00') {
                navigation.reset({

                    index: 0,
                    routes: [{ name: 'Saida' }],

                });
            }
        }
    }


    function RestartImagem() {


        var today = new Date()
        const dayName = new Array("domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado")

        var HoraAtual = (((today.getHours()) < 10 ? ("0" + (today.getHours())) : (today.getHours())) + ":" + (today.getMinutes() < 10 ? ("0" + today.getMinutes()) : today.getMinutes()) + ":" + (today.getSeconds() < 10 ? ("0" + today.getSeconds()) : today.getSeconds()));


        if (dayName[today.getDay()] !== "sábado" && dayName[today.getDay()] !== "domingo") {

            if (HoraAtual === '7:30:00' || HoraAtual === '08:30:00' || HoraAtual === '09:30:00' || HoraAtual === '10:30:00') {
                setResetFotos(true)
            }
            if (HoraAtual === '13:30:00' || HoraAtual === '14:30:00' || HoraAtual === '15:30:00' || HoraAtual === '16:30:00') {
                setResetFotos(true)
            }
            if (HoraAtual === '19:30:00' || HoraAtual === '20:30:00') {
                setResetFotos(true)
            }
            if (HoraAtual === '10:59:00' || HoraAtual === '16:59:00' || HoraAtual === '20:59:00') {
                setResetFotos(false)
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
                    <TouchableOpacity onPress={() => navigation.reset({index: 0, routes:[{ name: 'Saida' }]})} style={Estilo.ViewTipo} >
                        <Text style={Estilo.TextTipo}>
                            ENTRADA
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


