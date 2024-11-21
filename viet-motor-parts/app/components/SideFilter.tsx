export function SideFilter() {
    return <div className="flex items-center justify-center p-4">
            <div className="z-10 w-full p-3 bg-white rounded-lg shadow dark:bg-gray-700">
              <div id="accordion-flush" data-accordion="collapse" data-active-classNamees="bg-white rounded dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classNamees="text-gray-500 dark:text-gray-400">
                <h1 className="text-black text-xl font-bold mx-4"><svg className="h-8 w-8 text-red-500 inline-block"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"> <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg> Filter</h1>
                <h2 id="accordion-flush-heading-1" className="my-3">
                  <button type="button" className="flex items-center justify-between w-full py-3 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3 rounded" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
                    <h6 className="mx-3 text-xl font-medium text-gray-900 dark:text-white">Category (Check box)</h6>
                    <svg data-accordion-icon className="w-4 h-4 mx-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                    </svg>
                  </button>
                </h2>
                <div id="accordion-flush-body-1" className="hidden" aria-labelledby="accordion-flush-heading-1">
                <ul className="space-y-2 text-lg mt-3" aria-labelledby="dropdownDefault">
                              <li className="flex items-center">
                                <input id="apple" type="checkbox" value=""
                                  className="w-5 h-5 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        
                                <label htmlFor="apple" className="ml-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                                  Apple (56)
                                </label>
                              </li>
                        
                              <li className="flex items-center">
                                <input id="fitbit" type="checkbox" value=""
                                  className="w-5 h-5 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        
                                <label htmlFor="fitbit" className="ml-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                                  Fitbit (56)
                                </label>
                              </li>
                        
                              <li className="flex items-center">
                                <input id="dell" type="checkbox" value=""
                                  className="w-5 h-5 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        
                                <label htmlFor="dell" className="ml-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                                  Dell (56)
                                </label>
                              </li>
                        
                              <li className="flex items-center">
                                <input id="asus" type="checkbox" value="" checked
                                  className="w-5 h-5 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        
                                <label htmlFor="asus" className="ml-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                                  Asus (97)
                                </label>
                              </li>
                        
                              <li className="flex items-center">
                                <input id="logitech" type="checkbox" value="" checked
                                  className="w-5 h-5 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        
                                <label htmlFor="logitech" className="ml-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                                  Logitech (97)
                                </label>
                              </li>
                        
                              <li className="flex items-center">
                                <input id="msi" type="checkbox" value="" checked
                                  className="w-5 h-5 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        
                                <label htmlFor="msi" className="ml-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                                  MSI (97)
                                </label>
                              </li>
                        
                              <li className="flex items-center">
                                <input id="bosch" type="checkbox" value="" checked
                                  className="w-5 h-5 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        
                                <label htmlFor="bosch" className="ml-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                                  Bosch (176)
                                </label>
                              </li>
                        
                              <li className="flex items-center">
                                <input id="sony" type="checkbox" value=""
                                  className="w-5 h-5 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        
                                <label htmlFor="sony" className="ml-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                                  Sony (234)
                                </label>
                              </li>
                            </ul>
                </div>
                <h2 id="accordion-flush-heading-2" className="my-3">
                  <button type="button" className="flex items-center justify-between w-full py-3 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3 rounded" data-accordion-target="#accordion-flush-body-2" aria-expanded="false" aria-controls="accordion-flush-body-2">
                    <h6 className="mx-3 text-xl font-medium text-gray-900 dark:text-white">Price (Input filter)</h6>
                    <svg data-accordion-icon className="w-4 h-4 mx-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                    </svg>
                  </button>
                </h2>
                <div id="accordion-flush-body-2" className="hidden" aria-labelledby="accordion-flush-heading-2">
                  <div className="grid gap-6 mb-6 md:grid-cols-2 mt-4">
                    <div>
                        <input type="number" id="price_from" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-lg" placeholder="From" required />
                    </div>
                    <div>
                        <input type="number" id="price_to" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-lg" placeholder="To" required />
                    </div>
                  </div>
                </div>
                <h2 id="accordion-flush-heading-3" className="my-3">
                  <button type="button" className="flex items-center justify-between w-full py-3 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3 rounded" data-accordion-target="#accordion-flush-body-3" aria-expanded="false" aria-controls="accordion-flush-body-2">
                    <h6 className="mx-3 text-xl font-medium text-gray-900 dark:text-white">A Radio Filter</h6>
                    <svg data-accordion-icon className="w-4 h-4 mx-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                    </svg>
                  </button>
                </h2>
                <div id="accordion-flush-body-3" className="hidden" aria-labelledby="accordion-flush-heading-3">
                  <div className="flex items-center m-3">
                      <input id="default-radio-1" type="radio" value="1" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label htmlFor="default-radio-1" className="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300">Default radio</label>
                  </div>
                  <div className="flex items-center m-3">
                      <input id="default-radio-2" type="radio" value="2" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label htmlFor="default-radio-2" className="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                  </div>
                  <div className="flex items-center m-3">
                      <input id="default-radio-3" type="radio" value="3" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label htmlFor="default-radio-3" className="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300">Choice 3</label>
                  </div>
                  <div className="flex items-center m-3">
                      <input id="default-radio-4" type="radio" value="4" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label htmlFor="default-radio-4" className="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300">Choice 4</label>
                  </div>
                  <div className="flex items-center m-3">
                      <input id="default-radio-5" type="radio" value="5" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label htmlFor="default-radio-5" className="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300">Choice 5</label>
                  </div>
                </div>
              </div>      
            </div>
          </div>
}