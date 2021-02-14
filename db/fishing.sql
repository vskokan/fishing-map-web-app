--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5 (Ubuntu 12.5-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.5 (Ubuntu 12.5-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: baiting; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.baiting (
    id integer NOT NULL,
    description character varying(255)
);


ALTER TABLE public.baiting OWNER TO postgres;

--
-- Name: baiting_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.baiting_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.baiting_id_seq OWNER TO postgres;

--
-- Name: baiting_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.baiting_id_seq OWNED BY public.baiting.id;


--
-- Name: baits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.baits (
    id integer NOT NULL,
    name character varying(255),
    description character varying(255)
);


ALTER TABLE public.baits OWNER TO postgres;

--
-- Name: baits_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.baits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.baits_id_seq OWNER TO postgres;

--
-- Name: baits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.baits_id_seq OWNED BY public.baits.id;


--
-- Name: companies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.companies (
    id integer NOT NULL,
    name character varying(255),
    description text,
    email character varying(255),
    website character varying(255),
    logo character varying(255),
    gives_discounts boolean
);


ALTER TABLE public.companies OWNER TO postgres;

--
-- Name: companies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.companies_id_seq OWNER TO postgres;

--
-- Name: companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.id;


--
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- Name: countries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.countries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.countries_id_seq OWNER TO postgres;

--
-- Name: countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.countries_id_seq OWNED BY public.countries.id;


--
-- Name: departments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departments (
    id integer NOT NULL,
    company integer,
    adress character varying(255),
    lattude character varying(255),
    longitude character varying(255)
);


ALTER TABLE public.departments OWNER TO postgres;

--
-- Name: departments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.departments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.departments_id_seq OWNER TO postgres;

--
-- Name: departments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.departments_id_seq OWNED BY public.departments.id;


--
-- Name: discounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.discounts (
    id integer NOT NULL,
    company integer,
    value integer,
    login character varying(255),
    qr character varying(255)
);


ALTER TABLE public.discounts OWNER TO postgres;

--
-- Name: discounts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.discounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discounts_id_seq OWNER TO postgres;

--
-- Name: discounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.discounts_id_seq OWNED BY public.discounts.id;


--
-- Name: facts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.facts (
    id integer NOT NULL,
    fish integer,
    bait integer,
    method integer,
    review integer
);


ALTER TABLE public.facts OWNER TO postgres;

--
-- Name: facts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.facts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.facts_id_seq OWNER TO postgres;

--
-- Name: facts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.facts_id_seq OWNED BY public.facts.id;


--
-- Name: fishes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fishes (
    id integer NOT NULL,
    name character varying(255),
    description character varying(255),
    img_src character varying(255)
);


ALTER TABLE public.fishes OWNER TO postgres;

--
-- Name: fishes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fishes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fishes_id_seq OWNER TO postgres;

--
-- Name: fishes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fishes_id_seq OWNED BY public.fishes.id;


--
-- Name: locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locations (
    id integer NOT NULL,
    name character varying(255),
    region integer
);


ALTER TABLE public.locations OWNER TO postgres;

--
-- Name: locations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locations_id_seq OWNER TO postgres;

--
-- Name: locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locations_id_seq OWNED BY public.locations.id;


--
-- Name: methods; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.methods (
    id integer NOT NULL,
    name character varying(255),
    description character varying(255)
);


ALTER TABLE public.methods OWNER TO postgres;

--
-- Name: methods_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.methods_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.methods_id_seq OWNER TO postgres;

--
-- Name: methods_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.methods_id_seq OWNED BY public.methods.id;


--
-- Name: regions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.regions (
    id integer NOT NULL,
    name character varying(255),
    country integer
);


ALTER TABLE public.regions OWNER TO postgres;

--
-- Name: regions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.regions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.regions_id_seq OWNER TO postgres;

--
-- Name: regions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.regions_id_seq OWNED BY public.regions.id;


--
-- Name: review_photos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.review_photos (
    id integer NOT NULL,
    review integer,
    src character varying(255)
);


ALTER TABLE public.review_photos OWNER TO postgres;

--
-- Name: review_photos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.review_photos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.review_photos_id_seq OWNER TO postgres;

--
-- Name: review_photos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.review_photos_id_seq OWNED BY public.review_photos.id;


--
-- Name: review_stats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.review_stats (
    id integer NOT NULL,
    login character varying(255),
    vote integer,
    report boolean
);


ALTER TABLE public.review_stats OWNER TO postgres;

--
-- Name: review_stats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.review_stats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.review_stats_id_seq OWNER TO postgres;

--
-- Name: review_stats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.review_stats_id_seq OWNED BY public.review_stats.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    login character varying(255),
    date date,
    description text,
    baiting integer,
    "time" integer,
    road integer,
    latitude character varying(255),
    longitude character varying(255)
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_id_seq OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: road; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.road (
    id integer NOT NULL,
    description character varying(255)
);


ALTER TABLE public.road OWNER TO postgres;

--
-- Name: road_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.road_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.road_id_seq OWNER TO postgres;

--
-- Name: road_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.road_id_seq OWNED BY public.road.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    login character varying(255),
    user_agent character varying(255),
    ip character varying(255),
    refresh_token text
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: time; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."time" (
    id integer NOT NULL,
    description character varying(255)
);


ALTER TABLE public."time" OWNER TO postgres;

--
-- Name: time_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.time_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.time_id_seq OWNER TO postgres;

--
-- Name: time_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.time_id_seq OWNED BY public."time".id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    login character varying(255) NOT NULL,
    password character varying(255),
    email character varying(255),
    avatar character varying(255),
    name character varying(255),
    location integer,
    admin boolean,
    ban boolean,
    raiting integer
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: baiting id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.baiting ALTER COLUMN id SET DEFAULT nextval('public.baiting_id_seq'::regclass);


--
-- Name: baits id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.baits ALTER COLUMN id SET DEFAULT nextval('public.baits_id_seq'::regclass);


--
-- Name: companies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);


--
-- Name: countries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries ALTER COLUMN id SET DEFAULT nextval('public.countries_id_seq'::regclass);


--
-- Name: departments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments ALTER COLUMN id SET DEFAULT nextval('public.departments_id_seq'::regclass);


--
-- Name: discounts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discounts ALTER COLUMN id SET DEFAULT nextval('public.discounts_id_seq'::regclass);


--
-- Name: facts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facts ALTER COLUMN id SET DEFAULT nextval('public.facts_id_seq'::regclass);


--
-- Name: fishes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fishes ALTER COLUMN id SET DEFAULT nextval('public.fishes_id_seq'::regclass);


--
-- Name: locations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations ALTER COLUMN id SET DEFAULT nextval('public.locations_id_seq'::regclass);


--
-- Name: methods id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.methods ALTER COLUMN id SET DEFAULT nextval('public.methods_id_seq'::regclass);


--
-- Name: regions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.regions ALTER COLUMN id SET DEFAULT nextval('public.regions_id_seq'::regclass);


--
-- Name: review_photos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review_photos ALTER COLUMN id SET DEFAULT nextval('public.review_photos_id_seq'::regclass);


--
-- Name: review_stats id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review_stats ALTER COLUMN id SET DEFAULT nextval('public.review_stats_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: road id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.road ALTER COLUMN id SET DEFAULT nextval('public.road_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: time id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."time" ALTER COLUMN id SET DEFAULT nextval('public.time_id_seq'::regclass);


--
-- Data for Name: baiting; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.baiting (id, description) FROM stdin;
1	Вообще нет рыбы
2	Плохо
3	Не отлично, но и не ужасно
4	Хорошо
5	Рыба сама запрыгивает в лодку
\.


--
-- Data for Name: baits; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.baits (id, name, description) FROM stdin;
1	Червь	Классика
2	Опарыш	Про опарышей
3	Блесна	Про блесны
4	Воблер	Про воблеры
5	Каша	Описание каши....
6	Мотыль	Про мотыля
\.


--
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.companies (id, name, description, email, website, logo, gives_discounts) FROM stdin;
\.


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.countries (id, name) FROM stdin;
1	Россия
\.


--
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departments (id, company, adress, lattude, longitude) FROM stdin;
\.


--
-- Data for Name: discounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.discounts (id, company, value, login, qr) FROM stdin;
\.


--
-- Data for Name: facts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.facts (id, fish, bait, method, review) FROM stdin;
6	5	5	1	8
7	1	2	1	9
8	2	2	1	9
9	1	2	1	10
10	2	3	2	10
24	1	2	1	16
25	3	5	3	17
26	1	5	3	17
\.


--
-- Data for Name: fishes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fishes (id, name, description, img_src) FROM stdin;
2	Окунь	Тут будет текст про окуней	uploads/fishes/1612970106284okun.jpeg
1	Карась	Тут будет текст про карасей!	uploads/fishes/1612968942383karas.jpeg
3	Сом	Тут будет текст про сомов	uploads/fishes/1612970349757som.jpeg
4	Язь	Йаааааааааааазь	uploads/fishes/1612970462641yaz.jpeg
5	Ничего	В ведре пусто, как и в душе...	uploads/fishes/1612971456324nothing.jpg
6	Щука	Про щуку	uploads/fishes/1612972193952shuka.jpeg
\.


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locations (id, name, region) FROM stdin;
1	Рязань	1
3	Саранск	4
\.


--
-- Data for Name: methods; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.methods (id, name, description) FROM stdin;
1	Поплавок	Описание
2	Спиннинг	Описание спиннинга
3	Донка	Описание донки
4	Нахлыст	Описание нахлыста
\.


--
-- Data for Name: regions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.regions (id, name, country) FROM stdin;
1	Рязанская область	1
3	Московская область	1
5	Владимирская область	1
4	Республика Мордовия	1
\.


--
-- Data for Name: review_photos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.review_photos (id, review, src) FROM stdin;
7	16	uploads/reviews/admin/1613218889759photo_2019-07-13_16-04-40.jpg
8	16	uploads/reviews/admin/1613218889763photo_2019-07-12_15-00-56.jpg
9	17	uploads/reviews/admin/1613223981461photo_2021-02-10_07-19-33.jpg
10	17	uploads/reviews/admin/1613223981462photo_2019-07-13_16-04-55.jpg
11	17	uploads/reviews/admin/1613223981464photo_2019-07-13_16-04-40.jpg
12	17	uploads/reviews/admin/1613223981465photo_2019-07-12_15-00-56.jpg
\.


--
-- Data for Name: review_stats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.review_stats (id, login, vote, report) FROM stdin;
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, login, date, description, baiting, "time", road, latitude, longitude) FROM stdin;
8	victoria	2021-02-11	Любимый университет...	1	1	1	54.62880587738522	39.752110170913305
9	victoria	2021-02-12	Озеро мелковато, рыбы мало...много странных людей...	3	1	2	54.47772211542125	40.18852073062152
10	victoria	2021-02-12	Уютное место, нужна лодка	3	3	4	54.46779932872963	40.210504115707565
16	admin	2021-02-13	Мелко и люди мешают...	2	1	3	54.473296593898255	40.20369375542071
17	admin	2021-02-13	тест нескольких фото	2	2	2	54.56437302408243	39.999073394092584
\.


--
-- Data for Name: road; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.road (id, description) FROM stdin;
1	Проедет любая машина
2	Проедет только внедорожник
3	Только пешком
4	Невозможно подойти
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, login, user_agent, ip, refresh_token) FROM stdin;
5	admin	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:84.0) Gecko/20100101 Firefox/84.0	::ffff:127.0.0.1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImxvZ2luIjoiYWRtaW4iLCJ1c2VyQWdlbnQiOiJNb3ppbGxhLzUuMCAoWDExOyBVYnVudHU7IExpbnV4IHg4Nl82NDsgcnY6ODQuMCkgR2Vja28vMjAxMDAxMDEgRmlyZWZveC84NC4wIiwiY3JlYXRlZCI6MTYxMzIyMzY2ODExNn0sImlhdCI6MTYxMzIyMzY2OH0.2c3oNVAA2ibPr6CnWkEckFMhAf9lvJgWpbgI3f-WVNk
\.


--
-- Data for Name: time; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."time" (id, description) FROM stdin;
1	Первая половина дня
2	Вторая половина дня
3	В середине дня
4	Весь день
5	Несколько дней
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (login, password, email, avatar, name, location, admin, ban, raiting) FROM stdin;
admin	$2b$10$Sgf8BKXHXcWai8sF.KRbDeMrWyMfyUYydb/it562W2bEhBJxWi6cO	admin@mail.com	uploads/users/161298146886499e56dd5f37419d238b48bb928560ff5.jpeg	Не указано	1	t	f	10
victoria	$2b$10$Pozgw.xn9qh.ARb3RuG20OuzqwZZHa9tpi4LfuqB5BvahGu5bmb7i	victoriaskokan@gmail.com	uploads/users/1613062696047-.jpg_640x640q70.jpeg	Вика	1	f	f	0
\.


--
-- Name: baiting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.baiting_id_seq', 5, true);


--
-- Name: baits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.baits_id_seq', 6, true);


--
-- Name: companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.companies_id_seq', 1, false);


--
-- Name: countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.countries_id_seq', 1, true);


--
-- Name: departments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departments_id_seq', 1, false);


--
-- Name: discounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.discounts_id_seq', 1, false);


--
-- Name: facts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.facts_id_seq', 26, true);


--
-- Name: fishes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fishes_id_seq', 6, true);


--
-- Name: locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locations_id_seq', 3, true);


--
-- Name: methods_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.methods_id_seq', 4, true);


--
-- Name: regions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.regions_id_seq', 5, true);


--
-- Name: review_photos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.review_photos_id_seq', 12, true);


--
-- Name: review_stats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.review_stats_id_seq', 1, false);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 17, true);


--
-- Name: road_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.road_id_seq', 4, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 5, true);


--
-- Name: time_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.time_id_seq', 5, true);


--
-- Name: baiting baiting_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.baiting
    ADD CONSTRAINT baiting_pkey PRIMARY KEY (id);


--
-- Name: baits baits_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.baits
    ADD CONSTRAINT baits_pkey PRIMARY KEY (id);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);


--
-- Name: discounts discounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discounts
    ADD CONSTRAINT discounts_pkey PRIMARY KEY (id);


--
-- Name: facts facts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facts
    ADD CONSTRAINT facts_pkey PRIMARY KEY (id);


--
-- Name: fishes fishes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fishes
    ADD CONSTRAINT fishes_pkey PRIMARY KEY (id);


--
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- Name: methods methods_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.methods
    ADD CONSTRAINT methods_pkey PRIMARY KEY (id);


--
-- Name: regions regions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.regions
    ADD CONSTRAINT regions_pkey PRIMARY KEY (id);


--
-- Name: review_photos review_photos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review_photos
    ADD CONSTRAINT review_photos_pkey PRIMARY KEY (id);


--
-- Name: review_stats review_stats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review_stats
    ADD CONSTRAINT review_stats_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: road road_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.road
    ADD CONSTRAINT road_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: time time_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."time"
    ADD CONSTRAINT time_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (login);


--
-- Name: departments departments_company_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_company_fkey FOREIGN KEY (company) REFERENCES public.companies(id) ON DELETE CASCADE;


--
-- Name: discounts discounts_company_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discounts
    ADD CONSTRAINT discounts_company_fkey FOREIGN KEY (company) REFERENCES public.companies(id) ON DELETE CASCADE;


--
-- Name: discounts discounts_login_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discounts
    ADD CONSTRAINT discounts_login_fkey FOREIGN KEY (login) REFERENCES public.users(login);


--
-- Name: facts facts_bait_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facts
    ADD CONSTRAINT facts_bait_fkey FOREIGN KEY (bait) REFERENCES public.baits(id) ON DELETE CASCADE;


--
-- Name: facts facts_fish_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facts
    ADD CONSTRAINT facts_fish_fkey FOREIGN KEY (fish) REFERENCES public.fishes(id) ON DELETE CASCADE;


--
-- Name: facts facts_methods_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facts
    ADD CONSTRAINT facts_methods_fkey FOREIGN KEY (method) REFERENCES public.methods(id) ON DELETE CASCADE;


--
-- Name: facts fk_facts_reviews; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facts
    ADD CONSTRAINT fk_facts_reviews FOREIGN KEY (review) REFERENCES public.reviews(id) ON DELETE CASCADE;


--
-- Name: locations locations_region_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_region_fkey FOREIGN KEY (region) REFERENCES public.regions(id);


--
-- Name: regions regions_country_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.regions
    ADD CONSTRAINT regions_country_fkey FOREIGN KEY (country) REFERENCES public.countries(id);


--
-- Name: review_photos review_photos_review_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review_photos
    ADD CONSTRAINT review_photos_review_fkey FOREIGN KEY (review) REFERENCES public.reviews(id) ON DELETE CASCADE;


--
-- Name: review_stats review_stats_login_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review_stats
    ADD CONSTRAINT review_stats_login_fkey FOREIGN KEY (login) REFERENCES public.users(login) ON DELETE CASCADE;


--
-- Name: reviews reviews_baiting_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_baiting_fkey FOREIGN KEY (baiting) REFERENCES public.baiting(id);


--
-- Name: reviews reviews_login_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_login_fkey FOREIGN KEY (login) REFERENCES public.users(login);


--
-- Name: reviews reviews_road_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_road_fkey FOREIGN KEY (road) REFERENCES public.road(id);


--
-- Name: reviews reviews_time_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_time_fkey FOREIGN KEY ("time") REFERENCES public."time"(id);


--
-- Name: sessions sessions_login_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_login_fkey FOREIGN KEY (login) REFERENCES public.users(login) ON DELETE CASCADE;


--
-- Name: users users_location_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_location_fkey FOREIGN KEY (location) REFERENCES public.locations(id);


--
-- PostgreSQL database dump complete
--

