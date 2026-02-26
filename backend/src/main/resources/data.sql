INSERT INTO artist (id, name, bio, genre)
VALUES (1, 'Anirudh Ravichander', 'Tamil composer with strong dance and melody catalog', 'Tamil Item');

INSERT INTO artist (id, name, bio, genre)
VALUES (2, 'Yuvan Shankar Raja', 'Tamil composer known for melody and love-failure tracks', 'Love Failure');

INSERT INTO artist (id, name, bio, genre)
VALUES (3, 'D. Imman', 'Tamil composer with folk and gaana style songs', 'Gaana');

INSERT INTO artist (id, name, bio, genre)
VALUES (4, 'Hiphop Tamizha', 'Tamil rapper and composer with mass beats', 'Gaana');

INSERT INTO album (id, name, release_date, artist_id)
VALUES (1, 'Chennai Night Kuthu', '2023-01-14', 1);

INSERT INTO album (id, name, release_date, artist_id)
VALUES (2, 'Kadhal Notes', '2023-02-10', 2);

INSERT INTO album (id, name, release_date, artist_id)
VALUES (3, 'Street Gaana Vol 1', '2024-03-08', 3);

INSERT INTO album (id, name, release_date, artist_id)
VALUES (4, 'Metro Mix Tape', '2025-06-20', 4);

INSERT INTO song (id, title, genre, duration, release_date, artist_id, album_id)
VALUES (1, 'Aattam Podu Di', 'Tamil Item', 218, '2022-01-14', 1, 1);

INSERT INTO song (id, title, genre, duration, release_date, artist_id, album_id)
VALUES (2, 'Kuthu Queen', 'Tamil Item', 205, '2023-02-11', 1, 1);

INSERT INTO song (id, title, genre, duration, release_date, artist_id, album_id)
VALUES (3, 'Nightu Dancer', 'Tamil Item', 231, '2024-03-18', 1, 1);

INSERT INTO song (id, title, genre, duration, release_date, artist_id, album_id)
VALUES (4, 'Mazhai Neram Melody', 'Melody', 244, '2023-02-10', 2, 2);

INSERT INTO song (id, title, genre, duration, release_date, artist_id, album_id)
VALUES (5, 'Unnai Thedi', 'Melody', 229, '2025-03-03', 2, 2);

INSERT INTO song (id, title, genre, duration, release_date, artist_id, album_id)
VALUES (6, 'Kadhal Pochu', 'Love Failure', 221, '20213-04-07', 2, 2);

INSERT INTO song (id, title, genre, duration, release_date, artist_id, album_id)
VALUES (7, 'Nenjam Odanjudhu', 'Love Failure', 236, '2022-05-12', 2, 2);

INSERT INTO song (id, title, genre, duration, release_date, artist_id, album_id)
VALUES (8, 'Sarakku Beat', 'Gaana', 226, '2024-03-08', 3, 3);

INSERT INTO song (id, title, genre, duration, release_date, artist_id, album_id)
VALUES (9, 'Theru Kuthu Star', 'Gaana', 214, '2022-03-29', 3, 3);

INSERT INTO song (id, title, genre, duration, release_date, artist_id, album_id)
VALUES (10, 'Ooru Suthi Aadu', 'Gaana', 211, '2014-04-19', 3, 3);

INSERT INTO song (id, title, genre, duration, release_date, artist_id, album_id)
VALUES (11, 'Local Dance Floor', 'Tamil Item', 224, '2015-06-20', 4, 4);

INSERT INTO song (id, title, genre, duration, release_date, artist_id, album_id)
VALUES (12, 'City Light Kadhal', 'Melody', 232, '2017-07-11', 4, 4);

INSERT INTO song (id, title, genre, duration, release_date, artist_id, album_id)
VALUES (13, 'Broken Heart Station', 'Love Failure', 227, '2025-08-01', 4, 4);

INSERT INTO song (id, title, genre, duration, release_date, artist_id, album_id)
VALUES (14, 'Auto Stand Anthem', 'Gaana', 219, '2005-08-22', 4, 4);