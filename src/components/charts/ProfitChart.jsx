'use client'

import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function ProfitChart() {
  const options = {
    chart: {
      type: 'area',
      toolbar: {
        show: false,
      },
      height: 300,
      width: '100%',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    colors: ['#3b82f6', '#ef4444'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      labels: {
        style: {
          colors: '#6b7280',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6b7280',
        },
      },
    },
    grid: {
      borderColor: '#e5e7eb',
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        colors: '#6b7280',
      },
    },
  }

  const series = [
    {
      name: 'Revenue',
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: 'Expenses',
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ]

  return (
    <div id="profit" className="w-full h-[300px]">
      <Chart options={options} series={series} type="area" height={300} width="100%" />
    </div>
  )
} 