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
          source={{ uri: item.thumbnailUrl }}
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



//=================CALL IPA

// import React from 'react';
// import { FlatList, StyleSheet } from 'react-native';
// import { List, ListItem } from 'react-native-elements';
// class App extends React.Component {
//   state = {
//     seed: 1,
//     page: 1,
//     users: [],
//     isLoading: false,
//     isRefreshing: false,
//   };

//   handleRefresh = () => {
//     this.setState({
//       seed: this.state.seed + 1,
//       isRefreshing: true,
//     }, () => {
//       this.loadUsers();
//     });
//   };

//   handleLoadMore = () => {
//     this.setState({
//       page: this.state.page + 1
//     }, () => {
//       this.loadUsers();
//     });
//   };

//   componentDidMount() {

//     this.loadUsers();
//   };

//   loadUsers = () => {
//     const { users, seed, page } = this.state;
//     this.setState({ isLoading: true });

//     fetch('https://randomuser.me/api/?seed=${seed}&page=${page}&results=20')
//       .then(res => res.json())
//       .then(res => {
//         this.setState({
//           users: page === 1 ? res.results : [...users, ...res.results],
//           isRefreshing: false,
//         });
//       })
//       .catch(err => {
//         console.error(err);
//       });
//   };

//   render() {
//     const { users, isRefreshing } = this.state;

//     return (
//       <List style={style.scene}>
//         <FlatList
//           data={users}
//           renderItem={({ item }) => (
//             <ListItem
//               roundAvatar
//               title={item.name.first}
//               subtitle={item.email}
//               avatar={{ uri: item.picture.thumbnail }}
//             />
//           )}
//           keyExtractor={i => i.email}
//           refreshing={isRefreshing}
//           onRefresh={this.handleRefresh}
//           onEndReached={this.handleLoadMore}
//           onEndThreshold={0}
//         />
//       </List>
//     )
//   }
// }

// const style = StyleSheet.create({
//   scene: {
//     flex: 1,
//     paddingTop: 25,
//   },
//   user: {
//     width: '100%',
//     backgroundColor: '#333',
//     marginBottom: 10,
//     paddingLeft: 25,
//   },
//   userName: {
//     fontSize: 17,
//     paddingVertical: 20,
//     color: '#fff'
//   }

// });



