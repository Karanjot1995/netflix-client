export const setUserData = payload => {
    return {
      type: "USER_LIST",
      payload
    };
};

export const getWindowDimensions = payload => {
  return {
    type: "WINDOW_SIZE",
    payload
  };
};