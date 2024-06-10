import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import Save from './../Save/index'
import { Criptografar, Descriptografar } from './../Cripto/index'
import { getData, getRandomInt } from './../Gerador/index'
import Socket from '../Socket';

export default function Rotas() {

    const navigation = useNavigation();


    async function Login() {
        const Login = await Save.Load('Login')
        const Senha = await Save.Load('Senha')
        const Console = await Save.Load('Console')

        if (Login && Senha && Console) {


            Socket.socket.emit('Login', {
                Code: Criptografar('9856325646516'),
                Login: Criptografar(Login),
                Senha: Criptografar(Senha),
                Horas: Criptografar(getRandomInt()),
                Data: Criptografar(getData()),
            })


            Socket.socket.on(`AccessLogin`, (data) => {
                
                if (Descriptografar(data.Code) === '98563256465') {

                    if (Descriptografar(data.data) === 0) {
                        setMensagem('Login ou senha inválidos!');
                        setAtivador(true);
                        setAtivadorButton(false)

                    } else {

                        if (Console === '0') {
                            navigation.navigate('Home - Escolar')
                        }
                        if (Console === '1') {
                            navigation.navigate('Home - Direção')
                        }
                    }
                }
            })


        } else {

            navigation.reset({

                index: 0,
                routes: [{ name: 'Login' }],

            });

        }
    }


    useEffect(() => { Login() }, [])

}