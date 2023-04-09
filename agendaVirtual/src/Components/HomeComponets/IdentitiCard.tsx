import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
import { stylesApp } from '../../Themes/AppThemes';
import { useContext, useLayoutEffect } from 'react';
import { AuthContext } from '../../Context/ContextUser/AuthContext';
import { useIdentification } from '../../Hooks/UserHooks/useIdentification';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const IdentitiCard = (infoUser: any) => {
  const dataUser = infoUser.infoUser[0]._data;
  const { authState } = useContext(AuthContext);
  return (
    <TouchableOpacity>
      <View style={stylesApp.cardIdentit}>
        <View style={{
          flexDirection: 'row',
          paddingTop: 20,
          paddingHorizontal: 10,
          justifyContent: 'space-between'
        }}>
          <View>
            <Image
              style={{ width: 150, height: 150 }}
              source={{ uri: `${dataUser.foto}` }}
            />
          </View>
          <View style={{
            flexDirection: 'column',
            paddingHorizontal: 15,
            justifyContent: 'space-between'
          }}>
            <Text style={{
              fontWeight: 'bold',
              color: 'black',
            }}>{dataUser.Nombres} {dataUser.Apellidos}</Text>
            <Text style={{
              fontWeight: 'bold',
              color: '#ed7c23',
            }}>Activo</Text>
            <Text style={{
              color: 'black',
            }}>{dataUser.Correo}</Text>
            <Text style={{
              color: 'black',
            }}>{dataUser.Edad} Años</Text>
            <Text style={{
              color: 'black',
            }}>{dataUser.descripcion}</Text>
            <Text style={{
              color: 'black',
            }}>{dataUser.tel}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
