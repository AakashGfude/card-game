export default function timerValueReducer(state = null,action) {
  switch(action.type) {
    case 'TIMER_VALUE':
      return {
        time: action.payload.time
      }
  }
  return state;
}
