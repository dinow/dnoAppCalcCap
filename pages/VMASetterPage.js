import React, { Component } from 'react';
import StorageHelper from '../common/data';
import { View, Text, Navigator, Slider, StyleSheet, ToastAndroid, Button, AsyncStorage } from 'react-native';
var my_style = require('../common/style');

export default class VMASetterPage extends Component {


    constructor(props) {
        super(props);
        this.title = 'Set VMA';
    }

    state = {
        stored_vma: 16,
    };

    componentDidMount() {
        StorageHelper.getVMA().then(ret => {
            if (ret != null){
                this.setState({stored_vma:ret.savedVma});
            }else{
                this.setState({stored_vma:12.5});
            }
        }).catch(err => {
            switch (err.name) {
                case 'NotFoundError':
                    this.setState({stored_vma:10.5});
                    break;
                case 'ExpiredError':
                    this.setState({stored_vma:11.5});
                    break;
            }
        });
    }
  

  render() {
    return (
      <View style={my_style.globalView}>
        <View style={my_style.inputRow}>
          <Text style={{padding: 10, fontSize: 24}}>{this.title}</Text>
        </View>
        <View style={my_style.inputRow}>
          <Text style={my_style.text} >
            {this.state.stored_vma}
          </Text>
          <Slider step={0.25} value={this.state.stored_vma} maximumValue={25} minimumValue={10} onValueChange={(value) => this.setState({stored_vma: value})}/>
          <Button onPress={this._saveVMA.bind(this)}  title="Save" color="#CDCDCD"  accessibilityLabel="Save VMA"/>
        </View>
      </View>
    )
  }

  _saveVMA(event){
    StorageHelper.setVMA(this.state.stored_vma);
  }
}