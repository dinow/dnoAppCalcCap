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
import VmaPage from './pages/VmaPage';


export default class dnoAppCalcCap extends Component {

static get defaultProps() {
    return {
      vma: 16.5
    };
  }

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
                    initialRoute={{ id: 'calculatorpage' }}
                    renderScene={this.renderScene}
                    configureScene={this.configureScene}
                />
            </DrawerLayoutAndroid>
            </ThemeProvider>
         
    );
  }


  renderNavigationView() {
        
        const route = 'calculatorpage';
       
        return(
            <Drawer>
              <Drawer.Header>
                    <Drawer.Header.Account
                        avatar={<Avatar icon={'account-box'} />}
                        footer={{
                                dense: true,
                                centerElement: {
                                    primaryText: this.props.vma,
                                    secondaryText: ' ',
                                },
                            }}>
                    </Drawer.Header.Account>
                </Drawer.Header>
                <Drawer.Section
                    divider
                    items={[
                    {
                        icon: 'timer',
                        value: 'Calculator',
                        active: !route || route === 'calculatorpage',
                        onPress: () => this.changeScene('calculatorpage', {vma : this.props.vma})
                    },
                    {
                        icon: 'directions-walk',
                        value: 'Specific',
                        active: !route || route === 'specificpage',
                        onPress: () => this.changeScene('specificpage', {vma : this.props.vma})
                    },
                    {
                        icon: 'directions-run',
                        value: 'VMA',
                        active: !route || route === 'vmapage',
                        onPress: () => this.changeScene('vmapage', {vma : this.props.vma})
                    },
                    {
                        icon: 'settings-power',
                        value: 'Exit',
                        onPress: () =>  BackAndroid.exitApp()
                    }
                    ]}
                />
                <Text style={styles.footer}>VMA: {this.props.vma}</Text>
            </Drawer>
        );
    }

    changeScene(path, args) {
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
