export default class Pourcentages {

    static getPourcentages(dst, type){
        if (type == 'specific'){
            if (dst == '800'){
                return [120,125];
            } else if (dst == '1000'){
                return [105,115];
            } else if (dst == '1500'){
                return [101,111];
            } else if (dst == '2000'){
                return [98,102];
            } else if (dst == '3000'){
                return [95,100];
            } else if (dst == '5000'){
                return [86,95];
            } else if (dst == '10000'){
                return [85,90];
            } else if (dst == '20000'){
                return [78,85];
            } else if (dst == '21100'){
                return [78,85];
            } else if (dst == '42195'){
                return [72,80];
            }
        } else {
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
        }
        return [50,55];
    }

}