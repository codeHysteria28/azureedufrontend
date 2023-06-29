import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.css';
import App from './App';
import Header from './components/Header';
import Admin from './components/Routes/Admin';
import AdminLogin from './components/Routes/AdminLogin';
import AdminRegistration from './components/Routes/AdminRegistration';
import News from './components/Routes/News';
import Sessions from './components/Routes/Sessions';
import SignIn from './components/Routes/SignIn';
import SignUp from './components/Routes/SignUp';
import reportWebVitals from './reportWebVitals';
import SingleArticle from './components/SingleArticle';
import Creator from './components/Routes/Creator';

export default function Index() {
  return(
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/" element={<App />} />
            <Route path="/news" element={<News />} />
            {/* <Route path="/sessions" element={<Sessions />} /> */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminreg" element={<AdminRegistration />} />
          <Route path="/article/:title" element={<SingleArticle />}/>
          <Route path="/creator" element={<Creator />} />
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