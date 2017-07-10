export function createUserReducer(state = null,action) {
  switch(action.type) {
    case 'CREATE_USER' :
      return Object.assign({},state, {
        data: action.payload.data.response
      })
  }
  return state;
}

export function fetchUsersReducer(state = null,action) {
  switch(action.type) {
    case 'FETCH_USER' :
      return Object.assign({},state, {
        data: action.payload.data
      })
  }
  return state;
}

export function fetchMarvelReducer(state = null,action) {
  switch (action.type) {
    case 'FETCH_MARVEL':
        return Object.assign({}, state, {
          data: action.payload.data
        })
  }
  return state;
}
