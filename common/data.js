import {
  AsyncStorage, 
  ToastAndroid
} from 'react-native';

const STORAGE_KEY = 'AppCalculator_user_vma';

class DataHandler{
    vma = 10;

    constructor(props){
           this._loadInitialState();
       }


    getVma = function(){
        return this.vma;
    }

    _loadInitialState = async() =>{
        ToastAndroid.show('Loading VMA...', ToastAndroid.SHORT);
        try {
        var value = await AsyncStorage.getItem(STORAGE_KEY);
        ToastAndroid.show('Value is ...' + value, ToastAndroid.LONG);
        if (value !== null){
        this.vma= parseFloat(value);
        } else {
        this.vma = 14;
        }
        } catch (error) {
        ToastAndroid.show('Error: ' + error.message, ToastAndroid.LONG);
        }
    };

    saveVMA = async (current_vma) => {
        try {
            ToastAndroid.show('Saving VMA ('+current_vma+')...', ToastAndroid.SHORT);
            await AsyncStorage.setItem(STORAGE_KEY, ''+current_vma);
        } catch (error) {
            ToastAndroid.show('Error: ' + error.message, ToastAndroid.LONG);
        }
    }

}

export default DataHandler
