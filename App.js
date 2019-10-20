import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './Home';
import Add from './Add';
import Chart from './Chart';

class HomeScreen extends React.Component {
  render() {
    return (
     <Home></Home>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    title: "HOME",
    headerMode: 'none',
    navigationOptions: {
      header: null, // only this works
    },

  },
  Add: {
    screen: Add, 
    
  },
  Chart: {
    screen: Chart,
  }
 
});

// export default createAppContainer(AppNavigator);
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component{
  render(){
    return <AppContainer/>;
  }
}
