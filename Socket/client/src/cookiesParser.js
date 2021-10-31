//convert cookies into javascript Object
const loadCookies = () => (Object.assign(
    ...document.cookie.split("; ")
    .map(ele => ele.split("="))
    .map(([key, value]) => key ? ({
        [key]: parsedValue(value)
    }) : {})
))



const parsedValue = (str) => {
    const isNumber = /^\d+\.\d+$/.test(str);
    const isJs = isJson(str);
    const isArr = isArray(str);
    return isNumber ? parseFloat(str) : (isJs ? JSON.parse(str) : (isArr ? Array(str) : str));
}

function isJson(str) {
    if (typeof str !== 'string') return false;
    try {
        const result = JSON.parse(str);
        const type = Object.prototype.toString.call(result);
        return type === '[object Object]';
    } catch (err) {
        return false;
    }
}

function isArray(str) {
    if (typeof str !== 'string') return false;
    try {
        const result = JSON.parse(str);
        const type = Object.prototype.toString.call(result);
        return type === '[object Array]';
    } catch (err) {
        return false;
    }
}
let cookies = loadCookies();

const valueof = key => key instanceof Function ? key() : key;

/*********************************ALL EXPORTS**************************************************/
//get value by passing key pair
export const getCookie = key => cookies[valueof(key)];


//set key value by passing them with expiry and path
export const setCookie = (key, value, exdays = 0, path = '/') => {
    //checking if function is passed then run function and then get value

    key = valueof(key);
    value = valueof(value);
    exdays = valueof(exdays);
    path = valueof(path);

    //converting days to date format

    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

    //making expiry string

    const exp = exdays !== 0 ? ` expires=${d.toUTCString()};` : '';

    //making cookie string

    const cstring = ` ${key}=${value};${exp} path=${path}`;

    //adding to cookie

    document.cookie += cstring;
    cookies = loadCookies();
}


export const checkCookie = key => getCookie(key) ? true : false;

export const getAll = () => cookies;