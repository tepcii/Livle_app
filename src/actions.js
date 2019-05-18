export const ADD_LIVE_EVENT = 'ADD_LIVE_EVENT';
export const ADD_TICKET_EVENT = 'ADD_TICKET_EVENT';
export const ADD_OTHER_EVENT = 'ADD_OTHER_EVENT';
export const ADD_NEW_ARTIST = 'ADD_NEW_ARTIST';
export const ADD_EXPENDITURE = 'ADD_EXPENDITURE';
export const EDIT_EXPENDITURE = 'EDIT_EXPENDITURE';
export const DELETE_EXPENDITURE = 'DELETE_EXPENDITURE';
export const DELETE_EVENT = 'DELETE_EVENT';
export const EDIT_LIVE_EVENT = 'EDIT_LIVE_EVENT';
export const EDIT_TICKET_EVENT = 'EDIT_TICKET_EVENT';
export const EDIT_OTHER_EVENT = 'EDIT_OTHER_EVENT';
export const EDIT_ARTIST = 'EDIT_ARTIST';
export const DELETE_ARTIST = 'DELETE_ARTIST';

export const addLiveEvent = e => ({
  type: 'ADD_LIVE_EVENT',
  e,
});

export const addTicketEvent = e => ({
  type: 'ADD_TICKET_EVENT',
  e,
});

export const addOtherEvent = e => ({
  type: 'ADD_OTHER_EVENT',
  e,
});

export const addNewArtist = artist => ({
  type: 'ADD_NEW_ARTIST',
  artist,
});

export const addExpenditure = expenditure => ({
  type: 'ADD_EXPENDITURE',
  expenditure,
});

export const editExpenditure = expenditure => ({
  type: 'EDIT_EXPENDITURE',
  expenditure,
});

export const deleteExpenditure = expenditure => ({
  type: 'DELETE_EXPENDITURE',
  expenditure,
});

export const deleteEvent = e => ({
  type: 'DELETE_EVENT',
  e,
});

export const editLiveEvent = e => ({
  type: 'EDIT_LIVE_EVENT',
  e,
});

export const editTicketEvent = e => ({
  type: 'EDIT_TICKET_EVENT',
  e,
});

export const editOtherEvent = e => ({
  type: 'EDIT_OTHER_EVENT',
  e,
});

export const editArtist = artist => ({
  type: 'EDIT_ARTIST',
  artist,
});

export const deleteArtist = artist => ({
  type: 'DELETE_ARTIST',
  artist,
});
