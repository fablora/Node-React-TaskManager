<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">Task Manager</h3>

  <p align="center">
    <a href="https://github.com/fablora/FinanceMinder"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/fablora/task-manager">View Demo</a>
    ·
    <a href="https://github.com/fablora/task-manager/issues">Report Bug</a>
    ·
    <a href="https://github.com/fablora/task-manager/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li> 
    <li><a href="#setup-and-installation">Setup and Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project


A full-stack task management application built with Express, MongoDB, Node.js, and React.js. The application allows admin users to create projects, assign users to projects, and assign tasks to users. Regular users can update the status of their tasks, which then triggers a review from the admin before the task status is marked as completed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

*  **Backend:** &nbsp;&nbsp; ![Node.js](https://img.shields.io/badge/Node.js-black?logo=Node.js) &nbsp;&nbsp;![Express](https://img.shields.io/badge/Express-black?logo=Express) &nbsp;&nbsp;![MongoDB](https://img.shields.io/badge/MongoDB-black?logo=MongoDB) &nbsp;&nbsp;![Static Badge](https://img.shields.io/badge/Mongoose-black?logo=Mongoose)
* **Frontend:** &nbsp;&nbsp; ![Static Badge](https://img.shields.io/badge/React-black?logo=react)
* **Real-Time Communication:** &nbsp;&nbsp; ![Static Badge](https://img.shields.io/badge/Sokcet.io-black?logo=Socket.io)
* **Authentication:** &nbsp;&nbsp; ![Static Badge](https://img.shields.io/badge/JWT-black?logo=jwt)
* **Styling:** &nbsp;&nbsp; ![Static Badge](https://img.shields.io/badge/CSS-black?logo=CSS)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features

* **User Authentication:** Register and login functionalities using JWT for authentication
* **Project Management:** Create, view, and delete projects
* **Task Management:** Create, view, and delete tasks associated with projects
* **User Management:** Admins can assign users to projects and tasks
* **Real-time Updates:** Task status updates trigger notifications using Socket.io
* **Role-based Access Control:** Admin and user roles with different permissions


<!-- GETTING STARTED -->
## Setup and Installation

### 1. Clone the repository
```
git clone https://github.com/yourusername/task-manager.git
```
```
cd task-manager
```


### 2. Backend Setup
#### Navigate to the backend directory and install dependencies:
```
cd backend
```
```
npm install
```
#### Create a .env file and add your MongoDB URI and JWT secret:
```
MONGO_URI=mongodb://localhost:27017/taskmanager
```
```
JWT_SECRET=your_jwt_secret
```
#### Start the backend server:
```
npm start
```
### 3. Frontend Setup
#### On the frontend directory
```
npm install
```
#### Start the frontend development server
```
npm start
```

## Usage 
* **Admin Dashboard:** Admins can create projects, assign users to projects, and assign tasks to users
* **User Dashboard:** Users can view their assigned projects and tasks, and update task statuses
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

### Additional Features
- **Protected Routes:** Implement additional route protections for enhanced security
- **Complete CRUD Operations:** Finalise CRUD functionality in the admin dashboard
- **Task Status Review:** Implement a feature for admins to review and approve task status changes
- **UI Enhancements:** Improve the user interface for better user experience
