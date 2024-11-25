import {AmountSelector} from "@/app/components/AmountSelector";
import Image from "next/image";

export default function Page() {
    return (
    <div className="bg-brand-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                    <div className="h-[500px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 relative overflow-hidden">
                        <Image src="/ProductPlaceholder.webp" alt="A random motor part" fill={true}/>
                    </div>
                    <div className="flex -mx-2 mb-4">
                        <div className="w-1/2 px-2">
                            <button className="w-full bg-brand-600 text-white py-2 px-4 rounded-full font-bold hover:bg-brand-500">Add to Cart</button>
                        </div>
                        <div className="w-1/2 px-2">
                            <button className="w-full bg-gray-200 dark:bg-gray-700 text-brand-600 py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="md:flex-1 px-4">
                    <h2 className="text-3xl font-bold text-brand-600 mb-2">Product Name</h2>
                    <p className="text-brand-500 text-base mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                        ante justo. Integer euismod libero id mauris malesuada tincidunt.
                    </p>
                    <div className="flex mb-4">
                        <div className="mr-4">
                            <span className="font-bold text-brand-600 text-lg">Price:</span>
                            <span className="text-brand-500 text-lg"> $29.99</span>
                        </div>
                        <div>
                            <span className="font-bold text-brand-600 text-lg">Availability:</span>
                            <span className="text-brand-500 text-lg"> In Stock</span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="part-compatible" className="font-bold text-brand-600 text-lg">Part Compatibility Check:</label>
                            <input type="text" id="part-compatible" className="mt-2 bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" placeholder="Input your motor model here..."/>
                            <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Alright!</span> This part is compatible with your motor!</p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="quantity-input" className="font-bold block mb-2 text-brand-600 text-lg">Choose quantity:</label>
                        <AmountSelector/>
                    </div>
                    <div>
                        <span className="font-bold text-brand-600 text-lg">Product Description:</span>
                        <p className="text-brand-500 text-base mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                            sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut
                            lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque
                            ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non
                            sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}