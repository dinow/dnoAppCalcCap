import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert} from 'react-native';
import DatePicker from 'react-native-datepicker';
import CalcHelper from './CalcHelper';

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
        allure: ''
    }
  

    _handlePress(event) {
        hasKms = this.state.kms != '';
        hasTime = this.state.time != '';
        hasSpeed = this.state.speed != '';
        hasAllure = this.state.allure != '';

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
                outTime = CalcHelper.toTime(totalSecondForDistance);
			}
			if(hasTime){ 
				secondsTotal = CalcHelper.getTotSecs(this.state.time);
				secondsForOneKilo = secondsTotal / ikms;
				outSpeed = CalcHelper.toDoubleDecimal(3600/secondsForOneKilo);
                outAllure = CalcHelper.toTime(secondsForOneKilo);
			}
            if(hasAllure){//Calcul du temps à mettre pour cette distance à cette allure
				secondsForOneKilo = CalcHelper.getTotSecs(this.state.allure);
				totalSecondForDistance = ikms * secondsForOneKilo;
				outTime = CalcHelper.toTime(totalSecondForDistance);
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
			outAllure = CalcHelper.toTime(secondsForOneKilo);
		}

        this.setState({kms:outKms});
        this.setState({time:outTime});
        this.setState({speed:outSpeed});
        this.setState({allure:outAllure});
    }

    showPicker = async (stateKey, options) => {
        try {
            const {action, minute, hour} = await TimePickerAndroid.open(options);
            var newState = {};
            if (action === TimePickerAndroid.timeSetAction) {
                newState[stateKey + 'Text'] = _formatTime(hour, minute);
                newState[stateKey + 'Hour'] = hour;
                newState[stateKey + 'Minute'] = minute;
            } else if (action === TimePickerAndroid.dismissedAction) {
                newState[stateKey + 'Text'] = 'dismissed';
            }
            this.setState(newState);
        } catch ({code, message}) {
            console.warn(`Error in example '${stateKey}': `, message);
        }
    };



  render() {
    return (
      <View>
        <View style={{padding: 10}}>
          <Text style={{padding: 10, fontSize: 24}}>{this.title}</Text>
        </View>
        <View style={{padding: 10}}>
        <TextInput
          style={{height: 40, padding: 10, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({kms:text})}
          keyboardType='numeric'
          value={this.state.kms}
          placeholder={this.placeholders.kms}
        />
      </View>
        <View style={{padding: 10}}>
        
        <DatePicker
        style={{width: 200}}
        date={this.state.time}
        mode="time"
        placeholder="select time"
        format="mm:ss"
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
        onDateChange={(date) => {this.setState({time: date})}}
      />
     </View>
        <View style={{padding: 10}}>
        <TextInput
          style={{height: 40, padding: 10, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({speed:text})}
          value={this.state.speed}
          placeholder={this.placeholders.speed}
        />
       </View>
        <View style={{padding: 10}}>
        <TextInput
          style={{height: 40, padding: 10, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({allure:text})}
          value={this.state.allure}
          placeholder={this.placeholders.allure}
        />
      </View>
        <View style={{padding: 10}}>
        <Button
          onPress={this._handlePress.bind(this)}
          title="Go"
          color="#CDCDCD"
          accessibilityLabel="Process calculation"
        />
      </View>
      </View>
    )
  }
}    
