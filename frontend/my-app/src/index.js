import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UploadFile from './components/upload_file';
import UploadPolicy from './components/uploadpolicy';
import ManualPolicy from './components/manualpolicy';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';


// ReactDOM.render(<App/>, document.getElementById('root'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
    
<App />
 </React.StrictMode>
);
// serviceWorker.unregister();

reportWebVitals();
