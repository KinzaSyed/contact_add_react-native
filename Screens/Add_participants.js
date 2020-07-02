import React, {Component} from 'react';
import {Platform, View, Text, TextInput} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import All_contacts_list from '../Components/All_contacts_list';

class Add_participants extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Add Participants',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack(null)}>
          <Text
            style={{
              fontSize: 20,
              color: '#e74c3c',
              padding: 10,
              fontWeight: 'bold',
            }}>
            X
          </Text>
        </TouchableOpacity>
      ),
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      user_source: [],
      for_searched_source: [],
      selected_contacts: [],
    };
  }
  componentDidMount() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
      }).then(() => {
        Contacts.getAll((err, contacts) => {
          if (err === 'denied') {
            // error
            console.log(err);
          } else {
            // contacts returned in Array
            this.setState({
              user_source: contacts,
              for_searched_source: contacts,
            });
            //  console.log(contacts);
          }
        });
      });
    }
  }

  //need to seperate as well
  SearchContact = (value) => {
    let SearchedContact = this.state.for_searched_source.filter((item) => {
      return item.givenName.match(value);
    });
    this.setState({
      user_source: SearchedContact,
    });
  };

  NavigateToPrevious = () => {
    this.props.navigation.navigate('workspace_info', {
      title: 'Workspace Info',
    });
  };
  render() {
    return (
      <ScrollView>
        <SafeAreaView style={{flex: 1}}>
          <View>
            <Text style={{margin: 10}}>
              Select a contact to add, select it again to remove
            </Text>
            <View style={{margin: 10}} />
            <View style={{alignSelf: 'center'}}>
              <TextInput
                style={{
                  width: 370,
                  height: 40,
                  borderColor: 'black',
                  borderBottomWidth: 2,
                  padding: 10,
                  fontSize: 15,
                }}
                placeholder="Search by name, number or email"
                onChangeText={(text) => this.SearchContact(text)}
              />
            </View>
          </View>

          <All_contacts_list
            getContacts={this.state.user_source}
            passingNavigate={this.NavigateToPrevious}
          />
        </SafeAreaView>
      </ScrollView>
    );
  }
}
export default Add_participants;
