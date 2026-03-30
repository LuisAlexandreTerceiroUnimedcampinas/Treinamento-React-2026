import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

function DashboardPage({ patient }) {

  const apiUrl = "https://portal-unimed-fake-api.onrender.com";

  const [exams, setExams] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const examsResponse = await axios.get(`${apiUrl}/exames?pacienteId=${patient.id}`);
        setExams(examsResponse.data);
        const appointmentsResponse = await axios.get(`${apiUrl}/consultas?pacienteId=${patient.id}`);
        setAppointments(appointmentsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!exams.length || !appointments.length) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bem-vindo, {patient.nome}!</p>
      {exams.length > 0 ? console.log("Exames:", exams) : <p>Carregando exames...</p>}
      {appointments.length > 0 ? console.log("Consultas:", appointments) : <p>Carregando consultas...</p>}

      {appointments && appointments.length > 0 && (
        <div>
          <h3>Consultas Recentes</h3>
          <div>
            {appointments.slice(0, 3).map((consulta) => (
              <div key={consulta.id}>
                <strong>{consulta.especialidade}</strong>
                <span> — {consulta.medico}</span>
                <span> | {consulta.data}</span>
                <span> | {consulta.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
