import { Observable } from 'rxjs';
import { mapTo,filter,delay,takeUntil,map,mergeMap } from 'rxjs/operators'
// export const counterEpic = action$ =>
//     action$.ofType("INCREASE")
//         .mergeMap(() => Observable.timer(0, 30)
//             .takeUntil(Observable.timer(1000))
//             .map(() => ({ type: "INCREASE_DONE" }))
//             .takeUntil(action$.ofType("STOP_COUNTER"))
//         );
export const counterEpic = action$ =>
    action$.pipe(
        filter(action => action.type === 'INCREASE'),
        delay(500), // Asynchronously wait 1000ms then continue
        mapTo({ type: 'INCREASE_DONE' })
    );

import { combineEpics } from 'redux-observable';
// import { counterEpic } from './counterEpic';
// import userEpic from './userEpic';

export default combineEpics(
    counterEpic
    // userEpic
)