import React, { Component } from 'react';
import StorageHelper from '../common/data';
import { View, Text, Navigator, Slider, StyleSheet, ToastAndroid, Button, AsyncStorage } from 'react-native';

export default class VMASetterPage extends Component {
  static get defaultProps() {
    return {
      title: 'Set VMA',
      storageKey: 'AppCalculatorUserVma'
    };
  }

    constructor(props) {
        super(props);
    }

    state = {
        stored_vma: 16,
    };

    componentDidMount() {
        StorageHelper.getVMA().then(ret => {
            if (ret != null){
                this.setState({stored_vma:ret.savedVma});
            }else{
                this.setState({stored_vma:14.5});
            }
        }).catch(err => {
            switch (err.name) {
                case 'NotFoundError':
                    this.setState({stored_vma:16.5});
                    break;
                case 'ExpiredError':
                    this.setState({stored_vma:15.5});
                    break;
            }
        });
    }
  

  render() {
    return (
      <View>
        <View style={{padding: 10}}>
          <Text style={{padding: 10, fontSize: 24}}>{this.title}</Text>
        </View>
        <View style={{padding: 10}}>
          <Text style={styles.text} >
            {this.state.temp_vma && + this.state.temp_vma}
          </Text>
          <Slider step={0.25} maximumValue={25} minimumValue={10} onValueChange={(value) => this.setState({temp_vma: value})}/>
          <Button onPress={this._saveVMA.bind(this)}  title="Save" color="#CDCDCD"  accessibilityLabel="Save VMA"/>
        </View>
      </View>
    )
  }

  _saveVMA(event){
    StorageHelper.setVMA(this.state.stored_vma);
  }
}

var styles = StyleSheet.create({
  slider: {
    height: 10,
    margin: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    margin: 10,
  },
});