# Lms Frontend


### Setup instruction 
1. Clone the Project 
```
    git clone https://github.com/Aditya-41/React-project.git
```
2. Move into the directory
```
    cd frontend
```
3. install dependencies
```
    npm i
```

4. run the server
```
    npm run dev
```

### Setup Instruction for Tailwind 
[TailWind Official Instruction Doc]

(https://tailwindcss.com/docs/installation)

1. Instal TailWind CSS
```
    npm install -D tailwindcss postcss autoprefixer
```
2. Create Tail-Wind Config File
```
    npx tailwindcss init
```
3. Add File Extention to Tail-Wind Config Files
```
  content: ["./index.html"./src/**/*.{html,js,jsx,ts,tsx}"],

```
4. Add the Tail-Wind directives at the top of the `Index.css` File
```
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
```
5. Add Following details in plugin property of tailwind config
```
    plugins: [require("daisyui"),require("@tailwindcss/line-clamp")],
```
### Adding Plugins and Depandencies
```
    npm install @reduxjs/toolkit 
        react-redux 
        react-router-dom 
        react-icons
        react-chartjs-2
        chart.js
        daisyui
        axios
        react-hot-toast 
        @tailwindcss/line-clamp
```

### Configure auto Import Sort esline

1. Install Simple Import Sort
``` 
    npm i -D eslint-plugin-simple-import-sort
```
2. Add rule in `.eslint.cjs`
```
    `simple-import-sort/imports`: 'error
```
3. Add simple-import sort plugin in `.eslint.cjs`
```
    plugins: [..., 'simple-import-sort']
```
4. To enable auto import sort on file save in Vs-Code
    - Open `setting-json`
    - add the following config
```
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "always"
    }
```