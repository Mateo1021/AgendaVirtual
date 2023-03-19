import firestore from '@react-native-firebase/firestore';


export const useGetEventos = () => {
    let events: any = []
    const getEvents = async () => {
        const collection = await firestore().collection('evento').get();
        // @ts-ignore
        collection.forEach(doc => events.push(doc._data));
        return events;
    }
    return {
        getEvents
    }
}
