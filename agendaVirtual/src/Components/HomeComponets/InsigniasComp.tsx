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
                setmsjInsig('Insignia nivel 1 por participacion en foros')
                return (
                    <View>
                        <Image
                            style={styles.tinyLogo}
                            source={require('./insignias/1i.png')}
                        />
                    </View>
                )
            case 2:
                setmsjInsig('Insignia nivel 1 por baja participacion')
                return (
                    <View>
                        <Image
                            style={styles.tinyLogo}
                            source={require('./insignias/2i.png')}
                        />
                    </View>
                )
            case 3:
                setmsjInsig('Insignia nivel 1 por participacion en catividades')
                return (
                    <View>
                        <Image
                            style={styles.tinyLogo}
                            source={require('./insignias/3i.png')}
                        />
                    </View>
                )
            case 4:
                setmsjInsig('Insignia nivel 1 por buenas busquedas en internet')
                return (
                    <View>
                        <Image
                            style={styles.tinyLogo}
                            source={require('./insignias/4i.png')}
                        />
                    </View>
                )
            case 5:
                setmsjInsig('Insignia nivel 1 por asistencia a eventos')
                return (
                    <View>
                        <Image
                            style={styles.tinyLogo}
                            source={require('./insignias/5i.png')}
                        />
                    </View>
                )
            case 6:
                setmsjInsig('Insignia nivel 1 por ser de los mejores en la clase')
                return (
                    <View>
                        <Image
                            style={styles.tinyLogo}
                            source={require('./insignias/6i.png')}
                        />
                    </View>
                )
            case 7:
                setmsjInsig('Insignia nivel 1 por tener los mejores puntajes')
                return (
                    <View>
                        <Image
                            style={styles.tinyLogo}
                            source={require('./insignias/7i.png')}
                        />
                    </View>
                )
            case 8:
                setmsjInsig('Insignia nivel 1 por hacer los mejores escritos')
                return (
                    <View>
                        <Image
                            style={styles.tinyLogo}
                            source={require('./insignias/8i.png')}
                        />
                    </View>
                )
            case 9:
                setmsjInsig('Insignia nivel 2 por participacion en foros')
                return (
                    <View>
                        <Image
                            style={styles.tinyLogo}
                            source={require('./insignias/9i.png')}
                        />
                    </View>
                )
            case 10:
                setmsjInsig('Insignia nivel 2 por baja participacion')
                return (
                    <View>
                        <Image
                            style={styles.tinyLogo}
                            source={require('./insignias/10i.png')}
                        />
                    </View>
                )
            case 11:
                setmsjInsig('Insignia nivel 2 por participacion en catividades')
                return (
                    <View>
                        <Image
                            style={styles.tinyLogo}
                            source={require('./insignias/11i.png')}
                        />
                    </View>
                )
            case 12:
                setmsjInsig('Insignia nivel 2 por buenas busquedas en internet')
                return (
                    <View>
                        <Image
                            style={styles.tinyLogo}
                            source={require('./insignias/12i.png')}
                        />
                    </View>
                )
            case 13:
                setmsjInsig('Insignia nivel 2 por asistencia a eventos')
                return (
                    <View>
                        <Image
                            style={styles.tinyLogo}
                            source={require('./insignias/13i.png')}
                        />
                    </View>
                )
            case 14:
                setmsjInsig('Insignia nivel 2 por ser de los mejores en la clase')
                return (
                    <View>
                        <Image
                            style={styles.tinyLogo}
                            source={require('./insignias/14i.png')}
                        />
                    </View>
                )
            case 15:
                setmsjInsig('Insignia nivel 2 por tener los mejores puntajes')
                return (
                    <View>
                        <Image
                            style={styles.tinyLogo}
                            source={require('./insignias/15i.png')}
                        />
                    </View>
                )
            case 16:
                setmsjInsig('Insignia nivel 2 por hacer los mejores escritos')
                return (
                    <View>
                        <Image
                            style={styles.tinyLogo}
                            source={require('./insignias/16i.png')}
                        />
                    </View>
                )
            default:
                setmsjInsig('Participa y usa la app para que tus docentes te den insignias')
                return (
                    <View>
                        <Image
                            style={styles.tinyLogo}
                            source={require('./insignias/17i.png')}
                        />
                    </View>
                )
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
    tinyLogo: {
        flex: 1,
        width: 250,
        height: 250,
        resizeMode: 'contain'
    },

});