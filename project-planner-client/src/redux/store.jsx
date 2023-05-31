import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { projectSearch } from "./reducers";
import { clientSearch } from "./reducers";
import { setLogIn } from "./reducers";
import { taskSearch } from "./reducers";
import { setUser } from "./reducers";

const rootReducer = combineReducers({
    projectSearch, clientSearch, setLogIn, taskSearch, setUser
})

const store = configureStore({ reducer: rootReducer })

export default store