import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert, Picker} from 'react-native';
import DatePicker from 'react-native-datepicker';
import CalcHelper from './CalcHelper';
import Pourcentages from '../common/pourcentages';
var my_style = require('../common/style');
export default class CalculatorPage extends Component {
  
    constructor(props) {
        super(props);
        this.title = 'Pace Calculator'
        this.placeholders = { 
            time: 'Time (hh:MM:ss)'
        };
    }
    
    state = {
        meters: '',
        time: '',
        vma1: '',
        vma2: '',
        time_set: false
    }

    resetTime(event) {
        this.setState({
            time_set: false, 
            time: '00:00'
        })
    }

   
    _handlePress(event) {
        hasTime = this.state.time_set;

        var outVMA = ['.','.'];
        if (hasTime){//on a le temps
            
            totalTimeSeconds = CalcHelper.getTotSecs(this.state.time);
            currentDistanceMeters = parseInt(this.state.meters);
            speed = (totalTimeSeconds / currentDistanceMeters) * 3.6;

            Pourcentages.getPourcentages(this.state.meters, 'specific').forEach(function processPout(percentage){
                outVMA.push( percentage+'% - '+(speed / parseInt(percentage)));
            }, this);
		} else {
            outVMA = ['-', '-'];
        }

        this.setState({vma1:outVMA[0], vma2:outVMA[1]});
    }

  render() {
    return (
      <View style={my_style.globalView}>
        <View style={my_style.inputRow}>
          <Text style={my_style.pageTitle}>{this.title}</Text>
        </View>
        <View style={my_style.piker}>
          <Picker
            selectedValue={this.state.meters}
            onValueChange={(dst) => this.setState({meters:dst})}>
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
        <View style={my_style.inputRow}>
            <Text>Time</Text>
            <DatePicker
            style={{width: 200}}
            date={this.state.time}
            mode="time"
            placeholder="Time"
            format="HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
            dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
            },
            dateInput: {
                marginLeft: 36
            }
            }}
            onDateChange={(date) => {this.setState({
                time_set: true, 
                time: String(date+':00')})}}
            />
            <Button onPress={this.resetTime.bind(this)}  title="Reset" color="#A44A3F"  accessibilityLabel="Reset" />
        </View>
        <View style={{padding: 10}}>
            <Text style={my_style.inputText} value={this.state.vma1}/>
        </View>
        <View style={{padding: 10}}>
            <Text style={my_style.inputText} value={this.state.vma2}/>
       </View>
        <View style={{padding: 10}}>
        <Button
          onPress={this._handlePress.bind(this)}
          title="Go"
          color="#CBDFBD"
          accessibilityLabel="Process calculation"
        />
      </View>
      </View>
    )
  }
}    
