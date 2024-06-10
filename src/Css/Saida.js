import { View, StyleSheet, Dimensions } from 'react-native';
import Cores from '../Cores/index.json'
import { RFValue } from "react-native-responsive-fontsize";

export default StyleSheet.create({

    Input: {

        backgroundColor: "#FFF",
        borderRadius: 100,
        textAlign: 'center',
        borderColor: Cores.Button,
        borderWidth: 4,
        fontSize: RFValue(6),

    },

    Image: Dimensions.get('screen').height > Dimensions.get('screen').width ?
        {

            height: 0.60 * Dimensions.get("window").height,
            width: 0.60 * Dimensions.get("window").width,
            borderRadius: '20%',
            marginTop: 20

        }
        :
        {

            height: '75%',
            width: '25%',
            borderRadius: '20%',


        },

    teste: {
        alignItems: 'center',
        marginTop: -0.95 * Dimensions.get("window").height,


    },
    Total: {
        flex: 1,
    },
    CorpoTotalView: {
        marginLeft: 0.40 * Dimensions.get("window").width,
        marginTop: 0.20 * Dimensions.get("window").height,
        alignItems: 'center'
    },
    ViewNome: Dimensions.get('screen').height > Dimensions.get('screen').width ?
        {
            backgroundColor: "#FFF",
            height: 0.08 * Dimensions.get("window").height,
            width: 1 * Dimensions.get("window").width,
            maxWidth: '90%',
            maxHeight: '9%',
            borderRadius: 2000,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 30,
            marginTop: 20

        }
        :
        {
            backgroundColor: "#FFF",
            height: 0.08 * Dimensions.get("window").height,
            width: 0.60 * Dimensions.get("window").width,
            borderRadius: 2000,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 30,
            marginTop: 20

        }
    ,
    TextNome: {
        fontSize: RFValue(18),
        fontWeight: 'bold',
        color: "#454545",
        textAlign: 'center'
    },
    ViewTurma: Dimensions.get('screen').height > Dimensions.get('screen').width ?
        {
            backgroundColor: "#FFF",
            height: 0.05 * Dimensions.get("window").height,
            width: 0.25 * Dimensions.get("window").width,
            maxWidth: '20%',
            maxHeight: '50%',
            borderRadius: 100,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
   

        }
        :
        {
            backgroundColor: "#FFF",
            height: 0.08 * Dimensions.get("window").height,
            width: 0.12 * Dimensions.get("window").width,
            borderRadius: 100,
            marginTop: 20,
            justifyContent: 'center',
            padding: 30,
            alignItems: 'center',

        }
    ,
    ViewEntrada: Dimensions.get('screen').height > Dimensions.get('screen').width ?
        {
            backgroundColor: "#FFF",
            height: 0.05 * Dimensions.get("window").height,
            width: 0.25 * Dimensions.get("window").width,
            maxWidth: '20%',
            maxHeight: '50%',
            borderRadius: 100,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',

        } :
        {
            backgroundColor: "#FFF",
            height: 0.08 * Dimensions.get("window").height,
            width: 0.12 * Dimensions.get("window").width,
            borderRadius: 100,
            marginTop: 20,
            justifyContent: 'center',
            padding: 30,
            marginLeft: 10,
            alignItems: 'center',
            marginLeft: 20
        }
    ,
    ViewAtrasos: Dimensions.get('screen').height > Dimensions.get('screen').width ?
        {
            backgroundColor: "#FFF",
            height: 0.05 * Dimensions.get("window").height,
            width: 0.25 * Dimensions.get("window").width,
            maxWidth: '20%',
            maxHeight: '50%',
            borderRadius: 100,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',


        }
        :
        {
            backgroundColor: "#FFF",
            height: 0.08 * Dimensions.get("window").height,
            width: 0.10 * Dimensions.get("window").width,
            borderRadius: 100,
            marginTop: 20,
            justifyContent: 'center',
            padding: 30,
            marginLeft: 10,
            alignItems: 'center',
            marginLeft: 20

        }
    ,
    ViewTipo: Dimensions.get('screen').height > Dimensions.get('screen').width ?
        {
            backgroundColor: '#fb9d9d',
            height: 0.05 * Dimensions.get("window").height,
            width: 0.25 * Dimensions.get("window").width,
            maxWidth: '20%',
            maxHeight: '50%',
            borderRadius: 100,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',


        }
        :
        {
            backgroundColor: '#fb9d9d',
            height: 0.08 * Dimensions.get("window").height,
            width: 0.10 * Dimensions.get("window").width,
            borderRadius: 100,
            marginTop: 20,
            justifyContent: 'center',
            padding: 30,
            marginLeft: 10,
            alignItems: 'center',
            marginLeft: 20

        }
    ,
    TextTurma: {
        fontSize: RFValue(12),
        fontWeight: 'bold',
        color: "#454545"
    },
    TextEntrada: {
        fontSize: RFValue(12),
        fontWeight: 'bold',
        color: "#454545"
    },
    TextAtrasos: {
        fontSize: RFValue(12),
        fontWeight: 'bold',
        color: "#454545"
    },
    TextTipo: {
        fontSize: RFValue(12),
        fontWeight: 'bold',
        color: "red"
    },
    Atrasado: {
        fontSize: RFValue(50),
        fontWeight: 'bold',
        color: 'red'
    }


})