CREATE TYPE LOCATION_TYPE AS ENUM ('polica', 'ladica', 'šipka za odjecu');
CREATE TYPE ARTICLE_CATEGORY AS ENUM ('majica', 'košulja', 'trenirka - gornji dio', 'trenirka - donji dio', 'traperice', 'cipele', 'tenisice', 'čizme', 'štikle', 'haljina', 'suknja', 'jakna', 'kaput');
CREATE TYPE ARTICLE_SEASON AS ENUM ('proljeće', 'ljeto', 'jesen', 'zima');
CREATE TYPE ARTICLE_OPEN AS ENUM ('otvoreno', 'zatvoreno', 'kiša/snijeg');
CREATE TYPE ARTICLE_CASUAL AS ENUM ('za doma', 'sportsko', 'ležerno', 'radno', 'svečano');
CREATE TYPE ARTICLE_COLOR AS ENUM ('bijela', 'siva', 'crna', 'crvena', 'plava', 'žuta', 'zelena', 'ljubičasta', 'narančasta', 'smeđa', 'roza', 'bež');

CREATE TABLE users (
	username			VARCHAR(20) PRIMARY KEY,
	pass				VARCHAR(20) NOT NULL,
	city				VARCHAR(20) NOT NULL,
	country				VARCHAR(20) NOT NULL,
	e_mail				VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE marketers (
	username			VARCHAR(20) PRIMARY KEY,
	pass				VARCHAR(20) NOT NULL,
	e_mail				VARCHAR(20) NOT NULL UNIQUE,
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
	type_loc			LOCATION_TYPE NOT NULL,
	FOREIGN KEY (closet_id) REFERENCES closets(closet_id) ON DELETE CASCADE
);

CREATE TABLE articles_user (
	article_id			SERIAL PRIMARY KEY,
	location_id			INT NOT NULL,
	sharing				BOOL DEFAULT FALSE,
	title				VARCHAR(50) NOT NULL,
	image				BYTEA NOT NULL,
	category			ARTICLE_CATEGORY NOT NULL,
	season				ARTICLE_SEASON NOT NULL,
	openess				ARTICLE_OPEN 
							CONSTRAINT ch_category CHECK (
							((category = 'cipele' OR category = 'tenisice' OR category = 'čizme' OR category = 'štikle') AND openess IS NOT NULL) OR
							((category <> 'cipele' AND category <>'tenisice' AND category <> 'čizme' AND category <> 'štikle') AND openess IS NULL)
							)
							CONSTRAINT ch_season CHECK (
							((season = 'zima' AND openess = 'zatvoreno') OR (season = 'zima' AND openess = 'kiša/snijeg')) OR
							(season <> 'zima')),
	how_casual			ARTICLE_CASUAL NOT NULL,
	main_color			ARTICLE_COLOR NOT NULL,
	side_color			ARTICLE_COLOR NOT NULL,
	description			VARCHAR(500),
	FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE
);

CREATE TABLE articles_marketing (
	article_id			SERIAL PRIMARY KEY,
	article_marketer	VARCHAR(20) NOT NULL,
	title				VARCHAR(20) NOT NULL,
	category			ARTICLE_CATEGORY NOT NULL,
	image				BYTEA NOT NULL,
	price				REAL NOT NULL,
	FOREIGN KEY (article_marketer) REFERENCES marketers(username) ON DELETE CASCADE
);