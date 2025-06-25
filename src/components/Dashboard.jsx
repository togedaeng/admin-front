'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import TopStrip from './TopStrip'
import ProfitChart from './charts/ProfitChart'
import TrafficChart from './charts/TrafficChart'
import EarningChart from './charts/EarningChart'
import Timeline from './Timeline'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="bg-gray-100">
      <TopStrip />
      <div id="main-wrapper" className="flex p-5 xl:pr-0">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="w-full page-wrapper xl:px-6 px-0">
          <main className="h-full max-w-full">
            <div className="container full-container p-0 flex flex-col gap-6">
              <Header onMenuClick={() => setSidebarOpen(true)} />

              <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-6 gap-x-0 lg:gap-y-0 gap-y-6">
                <div className="col-span-2">
                  <div className="card">
                    <div className="card-body">
                      <div className="flex justify-between mb-5">
                        <h4 className="text-gray-600 text-lg font-semibold sm:mb-0 mb-2">
                          Profit & Expenses
                        </h4>
                        <div className="relative">
                          <button className="text-2xl text-gray-400 hover:text-gray-600">
                            ⋮
                          </button>
                        </div>
                      </div>
                      <div className="w-full">
                        <ProfitChart />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="text-gray-600 text-lg font-semibold mb-4">
                        Traffic Distribution
                      </h4>
                      <div className="flex items-center justify-between gap-12">
                        <div>
                          <h3 className="text-[22px] font-semibold text-gray-600 mb-4">
                            $36,358
                          </h3>
                          <div className="flex items-center gap-1 mb-3">
                            <span className="flex items-center justify-center w-5 h-5 bg-green-200">
                              <span className="text-green-600">↗</span>
                            </span>
                            <p className="text-gray-600 text-sm font-normal">+9%</p>
                            <p className="text-gray-500 text-sm font-normal text-nowrap">
                              last year
                            </p>
                          </div>
                          <div className="flex gap-4">
                            <div className="flex gap-2 items-center">
                              <span className="w-2 h-2 bg-blue-600"></span>
                              <p className="text-gray-500 font-normal text-xs">Organic</p>
                            </div>
                            <div className="flex gap-2 items-center">
                              <span className="w-2 h-2 bg-red-500"></span>
                              <p className="text-gray-500 font-normal text-xs">Referral</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center w-32 h-32">
                          <TrafficChart />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-body">
                      <div className="flex gap-6 items-center justify-between">
                        <div className="flex flex-col gap-4">
                          <h4 className="text-gray-600 text-lg font-semibold">
                            Product Sales
                          </h4>
                          <div className="flex flex-col gap-4">
                            <h3 className="text-[22px] font-semibold text-gray-600">
                              $6,820
                            </h3>
                            <div className="flex items-center gap-1">
                              <span className="flex items-center justify-center w-5 h-5 bg-red-200">
                                <span className="text-red-600">↘</span>
                              </span>
                              <p className="text-gray-600 text-sm font-normal">+9%</p>
                              <p className="text-gray-500 text-sm font-normal text-nowrap">
                                last year
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-11 h-11 flex justify-center items-center bg-red-500 text-white self-start">
                          <span className="text-xl">$</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-[100px]">
                      <EarningChart />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-6 gap-x-0 lg:gap-y-0 gap-y-6">
                <div className="card">
                  <div className="card-body">
                    <h4 className="text-gray-600 text-lg font-semibold mb-5">
                      Upcoming Schedules
                    </h4>
                    <Timeline />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
} 