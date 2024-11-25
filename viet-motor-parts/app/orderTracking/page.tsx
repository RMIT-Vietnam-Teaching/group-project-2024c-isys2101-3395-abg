import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Order Tracking | Viet Motor Parts",
    description: "Viet Motor Parts's order tracking",
};

export default function orderTracking() {
    return (
        <div className="min-h-screen bg-brand-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-brand-600">
                    Track your order
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-brand-500 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="order-id" className="block text-sm font-medium text-brand-100">
                                Order ID
                            </label>
                            <div className="mt-1">
                                <input id="order-id" name="order-id" type="email" required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your order ID"/>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-brand-100">
                                Phone number
                            </label>
                            <div className="mt-1">
                                <input id="phone" name="phone" type="tel" required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your phone number"/>
                            </div>
                        </div>

                        {/* <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember_me" name="remember_me" type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                    Remember order ID
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                    Forgot your order ID?
                                </a>
                            </div>
                        </div> */}

                        <div>
                            <button type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-300 hover:bg-brand-100 hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">

                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}