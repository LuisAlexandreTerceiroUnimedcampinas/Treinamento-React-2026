import { useState } from 'react';

import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';


function App() {
  const [patient, setPatient] = useState(null);

  if (!patient) {
    return <LoginPage setPatient={setPatient} />
  }

  return <DashboardPage patient={patient} />
}

export default App
