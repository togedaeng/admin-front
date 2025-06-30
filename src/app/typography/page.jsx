import TopStrip from '@/components/TopStrip'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function TypographyPage() {
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
                  <h6 className="text-lg text-gray-500 font-semibold">Headings</h6>

                  <div className="card">
                    <div className="card-body text-gray-500 flex flex-col gap-1">
                      <h1 className="text-4xl">h1. Preline heading</h1>
                      <h2 className="text-3xl">h2. Preline heading</h2>
                      <h3 className="text-2xl">h3. Preline heading</h3>
                      <h4 className="text-xl">h4. Preline heading</h4>
                      <h5 className="text-lg">h5. Preline heading</h5>
                      <h6 className="text-base">h6. Preline heading</h6>
                    </div>
                  </div>

                  <h6 className="text-lg text-gray-500 font-semibold">Inline text elements</h6>

                  <div className="card">
                    <div className="card-body text-gray-400 flex flex-col gap-1">
                      <p>You can use the mark tag to <mark>highlight</mark> text.</p>
                      <p><del>This line of text is meant to be treated as deleted text.</del></p>
                      <p><s>This line of text is meant to be treated as no longer accurate.</s></p>
                      <p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
                      <p><u>This line of text will render as underlined.</u></p>
                      <p><small>This line of text is meant to be treated as fine print.</small></p>
                      <p><strong>This line rendered as bold text.</strong></p>
                      <p><em>This line rendered as italicized text.</em></p>
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