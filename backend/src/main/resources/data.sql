INSERT INTO ARTIST (id, name) VALUES (1, 'Tarun Artist');

INSERT INTO SONG (id, title, play_count, artist_id)
VALUES (1, 'Dream Night', 250000, 1);

INSERT INTO SONG (id, title, play_count, artist_id)
VALUES (2, 'Sky High', 180000, 1);

INSERT INTO FAVORITE (id, song_id) VALUES (1, 1);
INSERT INTO FAVORITE (id, song_id) VALUES (2, 1);
INSERT INTO FAVORITE (id, song_id) VALUES (3, 2);

INSERT INTO LISTENING_HISTORY (id, song_id, listener_name, listened_date)
VALUES (1, 1, 'Ava', '2026-02-20');
INSERT INTO LISTENING_HISTORY (id, song_id, listener_name, listened_date)
VALUES (2, 1, 'Ava', '2026-02-21');
INSERT INTO LISTENING_HISTORY (id, song_id, listener_name, listened_date)
VALUES (3, 1, 'Noah', '2026-02-21');
INSERT INTO LISTENING_HISTORY (id, song_id, listener_name, listened_date)
VALUES (4, 2, 'Liam', '2026-02-22');
INSERT INTO LISTENING_HISTORY (id, song_id, listener_name, listened_date)
VALUES (5, 2, 'Ava', '2026-02-22');
