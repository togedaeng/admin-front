'use client'

import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function TrafficChart() {
  const options = {
    chart: {
      type: 'donut',
      toolbar: {
        show: false,
      },
      height: 150,
      width: '100%',
    },
    colors: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'],
    labels: ['Organic', 'Referral', 'Direct', 'Social'],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
        },
      },
    },
  }

  const series = [44, 55, 13, 33]

  return (
    <div id="grade" className="w-full h-[150px]">
      <Chart options={options} series={series} type="donut" height={150} width="100%" />
    </div>
  )
} 