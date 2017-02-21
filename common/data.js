import Storage from 'react-native-storage';
import { 
    ToastAndroid, 
    AsyncStorage 
} from 'react-native';

var storage = new Storage({
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
    sync : {
        // we'll talk about the details later.
    }
})  

export default class StorageHelper {
    state = {
        stored_vma: 16,
    };

    getVMA(){
        return storage.load({
            key: 'AppCalculatorUserVma',
            autoSync: true,
            syncInBackground: true,
            syncParams: {
            },
        })
    }

    setVMA = async (input_vma) => {
        ToastAndroid.show('Saving: ' + input_vma, ToastAndroid.SHORT);
        storage.save({
            key: 'AppCalculatorUserVma',
            rawData: { 
            savedVma: input_vma
            }
        });
    }

}