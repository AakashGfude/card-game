export function selectCard(obj) {
  return {
    type: 'CARD_SELECTED',
    payload: obj
  }
}

export function cardContainerClicked(obj) {
  return {
    type: 'CARD_CONTAINER',
    payload: obj
  }
}
