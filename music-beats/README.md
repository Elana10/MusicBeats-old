# MusicBeats

MusicBeats is a web application that generates playlists of music with either fast or slow tempos. It leverages the Apple Music API and ChatGPT API to provide users with personalized playlists. Users can sign in or create an account, authorize their Apple Music account, create playlists, listen to them, and edit or view other users' playlists.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Potential Updates](#potential-updates)
- [Contributing](#contributing)
- [License](#license)

## Features

- Generate playlists with fast or slow tempos
- Integration with Apple Music API for music streaming
- Integration with ChatGPT API for personalized playlist recommendations
- User authentication and authorization
- Store user information, songs, and playlists in a database
- Pagination and sorting of playlists
- Edit and view created playlists
- View other users' playlists

## Installation

### Prerequisites

- Node.js and npm installed on your machine
- PostgreSQL database setup

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/musicbeats.git
    ```
2. Navigate to the project directory:
    ```bash
    cd musicbeats
    ```
3. Install dependencies for both frontend and backend:
    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```
4. Configure the environment variables for both frontend and backend:
    - Create a `.env` file in the `frontend` and `backend` directories and add the necessary environment variables.

5. Run the development servers:
    ```bash
    # In the backend directory
    npm start

    # In the frontend directory
    npm run dev
    ```

## Usage

1. Sign in or create an account on MusicBeats.
2. Authorize Apple Music on the app.
3. Create a playlist with fast or slow beats per minute.
4. Listen to your playlist.
5. Edit your created playlists or view other users' playlists.

## Tech Stack

- **Frontend:** React with Vite, CSS for styling
- **Backend:** Node.js, Express.js, Axios for API requests
- **Database:** PostgreSQL
- **APIs:** Apple Music API, ChatGPT API

## Potential Updates

- Sorting playlists by tempo and name
- Adding admin functionality to change/update song information
- Creating a genre table and songs_genres table for genre-based requests
- Implementing rules to ensure only slow songs on slow playlists and fast songs on fast playlists
- Adding comments and ratings to playlists
- Implementing Apple Music API pagination

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

