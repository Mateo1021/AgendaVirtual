import * as React from 'react';
import { Text, View, StyleSheet, Image, Platform, Button } from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import { AuthContext } from '../Context/ContextUser/AuthContext';
import { useContext } from 'react';


export const ConfigScreen = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const [response, setResponse] = React.useState<any>(null);

  const { authState } = useContext(AuthContext);


  async function test (){
  console.log(response.assets[0].uri);
  const reference = storage().ref('userImgs/'+authState.uid);
  await reference.putFile(response.assets[0].uri);
  console.log(reference);
  
}
  const { open } = state;

 



  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {response?.assets &&
              response?.assets.map(({ uri }) => (
                  <View key={uri} style={styles.image}>
                      <Image
                          resizeMode="cover"
                          resizeMethod="scale"
                          style={{ width: 200, height: 200 }}
                          source={{ uri: uri }}
                      />
                  </View>
              ))}
          <Provider>
              <Portal>


                  <FAB.Group

                      fabStyle={styles.fab}
                      open={open}
                      icon={open ? 'minus' : 'plus'}
                      actions={[
                          {
                              icon: 'camera', small: false, onPress: () => {
                                  launchCamera({
                                      saveToPhotos: true,
                                      mediaType: 'photo',
                                      includeBase64: false,
                                  }, setResponse)
                              }
                          },
                          {
                              icon: 'image-area',
                              small: false,
                              onPress: () => {
                                  launchImageLibrary({
                                      selectionLimit: 0,
                                      mediaType: 'photo',
                                      includeBase64: false,
                                  }, setResponse)
                              },
                          },
                      ]}
                      onStateChange={onStateChange}
                      onPress={() => {
                          if (open) {
                              // do something if the speed dial is open
                          }
                      }}
                  />
              </Portal>
          </Provider>
          <Button
          title='test'
        onPress={()=> test()}
      />
      </View>
  );
}

const styles = StyleSheet.create({
  fab: {
      backgroundColor: '#EA5B70',
  },
  image: {
      marginVertical: 24,
      alignItems: 'center',
  }
})