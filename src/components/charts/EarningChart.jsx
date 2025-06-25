'use client'

import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function EarningChart() {
  const options = {
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
      height: 100,
      width: '100%',
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    colors: ['#ef4444'],
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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
  }

  const series = [
    {
      name: 'Earnings',
      data: [30, 40, 35, 50, 49, 60],
    },
  ]

  return (
    <div id="earning" className="w-full h-[100px]">
      <Chart options={options} series={series} type="line" height={100} width="100%" />
    </div>
  )
} 