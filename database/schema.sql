CREATE DATABASE IF NOT EXISTS chat;

USE chat;

DROP TABLE IF EXISTS message;

CREATE TABLE IF NOT EXISTS message (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  alias CHAR(32) NOT NULL,
  room VARCHAR(256) NOT NULL,
  text VARCHAR(512) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
);

/*
INSERT INTO message (id, alias, room, text) VALUES 
  (1, 'ben', 'mysql', 'test message'),
  (2, 'taylor', 'mysql', 'another message'),
  (3, 'brian', 'mysql', 'woohooo'),
  (4, 'holly', 'mysql', 'hi there');
*/

