import AsyncStorage from '@react-native-async-storage/async-storage';


const Load = async (ITEM) => {
    const token = await AsyncStorage.getItem(ITEM);
    return token;
}


const Salvar = (LOGIN, SENHA, CONSOLE, ESCOLA ) => {

    AsyncStorage.setItem("Login", String(LOGIN))
    AsyncStorage.setItem("Senha", String(SENHA))
    AsyncStorage.setItem("Console", String(CONSOLE))
    AsyncStorage.setItem("Escola", String(ESCOLA))

};

const Sair = () => {

    AsyncStorage.removeItem("Login")
    AsyncStorage.removeItem("Senha")
    AsyncStorage.removeItem("Console")
    AsyncStorage.removeItem("Escola")

};


export default { Salvar, Load, Sair }