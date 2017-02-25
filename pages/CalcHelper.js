export default class CalcHelper {

    static toTime(totalSeconds, specificHandlingForPace){
        
        hours = Math.floor(parseInt(totalSeconds) / 3600.0);
	    minutes = Math.floor(parseInt(totalSeconds) % 3600 / 60);
	    seconds = Math.floor(parseInt(totalSeconds) % 60.0);
        if (specificHandlingForPace){
            //I'm using a 'hour time' to show the pace, so little trick here...
	        return this.toDoubleDigit(minutes) + ":" + this.toDoubleDigit(seconds);
        }else{
             return this.toDoubleDigit(hours) + ":" + this.toDoubleDigit(minutes) + ":" + this.toDoubleDigit(seconds);
        }
    }

    static toDoubleDigit(paramInt){
        if (paramInt < 10){
		    return "0" + paramInt;
		}
		return ""+paramInt;
    }

    static toDoubleDecimal(iseconds){
        return iseconds.toFixed(2);
    }

    static getTotSecs(strTime){
        arrayOfString = strTime.split(":");
		hour = 0;
		minutes = 0;
		seconds = 0;
		if (arrayOfString.length == 3){
			hour = parseInt(arrayOfString[0]);
			minutes = parseInt(arrayOfString[1]);
			seconds = parseInt(arrayOfString[2]);
		}else if (arrayOfString.length == 2){
			minutes = parseInt(arrayOfString[0]);
			seconds = parseInt(arrayOfString[1]);
		}else if (arrayOfString.length == 1){
			seconds = parseInt(arrayOfString[0]);
		}
		return parseInt(60.0 * (60.0 * hour) + 60.0 * minutes + seconds);
   }
}