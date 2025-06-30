import TopStrip from '@/components/TopStrip'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function ButtonsPage() {
  return (
    <main>
      <div className="app-topstrip z-40 sticky top-0 py-[15px] px-6 bg-[linear-gradient(90deg,_#0f0533_0%,_#1b0a5c_100%)]">
        <TopStrip />
      </div>

      <div id="main-wrapper" className="flex p-5 xl:pr-0 min-h-screen">
        <aside
          id="application-sidebar-brand"
          className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transform hidden xl:block xl:translate-x-0 xl:end-auto xl:bottom-0 fixed xl:top-[90px] xl:left-auto top-0 left-0 with-vertical h-screen z-[999] shrink-0 w-[270px] shadow-md xl:rounded-md rounded-none bg-white left-sidebar transition-all duration-300"
        >
          <Sidebar />
        </aside>

        <div className="w-full page-wrapper xl:px-6 px-0">
          <main className="h-full max-w-full">
            <div className="container full-container p-0 flex flex-col gap-6">
              <header className="bg-white shadow-md rounded-md w-full text-sm py-4 px-6">
                <Header />
              </header>

              <div className="card">
                <div className="card-body flex flex-col gap-6">
                  <h6 className="text-lg text-gray-500 font-semibold">Buttons</h6>

                  <div className="card">
                    <div className="card-body flex flex-wrap gap-3">
                      <button type="button" className="py-2 px-6 btn rounded-2xl text-base font-medium border border-transparent bg-blue-600 text-white hover:bg-blue-700">
                        Primary
                      </button>
                      <button type="button" className="py-2 px-7 inline-flex items-center gap-x-2 text-base font-medium rounded-2xl border border-transparent bg-gray-400 text-white hover:bg-gray-700">
                        Secondary
                      </button>
                      <button type="button" className="py-2 px-7 inline-flex items-center gap-x-2 text-base font-medium rounded-2xl border border-transparent bg-teal-500 text-white hover:bg-teal-600">
                        Success
                      </button>
                      <button type="button" className="py-2 px-7 inline-flex items-center gap-x-2 text-base font-medium rounded-2xl border border-transparent bg-yellow-500 text-white hover:bg-yellow-600">
                        Warning
                      </button>
                      <button type="button" className="py-2 px-7 inline-flex items-center gap-x-2 text-base font-medium rounded-2xl border border-transparent bg-red-500 text-white hover:bg-red-600">
                        Danger
                      </button>
                      <button type="button" className="py-2 px-7 inline-flex items-center gap-x-2 text-base font-medium rounded-2xl border border-transparent bg-blue-300 text-white hover:bg-blue-400">
                        Info
                      </button>
                      <button type="button" className="py-2 px-7 inline-flex items-center gap-x-2 text-base font-medium rounded-2xl border border-transparent bg-gray-500 text-white hover:bg-gray-700">
                        Dark
                      </button>
                      <button type="button" className="py-2 px-7 inline-flex items-center gap-x-2 text-base font-medium rounded-2xl border border-transparent bg-gray-200 hover:bg-gray-600">
                        Light
                      </button>
                      <button type="button" className="inline-flex items-center gap-x-2 text-base font-medium rounded-2xl text-blue-600 hover:text-blue-700">
                        Link
                      </button>
                    </div>
                  </div>

                  <h6 className="text-lg text-gray-500 font-semibold">Outline buttons</h6>

                  <div className="card">
                    <div className="card-body flex flex-wrap gap-3">
                      <button type="button" className="py-2 px-7 inline-flex items-center gap-x-2 text-base font-medium rounded-2xl border border-blue-600 text-blue-600 hover:border-blue-600 hover:text-white hover:bg-blue-600">
                        Primary
                      </button>
                      <button type="button" className="py-2 px-7 inline-flex items-center gap-x-2 text-base font-medium rounded-2xl border border-gray-400 text-gray-400 hover:border-gray-400 hover:text-white hover:bg-gray-400">
                        Secondary
                      </button>
                      <button type="button" className="py-2 px-7 inline-flex items-center gap-x-2 text-base font-medium rounded-2xl border border-teal-500 text-teal-500 hover:border-teal-500 hover:text-white hover:bg-teal-500">
                        Success
                      </button>
                      <button type="button" className="py-2 px-7 inline-flex items-center gap-x-2 text-base font-medium rounded-2xl border text-yellow-500 hover:border-yellow-500 hover:text-white hover:bg-yellow-500 border-yellow-500">
                        Warning
                      </button>
                      <button type="button" className="py-2 px-7 inline-flex items-center gap-x-2 text-base font-medium rounded-2xl border border-red-500 text-red-500 hover:border-red-500 hover:text-white hover:bg-red-500">
                        Danger
                      </button>
                      <button type="button" className="py-2 px-7 inline-flex items-center gap-x-2 text-base font-medium rounded-2xl border border-blue-300 text-blue-300 hover:border-blue-300 hover:text-white hover:bg-blue-300">
                        Info
                      </button>
                      <button type="button" className="py-2 px-7 inline-flex items-center gap-x-2 text-base font-medium rounded-2xl border text-gray border-gray-700 hover:border-gray-700 hover:text-white hover:bg-gray-500">
                        Dark
                      </button>
                      <button type="button" className="py-2 px-7 inline-flex items-center gap-x-2 text-base font-medium rounded-2xl border border-gray-200 text-gray-200 hover:border-transparent hover:text-gray-500 hover:bg-gray-200">
                        Light
                      </button>
                      <button type="button" className="py-2 px-7 inline-flex items-center gap-x-2 text-base font-medium rounded-2xl border border-transparent text-gray-500 hover:border-transparent hover:text-blue-600">
                        Link
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </main>
  )
} 