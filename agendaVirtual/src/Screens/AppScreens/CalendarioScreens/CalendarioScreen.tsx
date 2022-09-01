import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';


const timeToString = (time : any) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

export const CalendarioScreen: React.FC = () => {
  const [items, setItems] = useState({});

  const loadItems = (day: any) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time: any = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime : any = timeToString(time);
        // @ts-ignore
        if (!items[strTime]) {
          // @ts-ignore
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            // @ts-ignore
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems : any= {};
      Object.keys(items).forEach((key) => {              
        // @ts-ignore
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item : any) => {
    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>{item.name}</Text>
              <Avatar.Text label="J" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={'2022-07-31'}
        renderItem={renderItem}
      />
    </View>
  );
};