import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Websites from './pages/Websites';
import Domains from './pages/Domains';
import Emails from './pages/Emails';
import Billing from './pages/Billing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="websites" element={<Websites />} />
          <Route path="domains" element={<Domains />} />
          <Route path="emails" element={<Emails />} />
          <Route path="billing" element={<Billing />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;