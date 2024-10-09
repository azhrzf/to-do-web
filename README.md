# To-Do Web Application

This is a single-page application (SPA) built using **React** and **Vite** for managing to-do lists. The application allows users to add, edit, and delete to-dos, manage labels for each to-do, and features secure authentication with password hashing. User data and to-dos are stored using the browser's **local storage**, ensuring that tasks persist even after page refresh or browser closure.

## Features

- Add, edit, and delete to-dos.
- Metadata in the form of title, completed, due date, label, and description.
- Authentication, secure login using password hashing to protect user credentials.
- Add, edit, and delete labels for to-dos to organize tasks efficiently.
- Stores user data and tasks locally on the browser to persist across sessions.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast development build tool optimized for React applications.

## Installation and Setup

To get started with the To-Do Web App, follow the steps below:

### Prerequisites

Ensure you have **Node.js** and **npm** (Node Package Manager) installed on your machine. You can download Node.js from [here](https://nodejs.org/).

### Steps

1. **Clone the repository**:

   ```bash
    git clone https://github.com/azhrzf/to-do-web.git
   ```

2. **Navigate to the project directory:**

   ```bash
    cd to-do-web
   ```

3. **Install dependencies:**

   ```bash
    npm install
   ```

4. **Build for production:**

   Because the build folder already exists, which is dist. So you can immediately preview it. However, it is still recommended to do a rebuild.

   ```bash
   npm run build
   ```

5. **Preview the production build:**

   ```bash
   npm run preview
   ```

### Visit the launched site here

[todo-azhrzf.netlify.app](https://todo-azhrzf.netlify.app/).

[![Netlify Status](https://api.netlify.com/api/v1/badges/0f4a1103-3bb7-459d-94a9-c1918449ec14/deploy-status)](https://app.netlify.com/sites/todo-azhrzf/deploys)
