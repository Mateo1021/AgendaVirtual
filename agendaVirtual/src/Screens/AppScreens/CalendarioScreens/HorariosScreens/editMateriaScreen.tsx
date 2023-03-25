import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import { EditMateriaComp } from '../../../../Components/MateriasComponets/EditMateriaComp';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, stylesApp } from '../../../../Themes/AppThemes';
import { useNavigation } from '@react-navigation/native';

//@ts-ignore
export const editMateriaScreen = ({ route }) => {

    const navigation = useNavigation();

    const [dataMateria, setdataMateria] = useState({
        codHorario: "",
        codMateria: "",
        nombre: "",
        periodo: "",
        repet: []
    })
    const [repetD, setrepetD] = useState([])

    useLayoutEffect(() => {
        // @ts-ignore
        var unsubscribe2 = firestore().collection("Materia").where("codMateria", "==", route.params.idMateria)
            .onSnapshot((querySnapshot) => {
                var res: any = [];
                querySnapshot.forEach((doc) => {
                    // @ts-ignore
                    setdataMateria(doc.data())
                    for (let x in doc.data().repet) {
                        res.push({
                            dia: doc.data().repet[x].dia,
                            horaI: doc.data().repet[x].horaI,
                            horaF: doc.data().repet[x].horaF,
                            id: x,

                        })
                    }
                    setrepetD(res)
                });
            });
        return unsubscribe2;
    }, [])


    const delRepeat = (id: string) => {
        //@ts-ignore
        const result = repetD.filter(x => x.id !== id);
        let arrayRepet = []
        for (let i in result) {
            arrayRepet.push({
                //@ts-ignore
                dia: result[i].dia,
                //@ts-ignore
                horaF: result[i].horaF,
                //@ts-ignore
                horaI: result[i].horaI
            })

        }
        firestore().collection("Materia").doc(dataMateria.codMateria).update({
            repet: arrayRepet
        })
    }
    return (
        <View>
            <View style={styles.containerGen}>
            <Text style={stylesApp.titles}>{dataMateria.nombre}</Text>
            </View>

            <SwipeListView
                data={repetD}
                renderItem={(data, rowMap) => (
                    <View style={styles.containerGenE}>
                        <View style={styles.horarioC}>
                            <Text style={styles.txtMateriaE}>
                                {/* @ts-ignore */}
                                {data.item.dia}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.txtMateriaE}>
                                {/* @ts-ignore */}
                                {data.item.horaI}
                            </Text>
                            <Text style={styles.txtMateriaE}>
                                {/* @ts-ignore */}
                                {data.item.horaF}
                            </Text>
                        </View>
                    </View>
                )}
                renderHiddenItem={(data, rowMap) => (
                    <View style={styles.backOptions} >
                        <TouchableOpacity
                            // @ts-ignore
                            onPress={() => delRepeat(data.item.id)}
                        >
                            <Icon name={'ios-trash-bin-outline'} size={30} color='#fff' />
                        </TouchableOpacity>
                    </View>
                )}
                leftOpenValue={75}
                rightOpenValue={-75}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    containerGen: {
        alignItems: 'center',
        marginBottom: 30
    },
    txtMateria: {
        fontSize: 20,
        color: 'black'
    },
    btnFuntions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
        marginBottom: 30
    },
    btn: {
        paddingHorizontal: 10
    },
    backOptions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: colors.primary,
        flex: 1,
        paddingHorizontal: 20,

    },
    optLeft: {

    },
    containerGenE: {
        borderColor: '#DEDEDE',
        borderBottomWidth: 1,
        shadowColor: '#404040',
        paddingHorizontal: 30,
        paddingVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    txtMateriaE: {
        fontSize: 20,
        color: 'black'
    },
    horarioC: {
        justifyContent: 'center'
    }
});
