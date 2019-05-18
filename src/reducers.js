import React, {Component} from 'react';
import {
    applyMiddleware,
    combineReducers,
    createStore,
  } from 'redux';

const liveEvent = (state = [], action) => {
  switch (action.type) {
    case 'ADD_LIVE_EVENT':
      var artistKey = action.e.artistKey.filter(key => key);
      var eventList = [
        ...state,
        {
          key: action.e.eventid,
          date: action.e.date,
          title: action.e.title,
          artistKey: artistKey,
          venue: action.e.venue,
          openTime: action.e.openTime,
          startTime: action.e.startTime,
          memo: action.e.memo,
          eventType: action.e.eventType,
        }
      ]
      var sortedEventList = eventList.sort(function(a, b) {
        return (a.date > b.date ? 1 : -1);
      });
      return sortedEventList;
    case 'ADD_TICKET_EVENT':
      var artistKey = action.e.artistKey.filter(key => key);
      var eventList = [
        ...state,
        {
          key: action.e.eventid,
          date: action.e.date,
          title: action.e.title,
          artistKey: artistKey,
          ticket: action.e.ticket,
          time: action.e.time,
          memo: action.e.memo,
          eventType: action.e.eventType,
        }
      ]
      var sortedEventList = eventList.sort(function(a, b) {
        return (a.date > b.date ? 1 : -1);
      });
      return sortedEventList;
    case 'ADD_OTHER_EVENT':
      var artistKey = action.e.artistKey.filter(key => key);
      var eventList = [
        ...state,
        {
          key: action.e.eventid,
          date: action.e.date,
          title: action.e.title,
          artistKey: artistKey,
          memo: action.e.memo,
          eventType: action.e.eventType,
        }
      ]
      var sortedEventList = eventList.sort(function(a, b) {
        return (a.date > b.date ? 1 : -1);
      });
      return sortedEventList;
    case 'DELETE_EVENT':
      var eventList = [...state];
      var result = eventList.filter(function(element) {
        return element.key === action.e.eventKey
      });
      var index = eventList.indexOf(result[0]);
      var removed = eventList.splice(index, 1);
      return eventList;
    case 'EDIT_TICKET_EVENT':
      var eventList = [...state];
      var result = eventList.filter(function(element) {
        return element.key === action.e.eventid;
      });
      var beforeEvent = eventList.splice(
        eventList.indexOf(result[0]),
        1,
        {
          key: action.e.eventid,
          date: action.e.date,
          title: action.e.title,
          artistKey: action.e.artistKey,
          ticket: action.e.ticket,
          time: action.e.time,
          memo: action.e.memo,
          eventType: action.e.eventType,
        }
      );
      return eventList;
    case 'EDIT_LIVE_EVENT':
      var eventList = [...state];
      var result = eventList.filter(function(element) {
        return element.key === action.e.eventid;
      });
      var beforEvent = eventList.splice(
        eventList.indexOf(result[0]),
        1,
        {
          key: action.e.eventid,
          date: action.e.date,
          title: action.e.title,
          artistKey: action.e.artistKey,
          venue: action.e.venue,
          openTime: action.e.openTime,
          startTime: action.e.startTime,
          memo: action.e.memo,
          eventType: action.e.eventType,
        }
      );
      return eventList;
    case 'EDIT_OTHER_EVENT':
      var eventList = [...state];
      var result = eventList.filter(function(element) {
        return element.key === action.e.eventid;
      });
      var beforEvent = eventList.splice(
        eventList.indexOf(result[0]),
        1,
        {
          key: action.e.eventid,
          date: action.e.date,
          title: action.e.title,
          artistKey: action.e.artistKey,
          memo: action.e.memo,
          eventType: action.e.eventType,
        }
      );
      return eventList;
    case 'DELETE_ARTIST':
      var eventList = [...state];
      eventList.map(event => {
        var index = event.artistKey.indexOf(action.artist.key);
        if (index !== -1) {
          event.artistKey.splice(index, 1);
        }
      });
      return eventList;
    default:
      return state;
  }
};

const artists = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NEW_ARTIST':
      var artistList = [
        ...state,
        {
          name: action.artist.name,
          key: action.artist.artistid,
          description: action.artist.description,
          color: action.artist.color,
          image: action.artist.image,
        }
      ]
      return artistList;
    case 'ADD_LIVE_EVENT':
      var artistKey = action.e.artistKey.filter(key => key);
      var newArtistList = [...state];
      artistKey.map(key => {
        var result = newArtistList.filter(function(element) {
          return element.key === key;
        });
        if (newArtistList.indexOf(result[0]) != -1){
          newArtistList[newArtistList.indexOf(result[0])].plans++;
        }
      })
      return newArtistList;
    case 'EDIT_ARTIST':
      var artistList = [...state];
      var result = artistList.filter(function(element) {
        return element.key === action.artist.artistid;
      });
      var beforArtist = artistList.splice(
        artistList.indexOf(result[0]),
        1,
        {
          name: action.artist.name,
          key: action.artist.artistid,
          description: action.artist.description,
          color: action.artist.color,
          image: action.artist.image,
        }
      );
      return artistList;
    case 'DELETE_ARTIST':
      var artistList = [...state];
      var result = artistList.filter(function(element) {
        return element.key === action.artist.key
      });
      var index = artistList.indexOf(result[0]);
      var removed = artistList.splice(index, 1);
      return artistList;
    default:
      return state;
  }
};

const expenditure = (state = [], action) => {
  switch (action.type) {
    case 'ADD_EXPENDITURE':
      var artistKey = action.expenditure.artistKey.filter(key => key);
      var expenditureList = [
        ...state,
        {
          key: action.expenditure.id,
          amountOfMoney: action.expenditure.amountOfMoney,
          date: action.expenditure.date,
          artistKey: artistKey,
          memo: action.expenditure.memo,
          type: action.expenditure.type,
        }
      ]
      var sortedExpenditureList = expenditureList.sort(function(a, b) {
        return (a.date < b.date ? 1 : -1);
      });
      return sortedExpenditureList;
    case 'EDIT_EXPENDITURE':
      var expList = [...state];
      var result = expList.filter(function(element) {
        return element.key === action.expenditure.id;
      });
      var beforExp = expList.splice(
        expList.indexOf(result[0]),
        1,
        {
          key: action.expenditure.id,
          amountOfMoney: action.expenditure.amountOfMoney,
          date: action.expenditure.date,
          artistKey: action.expenditure.artistKey,
          memo: action.expenditure.memo,
          type: action.expenditure.type
        }
      );var sortedExpenditureList = expList.sort(function(a, b) {
        return (a.date < b.date ? 1 : -1);
      });
      return sortedExpenditureList;
    case 'DELETE_EXPENDITURE':
      var expList = [...state];
      var result = expList.filter(function(element) {
        return element.key === action.expenditure.key
      });
      var index = expList.indexOf(result[0]);
      var removed = expList.splice(index, 1);
      return expList;
    case 'DELETE_ARTIST':
      var expList = [...state];
      expList.map(exp => {
        var index = exp.artistKey.indexOf(action.artist.key);
        if (index !== -1) {
          exp.artistKey.splice(index, 1);
        }
      });
      return expList;
    default:
      return state;
  }
};

const reducers = combineReducers({
  liveEvent,
  artists,
  expenditure,
});

export default reducers;
