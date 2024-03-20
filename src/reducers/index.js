import { combineReducers } from "redux";
import currentLocalRegion from "./currentLocalRegion";
import metropolitanData from "./metropolitanData";
import localData from "./localData";

const rootReducer = combineReducers({
  currentLocalRegion,
  metropolitanData,
  localData
});

export default rootReducer;