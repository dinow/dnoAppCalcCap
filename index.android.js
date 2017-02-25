/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  DrawerLayoutAndroid,
  Platform,
  BackAndroid,
  StyleSheet,
  Navigator,
  Text,
  View
} from 'react-native';
import {
    Avatar, Drawer, Divider, ThemeProvider
} from 'react-native-material-ui';
import CalculatorPage from './pages/CalculatorPage';
import SpecificPage from './pages/SpecificPage';
import VMASetterPage from './pages/VMASetterPage';
import VmaPage from './pages/VmaPage';


export default class dnoAppCalcCap extends Component {

  componentDidMount() {
    
  }

  state = {
     route : 'calculatorpage',
  };

  constructor(props) {
        super(props);
        this.renderNavigationView = this.renderNavigationView.bind(this);
        this.changeScene = this.changeScene.bind(this);
        this.renderScene = this.renderScene.bind(this);
        this.menu = this.menu.bind(this)
    }

  render() {
    return (

        <ThemeProvider>
      <DrawerLayoutAndroid
                ref="drawer"
                drawerWidth={270}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={this.renderNavigationView}>
                <Navigator
                    ref="navigator"
                    style={styles.container}
                    initialRoute={{ id: this.state.route }}
                    renderScene={this.renderScene}
                    configureScene={this.configureScene}
                />
            </DrawerLayoutAndroid>
            </ThemeProvider>
         
    );
  }


  renderNavigationView() {
        
      
       
        return(
            <Drawer>
              <Drawer.Header>
                    <Drawer.Header.Account avatar={<Avatar icon={'account-box'} />}></Drawer.Header.Account>
                </Drawer.Header>
                <Drawer.Section
                    divider
                    items={[
                    {
                        icon: 'timer',
                        value: 'Calculator',
                        active: !this.state.route || this.state.route === 'calculatorpage',
                        onPress: () => this.changeScene('calculatorpage')
                    },
                    {
                        icon: 'directions-walk',
                        value: 'Specific',
                        active: !this.state.route || this.state.route === 'specificpage',
                        onPress: () => this.changeScene('specificpage')
                    },
                    {
                        icon: 'directions-run',
                        value: 'VMA',
                        active: !this.state.route || this.state.route === 'vmapage',
                        onPress: () => this.changeScene('vmapage')
                    },
                    {
                        icon: 'save',
                        value: 'Set VMA',
                        active: !this.state.route || this.state.route === 'setvmapage',
                        onPress: () => this.changeScene('setvmapage')
                    },
                    {
                        icon: 'settings-power',
                        value: 'Exit',
                        onPress: () =>  BackAndroid.exitApp()
                    }
                    ]}
                />
                <Text style={styles.footer}>Version 0.0.2</Text>
            </Drawer>
        );
    }

    changeScene(path, args) {
        this.setState({route: path});
        this.refs.navigator.resetTo(Object.assign({ id: path }, args));
        this.refs.drawer.closeDrawer()
    }

    menu() {
        this.refs.drawer.openDrawer()
    }

  configureScene(route, stack) {
        if (Platform.OS === 'android') {
            return Navigator.SceneConfigs.FloatFromBottomAndroid
        }
        return Navigator.SceneConfigs.FloatFromBottom;
    }

    renderScene(route, nav) {
    
        switch (route.id) {
            case 'calculatorpage':
                return <CalculatorPage/>;

            case 'specificpage': 
                return <SpecificPage/>;

            case 'setvmapage': 
                return <VMASetterPage/>;

            case 'vmapage':
            default:
                return <VmaPage/>;
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    footer : {
        marginTop: 30,
        marginLeft: 15,
        fontSize: 11,
        color: '#828282'
    } 
});

AppRegistry.registerComponent('dnoAppCalcCap', () => dnoAppCalcCap);