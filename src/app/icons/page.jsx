import TopStrip from '@/components/TopStrip'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function IconsPage() {
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
                <div className="card-body">
                  <h6 className="text-lg text-gray-500 font-semibold mb-6">Icons</h6>
                  <iframe
                    src="https://tabler-icons.io/"
                    frameBorder="0"
                    className="w-full"
                    data-simplebar=""
                    style={{ height: '600px' }}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </main>
  )
} 