export function cardReducer(state = {},action) {
  switch (action.type) {
    case 'CARD_SELECTED':
      let obj = Object.assign({},state);
      let index = action.payload.index;
      if (Object.keys(obj).length === 0) {
        console.log('ye he kya',index);
        obj[index] = {
          flip: action.payload.flip,
          times: action.payload.times,
          matched: action.payload.matched,
          clickDisable: action.payload.clickDisable
        }
        console.log(obj);
        return obj;
      } else {
        console.log(obj)
          if (obj[index] !== null && obj[index] !== undefined) {
            obj[index]['flip']= action.payload.flip,
            obj[index]['times']= action.payload.times,
            obj[index]['matched']= action.payload.matched,
            obj[index]['clickDisable']= action.payload.clickDisable
          } else {
          obj[index] = {};
          obj[index]['flip'] = action.payload.flip;
          obj[index]['times']= action.payload.times,
          obj[index]['matched']= action.payload.matched,
          obj[index]['clickDisable']= action.payload.clickDisable
        }
        return obj;
      }
      // return Object.assign({}, state, {
      //   flip: action.payload.flip,
      //   times: action.payload.times,
      //   matched: action.payload.matched,
      //   clickDisable: action.payload.clickDisable
      // })
  }
  return state;
}

export function cardContainerReducer(state = { firstCard: {}, secondCard: {}},action) {
  switch (action.type) {
    case 'CARD_CONTAINER':
      return Object.assign({},state, {
        firstCard: {
          index: action.payload.firstCardIndex,
          value: action.payload.firstCard,
        },
        secondCard: {
          index: action.payload.secondCardIndex,
          value: action.payload.secondCard,
        }
      })
  }
  return state;
}

export function gameCompleteReducer(state = {},action) {
  switch(action.type) {
    case 'GAME_COMPLETE':
      return Object.assign({},state, {
        completed: action.payload.completed
      })
  }
  return state;
}
