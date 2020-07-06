/* eslint-disable */
import React from 'react'
import Chart from 'chart.js'
import { Bar } from 'react-chartjs-2'

var primary = '#52006F'

const state = {
  labels: [
    '01',
    '02',
    '03',
    '04',
    '05',
    '02',
    '03',
    '04',
    '02',
    '03',
    '04',
    '02',
    '03',
    '04',
    '02',
    '03',
    '04',
  ],
  datasets: [
    {
      label: 'Consenso',
      backgroundColor: primary,
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 1,
      data: [65, 59, 80, 81, 56],
    },
  ],
}

function ChartComponent() {
  return (
    <>
      <div>
        <div style={{ margin: '2rem' }}>
          <Bar
            options={{ maintainAspectRatio: false }}
            data={state}
            options={{
              maintainAspectRatio: false,

              title: {
                display: false,
                text: '',
                fontSize: 5,
              },
              legend: {
                display: true,
                position: 'right',
              },
            }}
          />
        </div>
      </div>
    </>
  )
}

export default ChartComponent
