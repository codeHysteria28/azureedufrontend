import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.css';
import App from './App';
import Header from './components/Header';
import Admin from './components/Routes/Admin';
import AdminLogin from './components/Routes/AdminLogin';
import AdminRegistration from './components/Routes/AdminRegistration';
import Guides from './components/Routes/Guides';
import Sessions from './components/Routes/Sessions';
import SignIn from './components/Routes/SignIn';
import reportWebVitals from './reportWebVitals';

export default function Index() {
  return(
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/" element={<App />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/sessions" element={<Sessions />} />
            {/* <Route path="/signin" element={<SignIn />} /> */}
          </Route>
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminreg" element={<AdminRegistration />} />
        </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();