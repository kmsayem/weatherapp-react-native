import actions from './actions';
const initState = { 
    cities_list: [], 
    currentCity: {},
};

export default function weatherReducer(state = initState, action){
    switch (action.type) {
        case actions.SET_CITIES_LIST:
            return {...state, cities_list: action.payload}
        case actions.SET_CITY:
            return {...state, currentCity: action.payload}
        default:
            return state;
    }
}