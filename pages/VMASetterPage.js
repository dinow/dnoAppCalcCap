import React, { Component } from 'react';
import Storage from 'react-native-storage';
import { View, Text, Navigator, Slider, StyleSheet, ToastAndroid, Button, AsyncStorage } from 'react-native';

var storage = new Storage({
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
    sync : {
        // we'll talk about the details later.
    }
})  

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
    temp_vma: 16,
  };

    componentDidMount() {
      this.getVMA();
    }

  getVMA(){
    storage.load({
      key: 'AppCalculatorUserVma',
      autoSync: true,
      syncInBackground: true,
      syncParams: {
      },
    }).then(ret => {
      if (ret != null){
        this.setState({temp_vma:ret.savedVma});
      }else{
        this.setState({temp_vma:14.5});
      }
    }).catch(err => {
      switch (err.name) {
        case 'NotFoundError':
            this.setState({temp_vma:16.5});
            break;
        case 'ExpiredError':
            this.setState({temp_vma:15.5});
            break;
      }
    })
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

  _saveVMA = async (event) => {
    ToastAndroid.show('Saving: ' + this.state.temp_vma, ToastAndroid.SHORT);
    storage.save({
        key: 'AppCalculatorUserVma',
        rawData: { 
          savedVma: this.state.temp_vma
        }
    });
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