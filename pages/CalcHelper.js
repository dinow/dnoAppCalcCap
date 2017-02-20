export default class CalcHelper {

    static toTime(totalSeconds){
            hours = Math.floor(parseInt(totalSeconds) / 3600.0);
		  minutes = Math.floor(parseInt(totalSeconds) % 3600 / 60);
		  seconds = Math.floor(parseInt(totalSeconds)% 60.0);
		  return this.toDoubleDigit(hours) + ":" + this.toDoubleDigit(minutes) + ":" + this.toDoubleDigit(seconds);
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


}