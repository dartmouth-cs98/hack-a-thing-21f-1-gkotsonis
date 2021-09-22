// author: Gabe Kotsonis
// code largely comes from this tutorial: https://www.raywenderlich.com/485-react-native-tutorial-building-ios-apps-with-javascript
// purpose: display and provide functionality for the search page

'use strict';

import {thisExpression} from '@babel/types';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import axios from 'axios';
import SearchResults from './SearchResults';

// function to get the url and page from a query
function jsonForQuery(value, pageNumber) {
  var axios = require('axios').default;

  var options = {
    method: 'GET',
    url: 'https://realty-mole-property-api.p.rapidapi.com/saleListings',
    params: {city: value, state: 'MA'},
    headers: {
      'x-rapidapi-host': 'realty-mole-property-api.p.rapidapi.com',
      'x-rapidapi-key': '91da2804a4msh5bba9b4abacf2bep1eab06jsn90179197f62c',
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      //   console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
}

// search page component
export default class SearchPage extends Component<{}> {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      searchString: 'Boston',
      isLoading: false,
      message: '',
      queryResults: [],
    };
  }

  // handle text input
  _onSearchTextChanged = event => {
    // let txt = event.nativeEvent.text;
    this.setState({searchString: event.nativeEvent.text});
  };

  // handle search button pressed
  _onSearchPressed = async () => {
    // console.log('HELLOOOOOOOO');
    let queryResults = await jsonForQuery(this.state.searchString, 1);
    this.setState({
      queryResults,
    });
  };

  // handle response
  _handleResponse = response => {
    this.setState({isLoading: false, message: ''});
    if (response.application_response_code.substr(0, 1) === '1') {
      console.log('Properties found');
    } else {
      this.setState({message: 'Location not recognized; please try again.'});
    }
  };

  // format search results
  _formatResults = () => {
    let res = this.state.queryResults.map(result => ({
      rawAddress: result.rawAddress,
      bedrooms: result.bedrooms,
      bathrooms: result.bathrooms,
      squareFootage: result.squareFootage,
      price: result.price,
    }));
    return <FlatList data={res} renderItem={this._renderItem(res)} />;
    return res;
  };

  // render search results
  _renderItem = results => {
    return (
      <View>
        <Text>{results.rawAddress}</Text>
        <Text>{results.bedrooms}</Text>
        <Text>{results.bathrooms}</Text>
        <Text>{results.squareFootage}</Text>
        <Text>{results.price}</Text>
      </View>
    );
  };

  // render search page
  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size="large" />
    ) : null;

    return (
      <View style={styles.container}>
        <Text style={styles.description}>Search for houses to buy in MA!</Text>
        <Text style={styles.description}>Search by city or town name.</Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            placeholder="Search via name or postcode"
            onChange={this._onSearchTextChanged}
          />
          <Button onPress={this._onSearchPressed} color="#48BBEC" title="Go" />
        </View>
        {this.state.queryResults && this.state.queryResults.length ? (
          this._formatResults()
        ) : (
          // (
          //   <View>
          //     {this.state.queryResults.map(result => (
          //       <View>
          //         <Text>{result.addressLine1 || 'No Address'}</Text>
          //       </View>
          //     ))}
          //   </View>
          // ))
          <Image
            source={require('./Resources/house.png')}
            style={styles.image}
          />
        )}

        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}

// styling
const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center',
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',
  },
  image: {
    width: 217,
    height: 138,
  },
});
