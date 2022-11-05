import { USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_RESET, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_FORGOT_FAIL, USER_FORGOT_REQUEST, USER_FORGOT_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_RESET_FAIL, USER_RESET_REQUEST, USER_RESET_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_FAIL, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_RESET, USER_UPDATE_SUCCESS, USER_WISHLIST_LIST_FAIL, USER_WISHLIST_LIST_REQUEST, USER_WISHLIST_LIST_SUCCESS, USER_WISHLIST_TOGGLE_FAIL, USER_WISHLIST_TOGGLE_REQUEST, USER_WISHLIST_TOGGLE_RESET, USER_WISHLIST_TOGGLE_SUCCESS } from "../constants/userConstants";

export const userSigninReducer = (state={}, action)=> {
  switch(action.type) {
    case USER_SIGNIN_REQUEST:
      return {loading: true};
    case USER_SIGNIN_SUCCESS:
      return {loading: false, userInfo: action.payload};
    case USER_SIGNIN_FAIL:
      return {loading: false, error: action.payload};
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
}
export const userRegisterReducer = (state={}, action)=> {
  switch(action.type) {
    case USER_REGISTER_REQUEST:
      return {loading: true};
    case USER_REGISTER_SUCCESS:
      return {loading: false, userInfo: action.payload};
    case USER_REGISTER_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
}

export const userForgotPasswordReducer = (state={}, action)=> {
  switch(action.type) {
    case USER_FORGOT_REQUEST:
      return {loading: true};
    case USER_FORGOT_SUCCESS:
      return {loading: false, forgotMessage: action.payload, success: true};
    case USER_FORGOT_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
}

export const userResetPasswordReducer = (state={}, action)=> {
  switch(action.type) {
    case USER_RESET_REQUEST:
      return {loading: true};
    case USER_RESET_SUCCESS:
      return {loading: false, success: true};
    case USER_RESET_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
}

export const userDetailsReducer = (state={}, action)=> {
  switch(action.type) {
    case USER_DETAILS_REQUEST:
      return {loading: true};
    case USER_DETAILS_SUCCESS:
      return {loading: false, user: action.payload};
    case USER_DETAILS_FAIL:
      return {loading: false, error: action.payload};
    case USER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
}

export const userUpdateProfileReducer = (state={}, action)=> {
  switch(action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {loading: true};
    case USER_UPDATE_PROFILE_SUCCESS:
      return {loading: false, success: true};
    case USER_UPDATE_PROFILE_FAIL:
      return {loading: false, error: action.payload};
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
}

export const userListReducer = (state={users: []}, action)=> {
  switch(action.type) {
    case USER_LIST_REQUEST:
      return {loading: true};
    case USER_LIST_SUCCESS:
      return {loading: false, users: action.payload};
    case USER_LIST_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
}

export const userUpdateReducer = (state={}, action)=> {
  switch(action.type) {
    case USER_UPDATE_REQUEST:
      return {loading: true};
    case USER_UPDATE_SUCCESS:
      return {loading: false, success: true};
    case USER_UPDATE_FAIL:
      return {loading: false, error: action.payload};
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
}

export const userDeleteReducer = (state={}, action)=> {
  switch(action.type) {
    case USER_DELETE_REQUEST:
      return {loading: true};
    case USER_DELETE_SUCCESS:
      return {loading: false, success: true};
    case USER_DELETE_FAIL:
      return {loading: false, error: action.payload};
    case USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
}

export const userWishlistToggleReducer = (state={}, action)=> {
  switch(action.type) {
    case USER_WISHLIST_TOGGLE_REQUEST:
      return {loading: true};
    case USER_WISHLIST_TOGGLE_SUCCESS:
      return {loading: false, success: true};
    case USER_WISHLIST_TOGGLE_FAIL:
      return {loading: false, error: action.payload};
    case USER_WISHLIST_TOGGLE_RESET:
      return {};
    default:
      return state;
  }
}

export const userWishlistListReducer = (state={wishlistList: []}, action)=> {
  switch(action.type) {
    case USER_WISHLIST_LIST_REQUEST:
      return {loading: true};
    case USER_WISHLIST_LIST_SUCCESS:
      return {loading: false, wishlistList: action.payload};
    case USER_WISHLIST_LIST_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
}