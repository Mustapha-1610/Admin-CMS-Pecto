# Admin CMS Pecto

Admin CMS Pecto is a lightweight and user-friendly content management system designed for managing and monitoring data. It leverages a SQLite database and provides a clear separation of frontend and backend functionalities.

Key features include:

- View and manage recent activity logs.
- Simple and intuitive user interface built with Next.js.
- Backend API developed using Node.js and TypeScript.
- Persistent storage using SQLite.

## Setting Up the Project Locally

Follow these steps to clone, install dependencies, and run the project.

### Prerequisites

Ensure the following tools are installed on your system:

- **Node.js** (v16 or higher) - [Download Node.js](https://nodejs.org/)
- **SQLite3** (if not pre-installed, follow this guide: [Install SQLite3](https://www.sqlitetutorial.net/download-install-sqlite/))

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Mustapha-1610/Admin-CMS-Pecto.git

   ```

2. Navigate to the project directory:

   ```bash
   cd Admin-CMS-Pecto
   ```

3. Install dependencies for the root, frontend, and backend:
   ```bash
      npm install
        cd frontend && npm install
        cd ../backend && npm install
               cd ..
   ```
4. Start the development servers:
   ````bash
      npm run dev
     ```
   > This will concurrently start the backend server on **http://localhost:5000** and the frontend server on **http://localhost:3000**.
   ````

### Additional Notes

- **Ports:** Ensure ports 3000 (frontend) and 5000 (backend) are not in use before starting the project.
- **SQLite Database:** This project uses SQLite for persistent storage. If SQLite3 is not installed on your system, you can follow [this guide](https://www.sqlitetutorial.net/download-install-sqlite/) to install it.
