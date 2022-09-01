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
        color:'black'
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
        width:200,
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
        flex:1,
        textAlign: 'center',
        borderWidth: 1,
        borderColor:'#d4d4d4',
        borderTopLeftRadius: 18,
        borderTopRightRadius:18,
        paddingTop: 10,
        paddingBottom:8,
        color:'black'

    },
    textCardBody:{
        flex:5,
        color:'black'

    },
    textCardFooter:{
        flex:1,
        textAlign: 'center',
        borderWidth: 1,
        borderColor:'#d4d4d4',
        borderBottomLeftRadius: 18,
        borderBottomRightRadius:18,
        paddingTop: 8,
        paddingBottom:10,
        color:'black'
        
    }
});