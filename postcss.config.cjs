// postcss.config.cjs - Sintaxe alternativa (apenas se a primeira falhar)

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};