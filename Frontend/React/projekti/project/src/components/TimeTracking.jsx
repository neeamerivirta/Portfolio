// React-kirjaston komponenttien tuonti
import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

// Komponentin päämäärittely
const TimeTracking = () => {
  // Tila tehtäville, alkupäivälle, loppupäivälle sekä kaaviodatalle
  const [tasks, setTasks] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [chartData, setChartData] = useState([]);

  // Vaikutus alkupäivän ja loppupäivän muutoksiin
  useEffect(() => {
    fetchTasks();
  }, [startDate, endDate]);

  // Funktio tehtävien hakemiseksi
  const fetchTasks = async () => {
    try {
      const startDateTime = new Date(startDate);
      const endDateTime = new Date(endDate);
      endDateTime.setHours(23, 59, 59, 999);

      // Hae tehtävät annetulta aikaväliltä
      const response = await fetch(
        `http://localhost:3010/tasks?startDate=${startDateTime.toISOString()}&endDate=${endDateTime.toISOString()}`
      );

      // Muuntaa vastauksen JSON-muotoon
      const data = await response.json();
      await setTasks(data);
      updateChartData(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Päivämäärän käsittely muunnos
  const handleDateChange = (date, type) => {
    if (type === "start") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  // Päivävälin käsittely muutos
  const handleDateRangeChange = async () => {
    await fetchTasks();
  };

  // Kaavion päivitys
  const updateChartData = (data) => {
    const tagCounts = {};
    data.forEach((task) => {
      task.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    const updatedChartData = Object.keys(tagCounts).map((tag) => ({
      tag,
      count: tagCounts[tag],
    }));

    setChartData(updatedChartData);
  };

  // Renderöinti
  return (
    <section className="section">
      <h2>Taulukkokaavio</h2>
      {tasks.length === 0 ? (
        <p>Ladataan...</p>
      ) : (
        <>
          <p>Tällä sivulla näet taulukkokaavion suoritetuista tehtävistä.</p>
          <div className="chart-container">
            <label>Alkupäivä:</label>
            <input
              type="date"
              value={startDate.toISOString().split("T")[0]}
              onChange={(e) =>
                handleDateChange(new Date(e.target.value), "start")
              }
            />
            <label>Loppupäivä:</label>
            <input
              type="date"
              value={endDate.toISOString().split("T")[0]}
              onChange={(e) =>
                handleDateChange(new Date(e.target.value), "end")
              }
            />
            <button onClick={handleDateRangeChange}>Päivitä</button>
          </div>
          <div className="chart-wrapper">
            <BarChart width={500} height={300} data={chartData}>
              <XAxis dataKey="tag" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </div>
        </>
      )}
    </section>
  );
};

export default TimeTracking;
