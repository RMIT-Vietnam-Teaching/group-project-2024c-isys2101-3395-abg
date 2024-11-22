export function SideFilter() {
    return <div className="flex items-center justify-center p-4">
            <div className="z-10 w-full p-3 bg-brand-100 rounded-lg shadow">
              <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white rounded dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
                <h1 className="text-brand-500 text-xl font-bold mx-4"><svg className="h-8 w-8 text-brand-400 inline-block"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"> <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg> Filter</h1>
                <h2 id="accordion-flush-heading-1" className="my-3">
                  <button type="button" className="flex items-center justify-between w-full py-3 font-medium rtl:text-right text-brand-500 border-b border-gray-200 gap-3 rounded" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
                    <h6 className="mx-3 text-xl font-medium text-brand-500">Category (Check box)</h6>
                    <svg data-accordion-icon className="w-4 h-4 mx-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                    </svg>
                  </button>
                </h2>
                <div id="accordion-flush-body-1" className="hidden" aria-labelledby="accordion-flush-heading-1">
                <ul className="space-y-2 text-lg mt-3" aria-labelledby="dropdownDefault">
                              <li className="flex items-center">
                                <input id="oil" type="checkbox" value=""
                                  className="w-5 h-5 bg-gray-100 border-gray-300 rounded text-brand-400 focus:ring-brand-400 focus:ring-2" />
                                <label htmlFor="oil" className="ml-2 text-lg font-medium text-brand-400">
                                  Oil
                                </label>
                              </li>                        
                              <li className="flex items-center">
                                <input id="wheels" type="checkbox" value=""
                                  className="w-5 h-5 bg-gray-100 border-gray-300 rounded text-brand-400 focus:ring-brand-400 focus:ring-2" />
                        
                                <label htmlFor="wheels" className="ml-2 text-lg font-medium text-brand-400">
                                  Wheels
                                </label>
                              </li>
                              <li className="flex items-center">
                                <input id="brakes" type="checkbox" value=""
                                  className="w-5 h-5 bg-gray-100 border-gray-300 rounded text-brand-400 focus:ring-brand-400 focus:ring-2" />
                        
                                <label htmlFor="brakes" className="ml-2 text-lg font-medium text-brand-400">
                                  Brakes
                                </label>
                              </li>
                              <li className="flex items-center">
                                <input id="engines" type="checkbox" value=""
                                  className="w-5 h-5 bg-gray-100 border-gray-300 rounded text-brand-400 focus:ring-brand-400 focus:ring-2" />
                        
                                <label htmlFor="engines" className="ml-2 text-lg font-medium text-brand-400">
                                  Engines
                                </label>
                              </li>
                            </ul>
                </div>
                <h2 id="accordion-flush-heading-2" className="my-3">
                  <button type="button" className="flex items-center justify-between w-full py-3 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3 rounded" data-accordion-target="#accordion-flush-body-2" aria-expanded="false" aria-controls="accordion-flush-body-2">
                    <h6 className="mx-3 text-xl font-medium text-brand-500">Price (Input filter)</h6>
                    <svg data-accordion-icon className="w-4 h-4 mx-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                    </svg>
                  </button>
                </h2>
                <div id="accordion-flush-body-2" className="hidden" aria-labelledby="accordion-flush-heading-2">
                  <div className="grid gap-6 mb-6 md:grid-cols-2 mt-4">
                    <div>
                        <input type="number" id="price_from" className="bg-gray-50 border border-gray-300 text-brand-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-lg" placeholder="From" required />
                    </div>
                    <div>
                        <input type="number" id="price_to" className="bg-gray-50 border border-gray-300 text-brand-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-lg" placeholder="To" required />
                    </div>
                  </div>
                </div>
                <h2 id="accordion-flush-heading-3" className="my-3">
                  <button type="button" className="flex items-center justify-between w-full py-3 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3 rounded" data-accordion-target="#accordion-flush-body-3" aria-expanded="false" aria-controls="accordion-flush-body-2">
                    <h6 className="mx-3 text-xl font-medium text-brand-500">A Radio Filter</h6>
                    <svg data-accordion-icon className="w-4 h-4 mx-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                    </svg>
                  </button>
                </h2>
                <div id="accordion-flush-body-3" className="hidden" aria-labelledby="accordion-flush-heading-3">
                  <div className="flex items-center m-3">
                      <input id="default-radio-1" type="radio" value="1" name="default-radio" className="w-4 h-4 text-brand-400 bg-gray-100 border-gray-300 focus:ring-brand-400 focus:ring-2"/>
                      <label htmlFor="default-radio-1" className="ms-2 text-lg font-medium text-brand-500">Default radio</label>
                  </div>
                  <div className="flex items-center m-3">
                      <input id="default-radio-2" type="radio" value="2" name="default-radio" className="w-4 h-4 text-brand-400 bg-gray-100 border-gray-300 focus:ring-brand-400 dark:ring-offset-gray-800 focus:ring-2"/>
                      <label htmlFor="default-radio-2" className="ms-2 text-lg font-medium text-brand-500">Checked state</label>
                  </div>
                  <div className="flex items-center m-3">
                      <input id="default-radio-3" type="radio" value="3" name="default-radio" className="w-4 h-4 text-brand-400 bg-gray-100 border-gray-300 focus:ring-brand-400 dark:ring-offset-gray-800 focus:ring-2"/>
                      <label htmlFor="default-radio-3" className="ms-2 text-lg font-medium text-brand-500">Choice 3</label>
                  </div>
                  <div className="flex items-center m-3">
                      <input id="default-radio-4" type="radio" value="4" name="default-radio" className="w-4 h-4 text-brand-400 bg-gray-100 border-gray-300 focus:ring-brand-400 dark:ring-offset-gray-800 focus:ring-2"/>
                      <label htmlFor="default-radio-4" className="ms-2 text-lg font-medium text-brand-500">Choice 4</label>
                  </div>
                  <div className="flex items-center m-3">
                      <input id="default-radio-5" type="radio" value="5" name="default-radio" className="w-4 h-4 text-brand-400 bg-gray-100 border-gray-300 focus:ring-brand-400 dark:ring-offset-gray-800 focus:ring-2"/>
                      <label htmlFor="default-radio-5" className="ms-2 text-lg font-medium text-brand-500">Choice 5</label>
                  </div>
                </div>
              </div>      
            </div>
          </div>
}