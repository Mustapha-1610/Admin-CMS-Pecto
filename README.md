# Admin CMS Pecto

Admin CMS Pecto is a lightweight and user-friendly content management system designed for managing and monitoring data. It leverages a SQLite database and provides a clear separation of frontend and backend functionalities.

Key features include:

- View and manage recent activity logs.
- Simple and intuitive user interface built with Next.js.
- Backend API developed using Node.js and TypeScript.
- Persistent storage using SQLite.

## Features

Admin CMS offers the following features :

1. **Dashboard Overview**  
   View all data at a glance on the main dashboard, making it easy to monitor and manage information.  
   ![Main Page](https://firebasestorage.googleapis.com/v0/b/dar-seranity.appspot.com/o/MainPage.PNG?alt=media&token=7efe9e39-14b1-4279-bf6d-bbb3987f5e69)

2. **Edit Modal**  
   Update existing records with ease using the edit modal, designed for quick and efficient modifications.  
   ![Edit Modal](https://firebasestorage.googleapis.com/v0/b/dar-seranity.appspot.com/o/EditInterface.PNG?alt=media&token=07c9360c-c267-46c3-933b-8b92f940c85e)

3. **Recent Activity Logs**  
   Keep track of all administrative actions with the activity log, providing a clear audit trail of changes made.  
   ![Recent Activity](https://firebasestorage.googleapis.com/v0/b/dar-seranity.appspot.com/o/RecentActivity.PNG?alt=media&token=7573342d-3488-40bd-8553-663c454e946e)

## Setting Up the Project Locally

Follow these steps to clone, install dependencies, and run the project.

## Prerequisites

Ensure the following tools are installed on your system:

- **Node.js** (v16 or higher) - [Download Node.js](https://nodejs.org/)
- **SQLite3** (if not pre-installed, follow this guide: [Install SQLite3](https://www.sqlitetutorial.net/download-install-sqlite/))

## Installation Steps

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
   cd frontend then npm install
   cd ../backend then npm install
   cd ..
   ```
4. Start the development servers:

   ```bash
   npm run dev
   ```

   > This will concurrently start the backend server on **http://localhost:5000** and the frontend server on **http://localhost:3000**.

## Additional Notes

- **Ports:** Ensure ports 3000 (frontend) and 5000 (backend) are not in use before starting the project.
- **SQLite Database:** This project uses SQLite for persistent storage. If SQLite3 is not installed on your system, you can follow [this guide](https://www.sqlitetutorial.net/download-install-sqlite/) to install it.
