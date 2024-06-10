import  { Audio } from 'expo-av';





async function AlunoNaoEncontrado(){

  const { sound } =  await Audio.Sound.createAsync(require('./../Assets/Audio/02.mp3'));

  console.log('Playing Sound');
    await sound.playAsync();

}

async function CarteirinhaVencida(){

  const { sound } =  await Audio.Sound.createAsync(require('./../Assets/Audio/03.mp3'));

  console.log('Playing Sound');
    await sound.playAsync();

}

async function CarteirinhaDuplicada(){

  const { sound } =  await Audio.Sound.createAsync(require('./../Assets/Audio/01.mp3'));

  console.log('Playing Sound');
    await sound.playAsync();

}



export default { AlunoNaoEncontrado, CarteirinhaVencida, CarteirinhaDuplicada }