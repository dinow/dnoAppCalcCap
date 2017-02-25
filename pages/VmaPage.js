import React, { Component } from 'react';
import { View, Text, Navigator, Slider, StyleSheet, Picker } from 'react-native';
import StorageHelper from '../common/data';
import CalcHelper from './CalcHelper';
var my_style = require('../common/style');

export default class VmaPage extends Component {

    constructor(props) {
        super(props);
        this.title = 'VMA Pace';
    }

state = {
    vma: 10,
    distance: '30/30',
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
        this.updateValues('30/30');
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

    var pourcs = this.getPourcentages(dst);
    var temps = [];
    var allures = [];
    var percentages = [];
    pourcs.forEach(function processPout(percentage){
		speed = (this.state.vma*percentage)/100;
        secondsForOneKilo = 3600 / speed;
        secondsForDistance = 0;
        secondsForDistanceStr = "";
        minperkm = CalcHelper.toTime(secondsForOneKilo, false);

        if (dst == "30/30"){
            secondsForDistance = (speed*1000/3600)*30;
            secondsForDistanceStr = CalcHelper.toDoubleDecimal(secondsForDistance);
        }else if (dst == "Endurance"){
            currentDistance = 1;
            secondsForDistance = currentDistance * (3600/speed);
            secondsForDistanceStr = CalcHelper.toTime(secondsForDistance, false);
        }else{
            currentDistance = parseInt(dst)/1000;
            secondsForDistance = currentDistance * (3600/speed);
            secondsForDistanceStr = CalcHelper.toTime(secondsForDistance, false);
        }
		percentages.push(percentage+"%");
		temps.push(secondsForDistanceStr+"");
		allures.push(minperkm);
    }, this);
    this.setState({allure1: allures[0]});
    this.setState({allure2: allures[1]});
    this.setState({temps1: temps[0]});
    this.setState({temps2: temps[1]});
    this.setState({perc1: percentages[0]});
    this.setState({perc2: percentages[1]});

  }

getPourcentages(dst){
    if (dst == '30/30'){
     return [105,100];
    } else if (dst == '200'){
     return [105,100];
		} else if (dst == '300'){
     return [101,99];
		} else if (dst == '400'){
     return [100,95];
		} else if (dst == '500'){
     return [94,96];
		} else if (dst == '600'){
     return [94,96];
		} else if (dst == '800'){
     return [94,96];
		} else if (dst == '1000'){
     return [95,90];
		} else if (dst == 'Endurance'){
     return [65,69];
		} 
    return [50,55];
  }


  render() {
    return (
      <View style={my_style.globalView}>
        <View style={my_style.inputRow}>
          <Text style={{padding: 10, fontSize: 22}}>{this.title}</Text>
        </View>
        <View style={my_style.inputRow}>
          <Text style={{padding: 10, fontSize: 20}}>VMA: {this.state.vma}</Text>
        </View>
        <View style={my_style.piker}>
          <Picker
            selectedValue={this.state.distance}
            onValueChange={(dst) => this.updateValues(dst)}>
            <Picker.Item label="30/30" value="30/30" />
            <Picker.Item label="200" value="200" />
            <Picker.Item label="300" value="300" />
            <Picker.Item label="400" value="400" />
            <Picker.Item label="500" value="500" />
            <Picker.Item label="600" value="600" />
            <Picker.Item label="800" value="800" />
            <Picker.Item label="1000" value="1000" />
            <Picker.Item label="Endurance" value="Endurance" />
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
