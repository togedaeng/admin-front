import TopStrip from '@/components/TopStrip'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Image from 'next/image'

export default function CardsPage() {
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
                  <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-6 gap-x-0 lg:gap-y-0 gap-y-6">
                    <div className="flex flex-col gap-6">
                      <h6 className="text-lg text-gray-500 font-semibold">Card</h6>
                      <div className="card overflow-hidden">
                        <div className="bg-white">
                          <Image
                            className="w-full h-auto rounded-t-xl"
                            src="/assets/images/products/product-1.jpg"
                            alt="Image Description"
                            width={300}
                            height={200}
                          />
                          <div className="card-body">
                            <h3 className="text-lg font-medium text-gray-500">
                              Card title
                            </h3>
                            <p className="mt-1 text-sm text-gray-400">
                              Some quick example text to build on the card title and
                              make up the bulk of the card's content.
                            </p>
                            <a href="#" className="text-base inline-block font-semibold hover:bg-blue-700 btn mt-4 py-2.5">
                              Go somewhere
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-6">
                      <h6 className="text-lg text-gray-500 font-semibold">Header and footer</h6>
                      <div className="card">
                        <div className="py-4 px-7">
                          <p className="mt-1 text-sm text-gray-400">
                            Featured
                          </p>
                        </div>
                        <div className="card-body">
                          <h3 className="text-lg font-medium text-gray-500">
                            Special title treatment
                          </h3>
                          <p className="mt-1 text-sm text-gray-400">
                            With supporting text below as a natural lead-in to
                            additional content.
                          </p>
                          <a href="#" className="text-base inline-block font-semibold hover:bg-blue-700 btn mt-4 py-2.5">
                            Go somewhere
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-6">
                      <h6 className="text-lg text-gray-500 font-semibold">Titles, text, and links</h6>
                      <div className="card">
                        <div className="card-body">
                          <div className="flex flex-col">
                            <h3 className="text-lg font-medium text-gray-500">
                              Card title
                            </h3>
                            <p className="text-sm text-gray-400 opacity-80">
                              Card subtitle
                            </p>
                            <p className="mt-2 text-sm text-gray-400">
                              Some quick example text to build on the card title and
                              make up the bulk of the card's content.
                            </p>
                            <div className="flex gap-2">
                              <a className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-700" href="#">
                                Card link
                                <i className="ti ti-chevron-right text-base"></i>
                              </a>
                              <a className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-700" href="#">
                                Another link
                                <i className="ti ti-chevron-right text-base"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
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