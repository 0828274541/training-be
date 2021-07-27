import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import reducer from './reducer';

// -----------------------|| REDUX - MAIN STORE ||-----------------------//

const store = createStore(reducer);
const persistor = persistStore(store);
export { store, persistor };
