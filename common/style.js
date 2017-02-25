'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({

    globalView: {
        backgroundColor: '#F6F4D2', 
        flex:1
    },

    inputRow: {
        padding: 10, 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },

    piker:{
        padding: 5, 
        margin: 5,
        borderColor: 'gray', 
        borderWidth: 1
    },

    inputRowBorder: {
        padding: 5, 
        margin: 5,
        flexDirection: 'row', 
        justifyContent: 'space-between',
        borderColor: 'gray', 
        borderWidth: 1
    },

    pageTitle: {
        padding: 10, 
        fontSize: 24
    },

    inputText: {
        height: 40, 
        padding: 10, 
        borderColor: 'gray', 
        borderWidth: 1
    },


    alwaysred: {
        backgroundColor: 'red',
        height: 100,
        width: 100,
    },

    slider: {
        height: 10,
        margin: 10,
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
        margin: 10,
    },

});