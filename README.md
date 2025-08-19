Uzence UI Components
 React Component Development Assignment
Focus: UI Components (InputField & DataTable)
Tech Stack: React · TypeScript · TailwindCSS · Storybook
Here's an improved version of the project overview and getting started sections, specifically tailored for a GitHub README file. It's concise, scannable, and uses clear formatting.

🚀 Project Overview
This repository contains a collection of reusable React components designed for building modern user interfaces. The core components include a flexible InputField and a powerful DataTable, both built with a focus on reusability, accessibility, and theming.

Components:

InputField: A versatile input component that supports various states (disabled, invalid, loading), variants (filled, outlined, ghost), and sizes (small, medium, large). It also includes optional features like a password toggle and a clear button, with full support for light and dark themes.

DataTable: A robust component for displaying tabular data. Features include column sorting, single/multiple row selection, and custom render functions. It also handles loading and empty states gracefully, with built-in theming and accessibility support.

All components are fully documented in Storybook, providing live examples, prop tables, and usage guidelines.

📦 Getting Started
Follow these steps to set up the project locally and run the Storybook documentation.

Clone the repository:

Bash

git clone https://github.com/yellenkibhavyasri/StoryBook.git
cd uzence-ui
Install dependencies:

Bash

npm install
Run Storybook locally:

Bash

npm run storybook
This command will open Storybook in your browser at http://localhost:6006/?path=/docs/configure-your-project--docs
Here, you can explore all the component stories, including different states, themes, and use cases.

Build StoryBook:

Bash

npm run build-storybook
This command generates a static, production-ready build of the Storybook documentation in the storybook-static folder.

📖 Storybook Documentation
Dive into the detailed documentation for each component directly in Storybook:

DataTable: View stories for default and dark modes, custom rendering, loading/empty states, and best practices.

InputField: Explore examples for different states (error, disabled), password fields, dark mode, and detailed accessibility notes (ARIA roles, color contrast).

🖼 Chromatic Preview
You can view the deployed Storybook documentation here: https://www.chromatic.com/build?appId=68a494b5402505ee21d746aa&number=2
