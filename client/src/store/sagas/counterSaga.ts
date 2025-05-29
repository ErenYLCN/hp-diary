import { put, takeEvery, delay } from "redux-saga/effects";
import { increment, asyncIncrementRequest } from "../slices/counterSlice";

function* asyncIncrement() {
  try {
    // Simulate 1 second delay
    yield delay(1000);
    // Increment the counter
    yield put(increment());
  } catch (error) {
    console.error("Error in asyncIncrement:", error);
  }
}

function* watchAsyncIncrement() {
  yield takeEvery(asyncIncrementRequest.type, asyncIncrement);
}

export default function* counterSaga() {
  yield watchAsyncIncrement();
}
