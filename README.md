
# University Search Web App
  

This is a web application for searching universities based on country and name. The data is retrieved from the [University Domains List API](https://github.com/Hipo/university-domains-list).
  

## Features

- Search for universities by country and name
- Save and remove universities to favorites
- View favorite universities
- Responsive UI from mobile to desktop
- API performance tracking
- Is strictly typed throughout


## Tech Stack

- Typescript
- React
- Next.js
- Tailwind CSS
- React Query


## Prerequisites

  

Before you begin, ensure you have met the following requirements:

  

- You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/)

- If using Docker, you have installed the latest version of [Docker](https://www.docker.com/)
  

## Using The App

### Running Locally

To run the University Search application locally, follow these steps:

  
1. Navigate to the project directory
  

```bash
cd  university-app
```


2. Install the dependencies:

```bash
npm  install
```


3. Start the development server:


```bash
npm  run  dev
```

  

4. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

  

### Running With Docker

To run the University Search application with dockewr, follow these steps:

  

1. Navigate to the project directory

  

```bash
cd  university-app
```

  

2. Build the Docker image:

```bash
docker  build  -t  university-app  .
```

  

3. Start the development server:

  

```bash
docker  run  -d  -p  3000:3000  university-app
```

  

4. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.