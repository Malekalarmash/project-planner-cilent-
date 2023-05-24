import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { projectSearch } from "./reducers";
import { clientSearch } from "./reducers";

const rootReducer = combineReducers({
    projectSearch, clientSearch
})

const store = configureStore({ reducer: rootReducer })

export default store