import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

class Main_page extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.workspaceInfo_Handler = this.workspaceInfo_Handler.bind(this);
  }
  workspaceInfo_Handler() {
    this.props.navigation.navigate('workspace_info', {
      title: 'Workspace Info',
    });
  }

  render() {
    return (
      <View style={{margin: 20}}>
        <Text style={{textAlign: 'center', fontSize: 30}}>Main Page</Text>
        <Text style={{textAlign: 'center', fontSize: 20}}>
          React native assignment
        </Text>

        <View style={{margin: 20}} />

        <Button
          title="Workspace Info"
          color="#27ae60"
          onPress={this.workspaceInfo_Handler}
        />
      </View>
    );
  }
}
export default Main_page;
