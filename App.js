import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet } from 'react-native';

const App = () => {
  const [disasterData, setDisasterData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetch('https://mysafeinfo.com/api/data?list=deadlyworlddisasters&format=json&case=default')
        .then((response) => response.json())
        .then((data) => {
          setDisasterData(data);
          setFilteredData(data);
        })
  }, []);

  const filterData = (text) => {
    setSearchText(text);
    if (text !== '') {
      const filtered = disasterData.filter((item) =>
          item.Name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(disasterData);
    }
  };

  const renderItem = ({ item }) => (
      <View style={styles.card}>
        <Text style={styles.title}>{item.Name}</Text>
        <Text style={styles.details}>Year: {item.Year}</Text>
        <Text style={styles.details}>Location: {item.Location}</Text>
        <Text style={styles.details}>Deaths: {item.Deaths.toLocaleString()}</Text>
      </View>
  );

  return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.header}>Deadliest World Natural Disasters</Text>
        <TextInput
            style={styles.searchBox}
            placeholder="Search by name..."
            value={searchText}
            onChangeText={filterData}
        />
        <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item.ID.toString()}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  searchBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
  },
});

export default App;
