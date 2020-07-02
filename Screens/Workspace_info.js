import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  AsyncStorage,
} from 'react-native';
import Selected_members_for_group from '../Components/Selected_members_for_group';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

class Workspace_info extends Component {
  static navigationOptions = {
    headerTitle: 'Workspace Info',
  };
  constructor(props) {
    super(props);
    this.state = {
      selected_members: [],
    };
    this.AddPart_Handler = this.AddPart_Handler.bind(this);
  }

  AddPart_Handler() {
    this.props.navigation.navigate('add_participants', {
      title: 'Add Participants',
    });
  }
  componentDidMount() {
    this.t = setInterval(() => {
      AsyncStorage.getItem('selected_Members')
        .then((result) => {
          if (result != null) {
            //result exists
            this.setState({
              selected_members: JSON.parse(result),
            });
            console.log('Storage data : ' + result);
          } else {
            console.log('Storage data empty');
          }
        })
        .catch((err) => {});
    }, 1000);
  }

  render() {
    return (
      <ScrollView>
        <SafeAreaView>
          <View style={{alignSelf: 'center'}}>
            <Image
              style={{width: 70, height: 70, margin: 20}}
              source={{
                uri:
                  'http://savings.gov.pk/wp-content/plugins/ldd-directory-lite/public/images/noimage.png',
              }}
            />
          </View>

          <View style={{margin: 10}} />

          <View style={{alignSelf: 'center'}}>
            <TextInput
              style={{
                width: 370,
                height: 40,
                borderColor: 'black',
                borderBottomWidth: 2,
                padding: 10,
                fontSize: 20,
                fontWeight: 'bold',
              }}
              value="Bugging"
            />
          </View>

          <View style={{margin: 10}} />
          <Text style={{margin: 25}}>Participants</Text>
          <View style={{marginLeft: 20, marginRight: 20}}>
            <TouchableOpacity
              style={{borderBottomWidth: 1, borderBottomColor: '#000'}}
              onPress={this.AddPart_Handler}>
              <View
                style={{
                  flexDirection: 'row',
                  textAlign: 'left',
                  fontSize: 30,
                  padding: 10,
                }}>
                <Image
                  source={{
                    uri:
                      'https://cdn1.iconfinder.com/data/icons/avatar-1-2/512/Add_User1-512.png',
                  }}
                  style={{width: 30, height: 30, borderRadius: 30}}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 15,
                    marginLeft: 10,
                    fontWeight: 'bold',
                  }}>
                  Add Participants
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{marginLeft: 20, marginRight: 20}}>
            <View
              style={{
                flexDirection: 'row',
                textAlign: 'left',
                fontSize: 30,
                marginTop: 10,
              }}>
              <Image
                source={{
                  uri:
                    'https://www.pngjoy.com/pngl/136/2750635_gray-circle-login-user-icon-png-transparent-png.png',
                }}
                style={{width: 35, height: 35, borderRadius: 50}}
              />
              <Text style={{alignSelf: 'center', fontSize: 20, marginLeft: 10}}>
                You
              </Text>
            </View>
          </View>

          <Selected_members_for_group
            getSelectedContacts={this.state.selected_members}
          />

          <View style={{margin: 10}} />
          <View style={{marginLeft: 20, marginRight: 20}}>
            <TouchableOpacity
              style={{borderRadius: 15, backgroundColor: '#000', padding: 5}}>
              <Text style={{fontSize: 15, alignSelf: 'center', color: '#fff'}}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{margin: 5}} />
          <View style={{marginLeft: 20, marginRight: 20}}>
            <TouchableOpacity
              style={{
                borderRadius: 15,
                borderColor: '#000',
                borderWidth: 1,
                padding: 5,
              }}>
              <Text style={{fontSize: 15, alignSelf: 'center'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <View style={{margin: 10}} />
        </SafeAreaView>
      </ScrollView>
    );
  }
}
export default Workspace_info;
