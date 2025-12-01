export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
      },
      fontFamily: {
        body: ['system-ui', 'sans-serif'],
        display: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
