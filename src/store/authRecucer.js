const INITIAL_STATE = {
  username: null,
  role: null,
  token: null
};
// -----------------------|| CUSTOMIZATION REDUCER ||-----------------------

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_LOGIN':
      return {
        ...state,
        username: action.payload.username,
        role: action.payload.role,
        token: action.payload.token
      };

    default:
      return state;
  }
};

export default authReducer;
