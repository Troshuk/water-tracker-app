import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { App } from 'components/App';
import { PageLoader } from 'components';

import { persistor, store } from 'store/store';

import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} loading={<PageLoader />}>
    <PersistGate loading={<PageLoader />} persistor={persistor}>
      <BrowserRouter basename="/water-tracker-app">
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
