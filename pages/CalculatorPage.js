import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';


export default class CalculatorPage extends Component {
  

  constructor(props) {
    super(props);
    this.title = 'CalculatorPage'
    this.placeholders = { 
      kms: 'Kms',
      time: 'Time (hh:MM:ss)',
      speed: 'Km/h',
      allure: 'min/Km'
    };
    this.state = {
      kms: '10',
      time: '',
      speed: '',
      allure: ''
    }
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
        outTime = this.toTime(totalSecondForDistance);
			}
			  if(hasTime){ 
				  secondsTotal = this.getTotSecs(this.state.time);
				  secondsForOneKilo = secondsTotal / ikms;
				  outSpeed = this.toDoubleDecimal(3600/secondsForOneKilo);
          outAllure = this.toTime(secondsForOneKilo);
			  }
        if(hasAllure){//Calcul du temps à mettre pour cette distance à cette allure
				  secondsForOneKilo = this.getTotSecs(crInput.getAllure());
				  totalSecondForDistance = ikms * secondsForOneKilo;
				  outTime = this.toTime(totalSecondForDistance);
			  }
    }

  if (hasTime){//on a le temps
			outTime = this.state.time;
			totalTime = this.getTotSecs(this.state.time);
			if(hasSpeed){
				ispeed = parseInt(this.state.speed);
				secondsForOneKilo = 3600 / ispeed;
				outKms = this.toDoubleDecimal(totalTime/secondsForOneKilo);
			}

			if(hasAllure){//Calcul du temps à mettre pour cette distance à cette allure
				secondsForOneKilo = this.getTotSecs(this.state.allure);
				outKms = this.toDoubleDecimal(totalTime/secondsForOneKilo);
			}
		}

    if(hasAllure){//on a l'allure
			outAllure = this.state.allure;
			totSeconds = this.getTotSecs(this.state.allure);
			outSpeed = this.toDoubleDecimal(3600/totSeconds);
		}
		if(hasSpeed){//on a la vitesse
			outSpeed = this.state.speed;
			ispeed = parseInt(this.state.speed);
			secondsForOneKilo = 3600 / ispeed;
			outAllure = this.toTime(secondsForOneKilo);
		}

    this.setState({kms:outKms});
    this.setState({time:outTime});
    this.setState({speed:outSpeed});
    this.setState({allure:outAllure});

   }
  

   getTotSecs(strTime){
    arrayOfString = strTime.split(":");
		hour = 0;
		minutes = 0;
		seconds = 0;
		if (arrayOfString.length == 3){
			hour = parseInt(arrayOfString[0]);
			minutes = parseInt(arrayOfString[1]);
			seconds = parseInt(arrayOfString[2]);
		}
		if (arrayOfString.length == 2){
			minutes = parseInt(arrayOfString[0]);
			seconds = parseInt(arrayOfString[1]);
		}else if (arrayOfString.length == 1){
			seconds = parseInt(arrayOfString[0]);
		}
		return parseInt(60.0 * (60.0 * hour) + 60.0 * minutes + seconds);
   }

   toDoubleDecimal(iseconds){
     return iseconds.toFixed(2);
   }

   toDoubleDigit(paramInt){
     if (paramInt < 10){
			return "0" + paramInt;
		}
		return ""+paramInt;
   }

   toTime(totalSeconds){
      hours = Math.floor(parseInt(totalSeconds) / 3600.0);
		  minutes = Math.floor(parseInt(totalSeconds) % 3600 / 60);
		  seconds = Math.floor(parseInt(totalSeconds)% 60.0);
		  return this.toDoubleDigit(hours) + ":" + this.toDoubleDigit(minutes) + ":" + this.toDoubleDigit(seconds);
   }

  render() {
    return (
      <View>
        <Text>{this.title}</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({kms:text})}
          keyboardType='numeric'
          value={this.state.kms}
          placeholder={this.placeholders.kms}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({time:text})}
          value={this.state.time}
          placeholder={this.placeholders.time}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({speed:text})}
          value={this.state.speed}
          placeholder={this.placeholders.speed}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({allure:text})}
          value={this.state.allure}
          placeholder={this.placeholders.allure}
        />
        <Button
          onPress={this._handlePress.bind(this)}
          title="Go"
          color="#CDCDCD"
          accessibilityLabel="Process calculation"
        />
      </View>
    )
  }
}