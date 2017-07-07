export function cardReducer(state = {},action) {
  switch (action.type) {
    case 'CARD_SELECTED':
      return Object.assign({}, state, {
        clicked: action.payload.value,
        times: action.payload.times
      })
  }
  return state;
}

export function cardContainerReducer(state = {},action) {
  console.log(action.payload)
  switch (action.type) {
    case 'CARD_CONTAINER':
      return Object.assign({},state, {
        firstCard: action.payload.firstCard,
        secondCard: action.payload.secondCard
      })
  }
  return state;
}
