CREATE TABLE countries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255)
);

CREATE TABLE regions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        country INTEGER REFERENCES countries (id)
);

CREATE TABLE locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        region INTEGER REFERENCES regions (id)
);

CREATE TABLE users (
        login VARCHAR(255) PRIMARY KEY,
        password VARCHAR(255),
        email VARCHAR(255),
        avatar VARCHAR(255),
        name VARCHAR(255),
        location INTEGER REFERENCES locations (id),
        admin BOOLEAN,
	raiting INTEGER,
        ban BOOLEAN
);

CREATE TABLE sessions (
        id SERIAL PRIMARY KEY,
        login VARCHAR(255) REFERENCES users (login) ON DELETE CASCADE,
        user_agent VARCHAR(255),
        ip VARCHAR(255),
        refresh_token TEXT
);

CREATE TABLE baiting (
        id SERIAL PRIMARY KEY,
        description VARCHAR(255)
);

CREATE TABLE time (
        id SERIAL PRIMARY KEY,
        description VARCHAR(255)
);

CREATE TABLE road (
        id SERIAL PRIMARY KEY,
        description VARCHAR(255)
);

CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        login VARCHAR(255) REFERENCES users (login),
        date DATE,
        description TEXT,
        baiting INTEGER REFERENCES baiting (id),
        time INTEGER REFERENCES time (id),
        road INTEGER REFERENCES road (id),
        latitude VARCHAR(255),
        longitude VARCHAR(255),
	rating INTEGER
);

CREATE TABLE fishes (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        description VARCHAR(255),
        img_src VARCHAR(255)
);

CREATE TABLE baits (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        description VARCHAR(255)
);

CREATE TABLE methods (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        description VARCHAR(255)
);


CREATE TABLE facts (
        id SERIAL PRIMARY KEY,
	review INTEGER REFERENCES reviews (id) ON DELETE CASCADE,
        fish INTEGER REFERENCES fishes (id) ON DELETE CASCADE,
        bait INTEGER REFERENCES baits (id) ON DELETE CASCADE,
        method INTEGER REFERENCES methods (id) ON DELETE CASCADE
);

CREATE TABLE review_photos (
        review INTEGER REFERENCES reviews (id) ON DELETE CASCADE,
        src VARCHAR(255) PRIMARY KEY
);

CREATE TABLE review_stats (
        id SERIAL PRIMARY KEY,
        login VARCHAR(255) REFERENCES users (login) ON DELETE CASCADE,
        vote INTEGER,
        report BOOLEAN
);

CREATE TABLE companies (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        description TEXT,
        email VARCHAR(255),
        website VARCHAR(255),
        logo VARCHAR(255),
        gives_discounts BOOLEAN
);

CREATE TABLE departments (
        id SERIAL PRIMARY KEY,
        company INTEGER REFERENCES companies (id) ON DELETE CASCADE,
        adress VARCHAR(255),
        lattude VARCHAR(255),
        longitude VARCHAR(255)
);

CREATE TABLE discounts (
        id SERIAL PRIMARY KEY,
        company INTEGER REFERENCES companies (id) ON DELETE CASCADE,
        value INTEGER,
        login VARCHAR(255) REFERENCES users (login),
        qr VARCHAR(255)
);

INSERT INTO countries (name) VALUES ('Россия');
INSERT INTO regions (name, country) VALUES ('Рязанская область', '1');
INSERT INTO locations (name, region) VALUES ('Рязань', '1');
INSERT INTO users (login, password, email, name, location, avatar, raiting, ban, admin) VALUES ('test', 'test', 'test', 'test', 'test', '1', 'test', '0', '0', '0');

INSERT INTO baiting (description) VALUES ('Вообще нет рыбы');
INSERT INTO baiting (description) VALUES ('Плохо');
INSERT INTO baiting (description) VALUES ('Не отлично, но и не ужасно');
INSERT INTO baiting (description) VALUES ('Хорошо');
INSERT INTO baiting (description) VALUES ('Рыба сама запрыгивает в лодку');


INSERT INTO time (description) VALUES ('Первая половина дня');
INSERT INTO time (description) VALUES ('Вторая половина дня');
INSERT INTO time (description) VALUES ('В середине дня');
INSERT INTO time (description) VALUES ('Весь день');
INSERT INTO time (description) VALUES ('Несколько дней');


INSERT INTO road (description) VALUES ('Проедет любая машина');
INSERT INTO road (description) VALUES ('Проедет только внедорожник');
INSERT INTO road (description) VALUES ('Только пешком');
INSERT INTO road (description) VALUES ('Невозможно подойти');

INSERT INTO baits (name, description) VALUES ('Червь', 'Место для описания');
