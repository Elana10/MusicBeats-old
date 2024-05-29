CREATE TABLE applesongs (
  id SERIAL PRIMARY KEY,
  appleID TEXT NOT NULL UNIQUE,
  name TEXT,
  artist TEXT,
  JSONString TEXT NOT NULL, 
  bpm INT 
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1)
);

CREATE TABLE playlists(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    tempo TEXT NOT NULL, 
    userid INTEGER 
      REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO playlists (name, tempo, userid) VALUES ('Chill Late Night', 'slow', 1);

CREATE TABLE playlists_songs(
  id SERIAL PRIMARY KEY,
  playlistid INTEGER 
    REFERENCES playlists(id) ON DELETE CASCADE,
  songid INTEGER 
    REFERENCES applesongs(appleid) ON DELETE CASCADE
);
