// const setData = (content) => {
// 	return {
// 		type: "SET_DATA",
// 		content
// 	}
// }

// const appendData = (obj) => {
// 	return (dispatch) => {
// 		dispatch(setData(obj));
// 	}
// }

// export {
// 	appendData
// }

const increment = () => {
    return {
        type: 'INCREMENT'
    }
}

const decrement = () => {
    return {
        type: 'DECREMENT'
    }
}


export {increment, decrement}