/*eslint-disable */
import React from 'react'
var Chart = require('chart.js')

class ChartComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const node = this.node

    var myChart = new Chart(node, {
      type: 'bar',
      options: {
        responsive: true,
      },
      data: {
        labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
        datasets: [
          {
            label: '# of Likes',
            data: [12, 19, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
          },
        ],
      },
    })
  }

  render() {
    return (
      <div>
        <canvas
          style={{ width: 80, height: 30 }}
          ref={(node) => (this.node = node)}
        />
      </div>
    )
  }
}

export default ChartComponent
