import { StyleSheet } from "react-native";
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
    }
});