CREATE TABLE users (
	username			VARCHAR(20) PRIMARY KEY,
	pass				VARCHAR(200) NOT NULL,
	city				VARCHAR(20) NOT NULL,
	country				VARCHAR(20) NOT NULL,
	e_mail				VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE marketers (
	username			VARCHAR(20) PRIMARY KEY,
	pass				VARCHAR(200) NOT NULL,
	e_mail				VARCHAR(50) NOT NULL UNIQUE,
	logo				BYTEA NOT NULL UNIQUE
);

CREATE TABLE closets (
	closet_id			SERIAL PRIMARY KEY,
	closet_owner		VARCHAR(20) NOT NULL,
	FOREIGN KEY (closet_owner) REFERENCES users(username) ON DELETE CASCADE
);

CREATE TABLE locations (
	location_id			SERIAL PRIMARY KEY,
	closet_id			INT NOT NULL,
	location_type		VARCHAR(20) NOT NULL,
	FOREIGN KEY (closet_id) REFERENCES closets(closet_id) ON DELETE CASCADE
);

CREATE TABLE articles_user (
	article_id			SERIAL PRIMARY KEY,
	location_id			INT NOT NULL,
	sharing				BOOL DEFAULT FALSE,
	title				VARCHAR(50) NOT NULL,
	img					BYTEA NOT NULL,
	category			VARCHAR(20) NOT NULL,
	season				VARCHAR(20) NOT NULL,
	openess				VARCHAR(20),
	how_casual			VARCHAR(20) NOT NULL,
	main_color			VARCHAR(20) NOT NULL,
	side_color			VARCHAR(20) NOT NULL,
	descript			VARCHAR(500),
	FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE
);

CREATE TABLE articles_marketing (
	article_id			SERIAL PRIMARY KEY,
	article_marketer	VARCHAR(20) NOT NULL,
	title				VARCHAR(50) NOT NULL,
	category			VARCHAR(20) NOT NULL,
	img					BYTEA NOT NULL,
	price				REAL NOT NULL,
	FOREIGN KEY (article_marketer) REFERENCES marketers(username) ON DELETE CASCADE
);