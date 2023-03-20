import firestore from '@react-native-firebase/firestore';


export const useAddResponse = () => {
    let date = new Date();
    let respId:any =[] ;

    const AddResponse = async (data:any)=>{

        const collection = await firestore().collection('respuestas').get();
        collection.forEach(doc => respId.push(doc.id));
    
        respId.sort((a:any, b:any) => {
            return a.split('_')[1] - b.split('_')[1];
    
         });
        let idArrayUser : number =  respId[respId.length - 1].split('_')[1];
        let idArrayUserNumber = "res_"+(++idArrayUser);


        
        firestore()
        .collection('respuestas').doc(idArrayUserNumber)
        .set({
            bodyMsj:data.bodyMsj,
            codRegistro:data.codRegistro,
            createdAt:data.date,
            idUser:data.idUser,
            nameUser:data.nameUser
        })
    }
  return {
    AddResponse
  }
}
