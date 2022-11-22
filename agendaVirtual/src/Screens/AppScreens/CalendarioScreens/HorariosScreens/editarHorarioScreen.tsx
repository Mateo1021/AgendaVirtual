import React from 'react'
import { Text, View,Button, FlatList } from 'react-native'
import { colors } from '../../../../Themes/AppColors';
import { StackScreenProps } from '@react-navigation/stack';
import { useMaterias } from '../../../../Hooks/HorarioHooks/useMaterias';
import { ListaMaterias } from '../../../../Components/MateriasComponets/ListaMaterias';


interface Props extends StackScreenProps<any, any> {};
export const editarHorarioScreen = ({ navigation }: Props) => {
  const {isLoading,materias,getMateriasUser}= useMaterias();

  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      getMateriasUser();
    });
    return focusHandler;
  }, [navigation]);

  return (
    <View>
        <Text style={{color:'black'}}>Editar Horarios</Text>
        <FlatList
        data={materias}
        renderItem={({item}:any)=> <ListaMaterias materias={item}></ListaMaterias>}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        keyExtractor={(item)=> item.id.toString()}
        />
        <Button 
            color={colors.primary}
            title='Agregar Materias'
            onPress={()=>navigation.navigate('addMateriasScreen')}
          ></Button>
          <Button 
            color={colors.primary}
            title='Configurarr'
            onPress={()=>navigation.navigate('viewHorarioScreen',materias)}
          ></Button>
    </View>
  )
}
