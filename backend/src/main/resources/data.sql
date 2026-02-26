INSERT INTO ARTIST (ARTIST_ID, ARTIST_NAME, EMAIL, PASSWORD, BIO, GENRE)
VALUES
  (1, 'Anirudh Ravichander', 'anirudh@revplay.local', 'password123', 'Tamil composer with strong dance and melody catalog', 'Tamil Item'),
  (2, 'Yuvan Shankar Raja', 'yuvan@revplay.local', 'password123', 'Tamil composer known for melody and love-failure tracks', 'Love Failure'),
  (3, 'D. Imman', 'imman@revplay.local', 'password123', 'Tamil composer with folk and gaana style songs', 'Gaana'),
  (4, 'Hiphop Tamizha', 'hiphop@revplay.local', 'password123', 'Tamil rapper and composer with mass beats', 'Gaana');

INSERT INTO ALBUM (ALBUM_ID, NAME, RELEASE_DATE, ARTIST_ID)
VALUES
  (1, 'Chennai Night Kuthu', DATE '2023-01-14', 1),
  (2, 'Kadhal Notes', DATE '2023-02-10', 2),
  (3, 'Street Gaana Vol 1', DATE '2024-03-08', 3),
  (4, 'Metro Mix Tape', DATE '2025-06-20', 4);

INSERT INTO SONG (SONG_ID, TITLE, GENRE, DURATION, AUDIO_FILE_URL, VISIBILITY, ARTIST_ID, ALBUM_ID)
VALUES
  (1, 'Aattam Podu Di', 'Tamil Item', 218, '/uploads/songs/0cd150c7-16c1-430f-938c-95cb5252c4f9.mp3', 'PUBLIC', 1, 1),
  (2, 'Kuthu Queen', 'Tamil Item', 205, '/uploads/songs/7c3316c6-11a3-4b85-84df-0bd468dd0fa4.mp3', 'PUBLIC', 1, 1),
  (3, 'Nightu Dancer', 'Tamil Item', 231, '/uploads/songs/b3665477-8da6-417c-888a-7262830c305b.mp3', 'PUBLIC', 1, 1),
  (4, 'Mazhai Neram Melody', 'Melody', 244, '/uploads/songs/d5796320-9332-4f88-9fed-b687910be4ed.mp3', 'PUBLIC', 2, 2),
  (5, 'Unnai Thedi', 'Melody', 229, '/uploads/songs/e4628b71-b249-4a15-a8aa-3580d9735a14.mp3', 'PUBLIC', 2, 2),
  (6, 'Kadhal Pochu', 'Love Failure', 221, '/uploads/songs/ff3f0586-d2c5-4829-9f9f-cd8e4a869bcd.mp3', 'PUBLIC', 2, 2),
  (7, 'Nenjam Odanjudhu', 'Love Failure', 236, '/uploads/songs/0cd150c7-16c1-430f-938c-95cb5252c4f9.mp3', 'PUBLIC', 2, 2),
  (8, 'Sarakku Beat', 'Gaana', 226, '/uploads/songs/7c3316c6-11a3-4b85-84df-0bd468dd0fa4.mp3', 'PUBLIC', 3, 3),
  (9, 'Theru Kuthu Star', 'Gaana', 214, '/uploads/songs/b3665477-8da6-417c-888a-7262830c305b.mp3', 'PUBLIC', 3, 3),
  (10, 'Ooru Suthi Aadu', 'Gaana', 211, '/uploads/songs/d5796320-9332-4f88-9fed-b687910be4ed.mp3', 'PUBLIC', 3, 3),
  (11, 'Local Dance Floor', 'Tamil Item', 224, '/uploads/songs/e4628b71-b249-4a15-a8aa-3580d9735a14.mp3', 'PUBLIC', 4, 4),
  (12, 'City Light Kadhal', 'Melody', 232, '/uploads/songs/ff3f0586-d2c5-4829-9f9f-cd8e4a869bcd.mp3', 'PUBLIC', 4, 4),
  (13, 'Broken Heart Station', 'Love Failure', 227, '/uploads/songs/0cd150c7-16c1-430f-938c-95cb5252c4f9.mp3', 'PUBLIC', 4, 4),
  (14, 'Auto Stand Anthem', 'Gaana', 219, '/uploads/songs/7c3316c6-11a3-4b85-84df-0bd468dd0fa4.mp3', 'PUBLIC', 4, 4),
  (15, 'Test Track MP3', 'Melody', 210, '/uploads/songs/test-track.mp3', 'PUBLIC', 1, 1);

ALTER SEQUENCE ARTIST_SEQ RESTART WITH 5;
ALTER SEQUENCE ALBUM_SEQ RESTART WITH 5;
ALTER SEQUENCE SONG_SEQ RESTART WITH 16;
