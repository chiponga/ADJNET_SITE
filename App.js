import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import Rotas from './src/Rotas/index.js'
import Entrada from './src/Home/Entrada.js'
import Saida from './src/Home/Saida.js'
import Login from './src/Login/Login.js';
import Direction from './src/Login/Direção.js';
import Escola from './src/Login/Escola.js';
import ADDEscola from './src/Login/Direção/AddEscola.js'
import ValidarCarteirinha from './src/Login/Direção/ValidarCarteirinha.js'




import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Rotas" component={Rotas} />
        <Stack.Screen name="Entrada" component={Entrada} />
        <Stack.Screen name="Saida" component={Saida} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home - Direção" component={Direction} />
        <Stack.Screen name="Home - Escolar" component={Escola} />
        <Stack.Screen name="Adicionar Escola" component={ADDEscola} />
        <Stack.Screen name="Validar - Carteirinha" component={ValidarCarteirinha} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

