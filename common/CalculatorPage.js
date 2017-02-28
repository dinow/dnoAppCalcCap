import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert} from 'react-native';
import DatePicker from 'react-native-datepicker';
import CalcHelper from './CalcHelper';
var my_style = require('../common/style');
export default class CalculatorPage extends Component {
  
    constructor(props) {
        super(props);
        this.title = 'Pace Calculator'
        this.placeholders = { 
            kms: 'Kms',
            time: 'Time (hh:MM:ss)',
            speed: 'Km/h',
            allure: 'min/Km'
        };
    }
    
    state = {
        kms: '',
        time: '',
        speed: '',
        allure: '',
        allure_set: false,
        time_set: false
    }
  

    resetPace(event) {
        this.setState({
            allure_set: false, 
            allure: '00:00'
        })
    }

    resetTime(event) {
        this.setState({
            time_set: false, 
            time: '00:00'
        })
    }

    _handlePress(event) {
        hasKms = this.state.kms != '';
        hasTime = this.state.time_set;
        hasSpeed = this.state.speed != '';
        hasAllure = this.state.allure_set;

        outKms = '';
        outTime = '';
        outSpeed = '';
        outAllure = '';

        if(hasKms){//on a les kms
            outKms = this.state.kms;
		    ikms = parseInt(this.state.kms);
            if(hasSpeed){//Calcul du temps à mettre pour cette distance à cette vitesse
				speed = parseInt(this.state.speed);
				secondsForOneKilo = 3600 / speed;
				totalSecondForDistance = ikms * secondsForOneKilo;
                outTime = CalcHelper.toTime(totalSecondForDistance, false);
			}
			if(hasTime){ 
				secondsTotal = CalcHelper.getTotSecs(this.state.time);
				secondsForOneKilo = secondsTotal / ikms;
				outSpeed = CalcHelper.toDoubleDecimal(3600/secondsForOneKilo);
                outAllure = CalcHelper.toTime(secondsForOneKilo, true);
			}
            if(hasAllure){//Calcul du temps à mettre pour cette distance à cette allure
				secondsForOneKilo = CalcHelper.getTotSecs(this.state.allure);
				totalSecondForDistance = ikms * secondsForOneKilo;
				outTime = CalcHelper.toTime(totalSecondForDistance, false);
			}
        }

        if (hasTime){//on a le temps
		    outTime = this.state.time;
			totalTime = CalcHelper.getTotSecs(this.state.time);
			if(hasSpeed){
				ispeed = parseInt(this.state.speed);
				secondsForOneKilo = 3600 / ispeed;
				outKms = CalcHelper.toDoubleDecimal(totalTime/secondsForOneKilo);
			}

			if(hasAllure){//Calcul du temps à mettre pour cette distance à cette allure
				secondsForOneKilo = CalcHelper.getTotSecs(this.state.allure);
				outKms = CalcHelper.toDoubleDecimal(totalTime/secondsForOneKilo);
			}
		}

        if(hasAllure){//on a l'allure
			outAllure = this.state.allure;
			totSeconds = CalcHelper.getTotSecs(this.state.allure);
			outSpeed = CalcHelper.toDoubleDecimal(3600/totSeconds);
		}
		if(hasSpeed){//on a la vitesse
			outSpeed = this.state.speed;
			ispeed = parseInt(this.state.speed);
			secondsForOneKilo = 3600 / ispeed;
			outAllure = CalcHelper.toTime(secondsForOneKilo, true);
		}

        this.setState({kms:outKms,time:outTime,speed:outSpeed,allure:outAllure});
    }

  render() {
    return (
      <View style={my_style.globalView}>
        <View style={my_style.inputRow}>
          <Text style={my_style.pageTitle}>{this.title}</Text>
        </View>
        <View style={{padding: 10}}>
            <TextInput style={my_style.inputText} onChangeText={(text) => this.setState({kms:text})}
            keyboardType='numeric'  value={this.state.kms}  placeholder={this.placeholders.kms} />
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
            // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({
                time_set: true, 
                time: String(date+':00')})}}
            />
            <Button onPress={this.resetTime.bind(this)}  title="Reset" color="#A44A3F"  accessibilityLabel="Reset" />
        </View>
        <View style={{padding: 10}}>
            <TextInput style={my_style.inputText} onChangeText={(text) => this.setState({speed:text})} value={this.state.speed} placeholder={this.placeholders.speed}/>
       </View>
        <View style={my_style.inputRow}>
            <Text>Pace</Text>
        <DatePicker
        style={{width: 200}}
        date={this.state.allure}
        mode="time"
        placeholder="Pace"
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
            allure_set: true, 
            allure: String(date)
        })}}
      />
      <Button
          onPress={this.resetPace.bind(this)}
          title="Reset"
          color="#A44A3F"
          accessibilityLabel="Reset"
        />
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
