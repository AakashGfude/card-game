import axios from 'axios';
const ROOT_URL = 'https://card-game-memory.herokuapp.com';
export function selectCard(obj) {
  return {
    type: 'CARD_SELECTED',
    payload: obj
  }
}

export function gameComplete(obj) {
  return {
    type: 'GAME_COMPLETE',
    payload: obj
  }
}

export function cardContainerClicked(obj) {
  console.log(obj)
  return {
    type: 'CARD_CONTAINER',
    payload: obj
  }
}

export function fetchUsers() {
  const request = axios.get(`${ROOT_URL}/cards`);

  return (dispatch) => {
    request.then((data)=> {
      dispatch({
        type: 'FETCH_USER',
        payload:data
      })
    })
  }
}

export function createUser(values) {
  console.log(values);
  const request = axios.post(`${ROOT_URL}/cards`,values);

  return (dispatch) => {
    request.then((data)=> {
      dispatch({
        type: 'CREATE_USER',
        payload: data
      })
    })
  }
}

export function updateUser(values) {
  let obj = {
    _id: values._id,
    time: values.time
  }
  console.log(obj)
  const request = axios.put(`${ROOT_URL}/cards`,obj);

  return (dispatch) => {
    request.then((data)=> {
      dispatch({
        type: 'UPDATE_USER',
        payload: data
      })
    })
  }
}

export function callMarvel() {
  const request = axios.get(`${ROOT_URL}/marvel`);

  return (dispatch) => {
    request.then((data) => {
      dispatch({
        type: 'FETCH_MARVEL',
        payload: data
      })
    })
  }
}

export function passTimerValue(obj) {
  return {
    type: 'TIMER_VALUE',
    payload: obj
  }
}
