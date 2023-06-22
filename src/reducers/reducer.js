// const reducer = (state = 0, action) => {
//     if (action.type === 'INCREMENT') {
//       return state + 1;
//     } else if (action.type === 'DECREMENT') {
//       return state - 1;
//     }
  
//     return state;
// };
// const INITIAL_STATE = {
// 	counter: 0
// }

// export default (state = INITIAL_STATE, action={}) => {
// 	switch(action.type) {
// 		case "INCREMENT":
// 			return {
// 				...state.counter + 1,
// 			};
//         case "DECREMENT":
//             return {
//                 ...state.counter - 1,
//             };
// 		default:
// 			return state;
// 	}
// };

const INITIAL_STATE = {
	isLogged:false,
  userData:{}
}

const listReducer = (state = INITIAL_STATE, action) => {
  // const newState = Object.assign({}, state);
  switch (action.type) {
    case "USER_LIST":
      // return {
      // }
      state = {
        ...state,
        ...action.payload
      }
      // newState["userData"] = {
      //   ...action.payload
      // };
      break;
    default:
      break;
  }

  return state;
};


const windowSize = (state = INITIAL_STATE, action) => {
  // const newState = Object.assign({}, state);
  switch (action.type) {
    case "WINDOW_SIZE":
      // return {
      // }
      state = {
        ...state,
        ...action.payload
      }
      // newState["userData"] = {
      //   ...action.payload
      // };
      break;
    default:
      break;
  }

  return state;
};
  
export {listReducer,windowSize};