import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native';

class Selected_contact_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_contacts: [],
    };
    this.onDoneClick = this.onDoneClick.bind(this);
  }
  NavigateToPrevious = () => {
    this.props.passingNavigate?.(); // Same as this.props.onPress && this.props.onPress();
  };
  onDoneClick() {
    let data = this.props.getSelectedContacts;
    console.log(data);
    AsyncStorage.setItem('selected_Members', JSON.stringify(data)).then(() =>
      console.log('stored'),
    );
    Alert.alert('Saved !');
    this.NavigateToPrevious();
  }
  componentDidMount() {
    AsyncStorage.getItem('selected_Members')
      .then((result) => {
        if (result != null) {
          //result exists
          console.log('Storage data [ ' + JSON.parse(result) + ']');
        } else {
          console.log('Storage data empty');
        }
      })
      .catch((err) => {});
  }
  render() {
    return (
      <View
        style={{
          marginLeft: 10,
          marginRight: 10,
          marginTop: 5,
          marginBottom: 5,
        }}>
        <FlatList
          horizontal
          data={this.props.getSelectedContacts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity>
              <View>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    backgroundColor: '#e74c3c',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      marginTop: 8,
                      color: '#fff',
                    }}>
                    {item.givenName.charAt(0).toUpperCase() +
                      item.middleName.charAt(0).toUpperCase() +
                      item.familyName.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View>
                  <Text style={{fontSize: 15, alignSelf: 'center'}}>
                    {item.givenName +
                      ' ' +
                      item.middleName +
                      ' ' +
                      item.familyName +
                      ' '}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        <View style={{margin: 30}}>
          <View style={{marginTop: 10}}>
            <View style={{marginLeft: 20, marginRight: 20}}>
              <TouchableOpacity
                onPress={() => this.onDoneClick()}
                style={{
                  borderRadius: 15,
                  backgroundColor: '#000',
                  padding: 5,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    alignSelf: 'center',
                    color: '#fff',
                  }}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default Selected_contact_list;
