# Font Size Adjustment
Adding readability feature to increase or decrease font size across an entire site.

# Features incorporated
- Increase font size incrementally
- Decrease font size incrementally
- Reset to the default size
- Preference persists across page navigation
- Preference persists across browser sessions
- Keyboard shortcuts
    - Increase: Ctrl / Cmd, + 
    - Decrease: Ctrl / Cmd, - 
    - Reset: Ctrl / Cmd, 0 

# Software
- Svelte and SvelteKit (statue starter code)

# Changes/files made
- Store: src/lib/fontScale.ts
- Component: src/lib/FontSizeAdjuster.svelte
- Exports: src/lib/index.ts
- Layout integration: src/routes/+layout.svelte
- Early load script: src/app.html

# To run
npm install
npm run dev
