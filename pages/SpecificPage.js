import React, { Component } from 'react';
import { View, Text, Navigator, Slider, StyleSheet, Picker, ToastAndroid } from 'react-native';
import StorageHelper from '../common/data';
import CalcHelper from './CalcHelper';
import Pourcentages from '../common/pourcentages';
var my_style = require('../common/style');

export default class SpecificPage extends Component {
  constructor(props) {
        super(props);
        this.title = 'Specific Paces';
    }

  

  state = {
    vma: 10,
    distance: '800',
    temps1: '45:67',
    temps2: '45:89',
    perc1: '45:67',
    perc2: '45:89',
    allure1: '5:12',
    allure2: '6:45'
  };

   componentDidMount() {
      this.getVMA();
     
    }

  getVMA(){
    StorageHelper.getVMA().then(ret => {
      if (ret != null){
        this.setState({vma:ret.savedVma});
        this.updateValues('800');
      }else{
        this.setState({vma:14.5});
      }
    }).catch(err => {
      switch (err.name) {
        case 'NotFoundError':
            this.setState({vma:16.5});
            break;
        case 'ExpiredError':
            this.setState({vma:15.5});
            break;
      }
    })
  }

  updateValues(dst){
    this.setState({distance: dst});

    var temps = [];
    var allures = [];
    var percentages = [];
    var secsForDist = [];
    
    Pourcentages.getPourcentages(dst, 'specific').forEach(function processPout(percentage){
	    speed = (this.state.vma*percentage)/100;
        secondsForOneKilo = 3600 / speed;
        secondsForDistance = 0;
        secondsForDistanceStr = "";
        minperkm = CalcHelper.toTime(secondsForOneKilo, false);

        currentDistance = parseInt(dst)/1000;
        secondsForDistance = currentDistance * (3600/speed);
        secondsForDistanceStr = CalcHelper.toTime(secondsForDistance, false);
        percentages.push(percentage+"%");
        temps.push(secondsForDistanceStr+"");
        allures.push(minperkm);
    }, this);

    this.setState({allure1: allures[0],allure2: allures[1],temps1: temps[0],temps2: temps[1],perc1: percentages[0],perc2: percentages[1]});

  }


  render() {
    return (
      <View style={my_style.globalView}>
        <View style={my_style.inputRow}>
          <Text style={my_style.pageTitle}>{this.title}</Text>
        </View>
        <View style={my_style.inputRow}>
          <Text style={{padding: 10, fontSize: 20}}>VMA: {this.state.vma}</Text>
        </View>
        <View style={my_style.piker}>
          <Picker
            selectedValue={this.state.distance}
            onValueChange={(dst) => this.updateValues(dst)}>
            <Picker.Item label="800" value="800" />
            <Picker.Item label="1000" value="1000" />
            <Picker.Item label="1500" value="1500" />
            <Picker.Item label="2000" value="2000" />
            <Picker.Item label="3000" value="3000" />
            <Picker.Item label="5000" value="5000" />
            <Picker.Item label="10000" value="10000" />
            <Picker.Item label="20000" value="20000" />
            <Picker.Item label="21100" value="21100" />
            <Picker.Item label="42195" value="42195" />
        </Picker>
        </View>
        <View style={my_style.inputRowBorder}>
          <Text style={{padding: 4, fontSize: 14, fontWeight: 'bold'}}>% VMA</Text>
          <Text style={{padding: 4, fontSize: 16}}>{this.state.perc1} - {this.state.perc2}</Text>
        </View>
        <View style={my_style.inputRowBorder}>
          <Text style={{padding: 4, fontSize: 14, fontWeight: 'bold'}}>Temps</Text>
          <Text style={{padding: 4, fontSize: 16}}>{this.state.temps1} - {this.state.temps2}</Text>
        </View>
        <View style={my_style.inputRowBorder}>
          <Text style={{padding: 4, fontSize: 14, fontWeight: 'bold'}}>min/km</Text>
          <Text style={{padding: 4, fontSize: 16}}>{this.state.allure1} - {this.state.allure2}</Text>
        </View>
      </View>
    )
  }
}