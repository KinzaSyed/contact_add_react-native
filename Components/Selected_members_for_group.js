import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from 'react-native';

class Selected_members_for_group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_members: [],
    };
  }

  componentDidMount() {
    this.t = setInterval(() => {
      this.setState({
        selected_members: this.props.getSelectedContacts,
      });
    }, 1000);
  }

  onItemClick = (value) => {
    let arrayJSON = this.state.selected_members;

    // Works on both Android and iOS
    Alert.alert(
      'Remove Participant',
      'Are you sure you want to remove ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => {
            if (arrayJSON.includes(value)) {
              var toRemove = value;
              var index = arrayJSON.indexOf(toRemove);
              console.log('Index of ' + value + ' : ' + index);
              arrayJSON.splice(index, 1);
            }
            this.setState({
              selected_members: arrayJSON,
            });

            AsyncStorage.setItem(
              'selected_Members',
              JSON.stringify(this.state.selected_members),
            ).then(() => console.log('storage updated'));

            console.log('Selected : ' + this.state.selected_members);
          },
        },
      ],
      {cancelable: false},
    );
  };
  render() {
    return (
      <ScrollView>
        <SafeAreaView>
          <FlatList
            data={this.state.selected_members}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => this.onItemClick(item)}>
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
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 20,
                        marginLeft: 10,
                      }}>
                      {item.givenName +
                        ' ' +
                        item.middleName +
                        ' ' +
                        item.familyName}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </ScrollView>
    );
  }
}
export default Selected_members_for_group;
