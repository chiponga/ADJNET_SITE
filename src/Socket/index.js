import { io } from 'socket.io-client';
import Variaveis from './../../Variaveis.json'

const socket = io(`http://${Variaveis.ENDERECO}:${Variaveis.PORT}`, {
        transports: ['websocket'], // Especifica o transporte WebSocket
        withCredentials: true, // Habilita o envio de cookies de origem cruzada
        extraHeaders: {
            "my-custom-header": "value" // Adiciona cabeçalhos personalizados, se necessário
        }
    });



export default { socket }