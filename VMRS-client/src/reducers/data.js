const initialState = {
  data: {}
};

const data = (state = initialState, action = {}) => {
  switch (action.type) {
    case "SAVE_DATA":
      return {
        data: action.data,
      };
    default:
      return state;
  }
};
export default data;
