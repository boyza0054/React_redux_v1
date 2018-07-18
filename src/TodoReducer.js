const TodoReducer = (state = [], action) => {
    switch (action.type) {
        case "GET_DATA":
            return state.concat(action.data)
        case "SET_DATA":
            localStorage.setItem('Session_todo', JSON.stringify(state));
            return state;
        case "ADD_TODO":
            return state.concat([action.data])
        case "DELETE_TODO":
            const deletelist = state.filter((items) => items.id !== action.id);
            localStorage.setItem('Session_todo', JSON.stringify(deletelist));
            return deletelist;
        case "UPDATE_TODO":
            const updatelist = state.map((items) => {
                if (items.id === action.id) {
                    const Updatedata = {
                        ...items,
                        title: action.data.title,
                        des: action.data.des,
                        date: action.data.date,
                        time: action.data.time
                    }
                    localStorage.setItem('Session_todo', JSON.stringify(Updatedata));
                    return Updatedata;
                } else {
                    return items;
                }
            });
            return updatelist;
        case "UPDATE_COMPLETE_TASK":
            const updatecheckbox = state.map((items) => {
                if (items.id === action.id) {
                    const Updatedata = {
                        ...items,
                        done: (items.done === false) ? true : false,
                    }
                    localStorage.setItem('Session_todo', JSON.stringify(Updatedata));
                    return Updatedata;
                } else {
                    return items;
                }
            });
            return updatecheckbox;
        case "UPDATE_CHECKALL":
            var CheckItems = state.map((items) => {
                if (items.done === false) {
                    const Updatedata = {
                        ...items,
                        done: true,
                    }
                    localStorage.setItem('Session_todo', JSON.stringify(Updatedata));
                    return Updatedata;
                } else {
                    return items;
                }
            });
            return CheckItems;
        case "UPDATE_UNCHECKALL":
            var CheckUnItems = state.map((items) => {
                if (items.done === true) {
                    const Updatedata = {
                        ...items,
                        done: false,
                    }
                    localStorage.setItem('Session_todo', JSON.stringify(Updatedata));
                    return Updatedata;
                } else {
                    return items;
                }
            });
            return CheckUnItems;
        case "UPDATE_TITLE_TODO":
            const updatetitle = state.map((items) => {
                if (items.id === action.id) {
                    const Updatedata = {
                        ...items,
                        title: action.title
                    }
                    localStorage.setItem('Session_todo', JSON.stringify(Updatedata));
                    return Updatedata;
                } else {
                    return items;
                }
            });
            return updatetitle;
        default:
            return state;
    }
}

export default TodoReducer;