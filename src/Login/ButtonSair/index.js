import { View, Pressable, Text, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import Save from './../../Save/index'
import { useNavigation } from '@react-navigation/native';

export default function ButtonSair() {
    const [login, setLogin] = useState('');
    const navigation = useNavigation();
    const [repetidor, setRepetidor] = useState(0)

    useEffect(() => {

        setTimeout(()=>{
            setRepetidor(repetidor + 1)
        },1000)

        Sair()
        async function Sair(){
            const Login = await Save.Load('Login')
            if(Login){
                setLogin(Login);
            }
        }

    }, [repetidor])

    function Logout(){
        Save.Sair()
        navigation.reset({

            index: 0,
            routes: [{ name: 'Login' }],

        });
    }

 return (
    <View style={{backgroundColor: '#448eca', width: 0.5 * Dimensions.get('window').width, padding: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20, flexDirection: 'row', alignItems: 'center'}}>
    <MaterialCommunityIcons name="account" size={30} color="#fff" />
    <Text style={{marginLeft: 10, color: '#FFF'}}>{login}</Text>
    <Pressable onPress={Logout} style={{marginLeft: 10}}>
        <Text style={{ color: '#FFF', fontWeight: 'bold'}}>
            Sair
        </Text>
    </Pressable>
</View>
  );
}