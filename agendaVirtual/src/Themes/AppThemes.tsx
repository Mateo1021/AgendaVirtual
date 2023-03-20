import { StyleSheet, Text } from 'react-native';
export const colors = {
    primary:'#ed7c23',
    secundary:'#492013',
    blanco:'#ffffff',
    danger:'#ab0000',
    acesses: '#24ad22'
}
export const stylesApp = StyleSheet.create({
    
    globalMargin:{
        marginHorizontal:20
    },
    titles:{
        fontSize:30,
        color:'black',

    },
    generalText:{
        fontSize:20,
        color:'black'
    },
    avatar:{
        width:150,
        height:150,
        borderRadius:100,
    },
    continerAvatar:{
        alignItems:'center',
        paddingTop:30
    },
    contBtnMenuLat:{
        marginVertical:30,
        marginHorizontal:30,
    },
    btnMenuLat:{
        marginVertical:10
    },
    txtBtnMenuLat:{
        fontSize:20,
        color:'black'
    },
    inputGrup:{
        flex:1,
        padding :0 ,
        marginBottom: 15,
        borderBottomWidth:1,
        borderBottomColor: '#cccccc' ,
    },
    containerLogin:{
        flex:1,
        padding: 35,
    },
    inputsMaterias:{
        borderBottomWidth:1,
        borderColor:'black',
        color:'black'
    },
    cardTaskStyle:{
        height:180,
        borderRadius:18,
        borderWidth: 1,
        borderColor:'#cecece',
        textAlign: 'center',
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
    },
    textCardTitle:{
        margin:0,
        padding:0,
        fontSize:20,
        textAlign:'center',
        color:'black'
    },
    textCardBody:{
        fontSize:16,
        color:'black'
    },
    textCardFooter:{
        padding:0,
        margin:0,
        height:40,
        textAlign:'center',
        justifyContent:'center',
        textAlignVertical: "center",
    },
        styleCardTitel:{
        height:20,
        margin:0,
        padding:0,
        textAlign:'center'
    },
    textCardFooterButtom:{
        textAlign:'center',
        justifyContent:'center',
        textAlignVertical: "center",
    },
    selectComp: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    cardHoraario:{
        height:300,
        borderRadius:18,
        borderWidth: 1,
        borderColor:'#cecece',
        textAlign: 'center',
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
    },
    cardIdentit:{
        height:190,
        borderRadius:18,
        borderWidth: 1,
        borderColor:'#cecece',
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

    },
    stylHome:{
        flex: 2,
        flexDirection: 'column',
        justifyContent:'space-between' 
    },
    styleCarruserHome:{

    },
    stylePuntajeHome:{
        alignItems:'center',
        marginVertical:15,

    },
    styleidentitiHome:{

    }

});