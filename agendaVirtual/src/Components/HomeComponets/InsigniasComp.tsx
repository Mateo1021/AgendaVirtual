import React, { useLayoutEffect, useState } from 'react'
import { Image, Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
//@ts-ignore
export const InsigniasComp = ({ idImg }) => {
    /*     const [id, setid] = useState(0)
        useLayoutEffect(() => {
            setid(idImg)
            console.log(idImg);
        }, [])
         */
    const [modalVisible, setModalVisible] = useState(false);
    const [msjInsig, setmsjInsig] = useState('')
    function ImgInsig() {
        switch (idImg) {
            case 1:
                setmsjInsig('Insignia por buen cumplimento en actividades')
                return (
                    <View>
                        <Image
                            source={require('./insignias/1i.png')}
                        />
                    </View>
                )
                break;
            case 2:
                setmsjInsig('Insignia por participacion en los foros')
                return (
                    <View>
                        <Image
                            source={require('./insignias/2i.png')}
                        />
                    </View>
                )
                break;
            case 3:
                setmsjInsig('Insignia por poca participacion')
                return (
                    <View>
                        <Image
                            source={require('./insignias/3i.png')}
                        />
                    </View>
                )
                break;
            case 4:
                setmsjInsig('Insignia por responder cuestionarios')
                return (
                    <View>
                        <Image
                            source={require('./insignias/4i.png')}
                        />
                    </View>
                )
                break;
            case 5:
                return (
                    <View>
                        <Image
                            source={require('./insignias/5i.png')}
                        />
                    </View>
                )
                break;
            case 6:
                setmsjInsig('Insignia por buena navegacion web')
                return (
                    <View>
                        <Image
                            source={require('./insignias/6i.png')}
                        />
                    </View>
                )
                break;
            case 7:
                setmsjInsig('Insignia por buena redaccion de documentos')
                return (
                    <View>
                        <Image
                            source={require('./insignias/7i.png')}
                        />
                    </View>
                )
                break;
            case 8:
                return (
                    <View>
                        <Image
                            source={require('./insignias/8i.png')}
                        />
                    </View>
                )
                break;
            case 9:
                setmsjInsig('Insignia alta participacion en la app')
                return (
                    <View>
                        <Image
                            source={require('./insignias/9i.png')}
                        />
                    </View>
                )
                break;
            case 10:
                setmsjInsig('El mejor estudiante de la clase')
                return (
                    <View>
                        <Image
                            source={require('./insignias/10i.png')}
                        />
                    </View>
                )
                break;
            default:
                setmsjInsig('Participa y usa la app para que tus docentes te den insignias')
                return (
                    <View>
                        <Image
                            source={require('./insignias/11i.png')}
                        />
                    </View>
                )
                break;
        }
    }

    return (
        <View >
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{msjInsig}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Cerrar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>



            <TouchableOpacity
                onPress={() => setModalVisible(true)}
            >
                <ImgInsig></ImgInsig>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    
});