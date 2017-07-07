import axios from 'axios';
const ROOT_URL = 'http://localhost:8080';
export function selectCard(obj) {
  return {
    type: 'CARD_SELECTED',
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
