import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-100': '#ffbb94',
                'brand-200': '#fb9590',
                'brand-300': '#DC586D',
                'brand-400': '#A33757',
                'brand-500': '#852E4E',
                'brand-600': '#4C1D3D',
            },
        },
    },
    plugins: [
        require('daisyui')
    ],
    daisyui: {base: false}
};
export default config;
