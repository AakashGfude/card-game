export function createUserReducer(state = null,action) {
  switch(action.type) {
    case 'CREATE_USER' :
      return Object.assign({},state, {
        data: action.payload.data.response
      })
    case 'CONTINUE_USER':
      return Object.assign({},state, {
        data: action.payload
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

export function updateUserReducer(state = null,action) {
  switch(action.type) {
    case 'UPDATE_USER' :
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

export function giphyReducer(state = null,action) {
    console.log(action.payload)
  switch (action.type) {
      case 'GIF_API':
        let newArray = action.payload.map(({ images,slug,id }) => {
           return {
             url: images.downsized.url,
             slug,
             id
           }
        });
        console.log(newArray);
        return Object.assign({}, state, {
          data: newArray
        })
  }
  return state;
}
