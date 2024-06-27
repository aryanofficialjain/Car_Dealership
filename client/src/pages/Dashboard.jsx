// components/Dashboard.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { parseJwt } from '../utils'; // Assuming you have a utility function to parse JWT token
import { Context } from '../context/Context';

const Dashboard = () => {
  const [carData, setCarData] = useState({});
  const [loading, setLoading] = useState(true);
  const {token} = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/car/allcars');
        const cars = res.data;
        const carTypes = ['SUV', 'Supercar', 'Sedan']; // Example types, adjust as per your data
        const typeCounts = carTypes.map(type => cars.filter(car => car.type === type).length);

        setCarData({
          carCount: cars.length,
          typeCounts: {
            labels: carTypes,
            datasets: [
              {
                label: 'Number of Cars by Type',
                data: typeCounts,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Example colors, adjust as needed
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              },
            ],
          },
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!token || !parseJwt(token)?.role === 'admin') {
    return <p>You are not authorized to view this page.</p>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>Statistics</h3>
          <p>Total Cars: {carData.carCount}</p>
          <div style={{ marginBottom: '20px' }}>
            <Bar
              data={{
                labels: ['SUV', 'Supercar', 'Sedan'],
                datasets: [
                  {
                    label: 'Number of Cars by Type',
                    data: [10, 5, 15], // Example data, replace with actual data or use typeCounts
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Example colors, adjust as needed
                    borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              }}
            />
          </div>
          <div>
            <Pie data={carData.typeCounts} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
