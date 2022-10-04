import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';

const App = () => {

  const [data, setdata] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {

    getListPhotos();

    return () => {

    }
  }, []) //render lai list

  getListPhotos = () => {
    const apiURL = 'https://jsonplaceholder.typicode.com/photos';
    fetch(apiURL)
      .then((res) => res.json())
      .then((resJson) => {
        setdata(resJson)
      }).catch((error) => {
        console.log('Error: ', error);
      }).finally(() => setLoading(false))
  }

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>

        <Image style={styles.img}
          source={{ uri: item.url }}
          resizeMode='contain'
        />

        <View style={styles.fromText}>
          <Text style={styles.text}>{item.title}</Text>
        </View>

      </View>
    )
  }

  return (
    <View style={styles.conotainer}>

      {isLoading ? <ActivityIndicator /> : (

        <FlatList style={styles.list}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => `key-${item.id}`}
        />
      )}
    </View>
  );
};

// ======= css
const styles = StyleSheet.create({
  conotainer: {
    flex: 1,
    backgroundColor: 'while'
  },

  list: {
    flex: 1,
    padding: 5,
    margin: 5
  },

  item: {
    flexDirection: 'row',
    marginTop: 5,
    padding: 5,
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOpacity: 0.25
  },

  img: {
    width: 100,
    height: 150,
    borderRadius: 0
  },

  text: {
    fontSize: 17,
    color: '#000000',
    fontStyle: 'italic'

  },

  fromText: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10
  }

});
export default App;
//done
