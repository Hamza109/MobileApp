import {State} from 'react-native-gesture-handler';
import {
  CHAT_INFO,
  FAV_ARTICLE,
  REG_ID,
  FETCH_FAILURE,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  REG_TYPE,
  ROW_NO,
  FETCH_FAILURE_PROFILE,
  FETCH_REQUEST_PROFILE,
  FETCH_SUCCESS_PROFILE,
  USER_EMAIL,
  USER_PASS,
  RECENT_CURES,
  TOP_DOCTORS,
  ARTICLE_ID,
  ARTICLE_DATA,
} from './Action';
import {SCREEN_NAME} from './Action';

const initialArticleId = {
  articleId: {
    id: null,
    title: null,
  },
};

const initialFetchState = {
  loading: false,
  data: [],
  error: '',
};
const initialProfileState = {
  loading: false,
  data: [],
  error: '',
};
const initialState = {
  regId: 0,
};
const initialScreenState = {
  screen: 'MAIN',
};
const initialFavState = {
  stat: 0,
};

const initialTypeState = {
  typeId: 0,
};

const initialRowState = {
  rowId: 0,
};

const initialEmailState = {
  mailId: null,
};

const initialPassState = {
  passId: null,
};

const initialRecentCures = {
  Data: [],
};
const initialTopDoc = {
  Data: [],
};

const initialChatInfo = {
  chat: {},
};

export const getArticleIdReducer = (state = initialArticleId, action) => {
  switch (action.type) {
    case ARTICLE_DATA: {
      return {
        ...state,
        articleId: action.payload,
      };
    }
    default:
      return state;
  }
};

export const chatInfoReducer = (state = initialChatInfo, action) => {
  switch (action.type) {
    case CHAT_INFO: {
      return {
        ...state,
        chat: action.payload,
      };
    }
    default:
      return state;
  }
};

export const topDocReducer = (state = initialTopDoc, action) => {
  switch (action.type) {
    case TOP_DOCTORS: {
      return {
        ...state,
        Data: action.payload,
      };
    }
    default:
      return state;
  }
};

export const recentCuresReducer = (state = initialRecentCures, action) => {
  switch (action.type) {
    case RECENT_CURES: {
      return {
        ...state,
        Data: action.payload,
      };
    }
    default:
      return state;
  }
};

export const mailReducer = (state = initialEmailState, action) => {
  switch (action.type) {
    case USER_EMAIL: {
      return {
        ...state,
        mailId: action.payload,
      };
    }
    default:
      return state;
  }
};

export const passReducer = (state = initialPassState, action) => {
  switch (action.type) {
    case USER_PASS: {
      return {
        ...state,
        passId: action.payload,
      };
    }
    default:
      return state;
  }
};
export const FavReducer = (state = initialFavState, action) => {
  switch (action.type) {
    case FAV_ARTICLE: {
      return {
        ...state,
        stat: action.payload,
      };
    }
    default:
      return state;
  }
};
export const screenReducer = (state = initialScreenState, action) => {
  switch (action.type) {
    case SCREEN_NAME: {
      return {
        ...state,
        screen: action.payload,
      };
    }
    default:
      return state;
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REG_ID: {
      return {
        ...state,
        regId: action.payload,
      };
    }
    default:
      return state;
  }
};

export const typeReducer = (state = initialTypeState, action) => {
  switch (action.type) {
    case REG_TYPE: {
      return {
        ...state,
        typeId: action.payload,
      };
    }
    default:
      return state;
  }
};

export const rowReducer = (state = initialRowState, action) => {
  switch (action.type) {
    case ROW_NO: {
      return {
        ...state,
        rowId: action.payload,
      };
    }
    default:
      return state;
  }
};
export const dataReducer = (state = initialFetchState, action) => {
  switch (action.type) {
    case FETCH_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: '',
      };
    }

    case FETCH_FAILURE: {
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const profileReducer = (state = initialProfileState, action) => {
  switch (action.type) {
    case FETCH_REQUEST_PROFILE: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_SUCCESS_PROFILE: {
      return {
        loading: false,
        data: action.payload,
        error: '',
      };
    }

    case FETCH_FAILURE_PROFILE: {
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
