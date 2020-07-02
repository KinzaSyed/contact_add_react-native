import Main_page from '../Screens/Main_page';
import Workspace_info from '../Screens/Workspace_info';
import Add_participants from '../Screens/Add_participants';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const Screens = {
  main_page: {
    screen: Main_page,
  },
  workspace_info: {
    screen: Workspace_info,
  },
  add_participants: {
    screen: Add_participants,
  },
};
const stackNavigator = createStackNavigator(Screens, {
  initialRouteName: 'main_page',
  defaultNavigationOptions: {
    title: 'Paticipants Add App',
    headerTitleAlign: 'left',
    headerStyle: {
      backgroundColor: '#ecf0f1',
    },
    headerTintColor: '#95a5a6',
    headerTitleStyle: {
      fontWeight: 'normal',
    },
  },
});

const AppContainer = createAppContainer(stackNavigator);
export default AppContainer;
