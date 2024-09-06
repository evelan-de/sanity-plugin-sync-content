module.exports = {
  '**/*.{js,jsx,ts,tsx}': [
    'prettier --write',
    'eslint --fix --max-warnings=-1',
    () => 'tsc --build',
  ],
};
