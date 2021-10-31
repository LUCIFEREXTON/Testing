const initialState = {
    messages: [{
        with: null,
        flag: null, //true for recieved messages || false for sent messages
        msg: ''
    }],
    user: {
        name: ''
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "":
            {
                break;
            }
        default:
            {
                break;
            }
    }
}

export default reducer;