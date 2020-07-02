import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Selected_contact_list from '../Components/Selected_contact_list';

class All_contacts_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_contacts: [],
      for_searched_source: [],
    };
  }
  onItemClick = (value) => {
    let arrayJSON = this.state.selected_contacts;
    if (arrayJSON.length > 0) {
      if (arrayJSON.includes(value)) {
        var toRemove = value;
        var index = arrayJSON.indexOf(toRemove);
        console.log('Index of ' + value + ' : ' + index);
        arrayJSON.splice(index, 1);
      } else if (!arrayJSON.includes(value)) {
        arrayJSON.push(value);
      }
    } else {
      arrayJSON.push(value);
    }

    this.setState({
      selected_contacts: arrayJSON,
    });
    console.log('Selected : ' + this.state.selected_contacts);
  };

  NavigateToPrevious = () => {
    this.props.passingNavigate?.(); // Same as this.props.onPress && this.props.onPress();
  };

  render() {
    return (
      <View>
        <Selected_contact_list
          getSelectedContacts={this.state.selected_contacts}
          passingNavigate={this.NavigateToPrevious}
        />
        <FlatList
          data={this.props.getContacts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.onItemClick(item)}>
              <View>
                <View style={{marginLeft: 20, marginRight: 20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      textAlign: 'left',
                      fontSize: 30,
                      marginTop: 10,
                    }}>
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                        backgroundColor: '#e74c3c',
                        alignItems: 'center',
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
                      <Text style={{fontSize: 15, marginLeft: 10}}>
                        {item.givenName +
                          ' ' +
                          item.middleName +
                          ' ' +
                          item.familyName}
                      </Text>
                      <Text style={{marginLeft: 10}}>
                        {item.phoneNumbers.map((phone) => (
                          <Text>{phone.number} </Text>
                        ))}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
export default All_contacts_list;
