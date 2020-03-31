import appConfig from '../appConfig';
export default actions = {
    SET_CITIES_LIST: "SET_CITIES_LIST",
    SET_CITY: "SET_CITY",
    get_cities_list: (payload) => {
        return (dispatch) => {
            fetch(`${appConfig.apiUrl}find?lat=23.68&lon=90.35&cnt=50&appid=${appConfig.appId}`, {
              method: "GET"
            })
            .catch(err => console.log('There has been a problem with your fetch operation: '+err))
            .then(res => res.json())
            .then(parsedRes => {
                let data = parsedRes;
                dispatch({
                    type: actions.SET_CITIES_LIST,
                    payload: data.list
                });
            })
        }
    },
    set_city_list: (payload) => {
        return {
            type: actions.SET_CITIES_LIST,
            payload
        };
    },
    set_city: (payload) => {
        return {
            type: actions.SET_CITY,
            payload
        };
    },
};