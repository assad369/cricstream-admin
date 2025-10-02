// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import { ThemeProvider } from './context/ThemeContext';
// import { AuthProvider } from './context/AuthContext';
// import App from './App';
// import './index.css';
//
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <React.StrictMode>
//         <BrowserRouter>
//             <ThemeProvider>
//                 <AuthProvider>
//                     <App />
//                 </AuthProvider>
//             </ThemeProvider>
//         </BrowserRouter>
//     </React.StrictMode>
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);