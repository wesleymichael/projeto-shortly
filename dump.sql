--
-- PostgreSQL database dump
--

-- Dumped from database version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)

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
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer DEFAULT 0,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik1pY2hhZWwiLCJlbWFpbCI6Indlc2xleUBtaWNoYWVsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJEJQRWxoVDNaT1hrZVdNcUxvVHZ5dE84RFlySmNWenBEeXlKQWRXWm1YM0ZZYk9nVmhDTmVDIiwiY3JlYXRlZEF0IjoiMjAyMy0wNS0xOVQxODo0Nzo1OS4yODJaIiwiaWF0IjoxNjg0NTIyMDg1fQ.XDiefky_kmg-Vw6U1ujjQMzQO7Y705qRKfDxf08cVGI', '2023-05-19 15:48:05.90096');
INSERT INTO public.sessions VALUES (2, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik1pY2hhZWwiLCJlbWFpbCI6Indlc2xleUBtaWNoYWVsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJEJQRWxoVDNaT1hrZVdNcUxvVHZ5dE84RFlySmNWenBEeXlKQWRXWm1YM0ZZYk9nVmhDTmVDIiwiY3JlYXRlZEF0IjoiMjAyMy0wNS0xOVQxODo0Nzo1OS4yODJaIiwiaWF0IjoxNjg0NTMyMzMxfQ.VOGTUbFfB1vGM76dPR7EikTLzmtNN0ELuSQyxWWSE7M', '2023-05-19 18:38:51.058586');
INSERT INTO public.sessions VALUES (3, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik1pY2hhZWwiLCJlbWFpbCI6Indlc2xleUBtaWNoYWVsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJEJQRWxoVDNaT1hrZVdNcUxvVHZ5dE84RFlySmNWenBEeXlKQWRXWm1YM0ZZYk9nVmhDTmVDIiwiY3JlYXRlZEF0IjoiMjAyMy0wNS0xOVQxODo0Nzo1OS4yODJaIiwiaWF0IjoxNjg0NTMyNzYzfQ.fzeO38RWQOSPLgCGPZIdXpRtreKGukZAxACIJeEMOIQ', '2023-05-19 18:46:03.003133');
INSERT INTO public.sessions VALUES (4, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik1pY2hhZWwiLCJlbWFpbCI6Indlc2xleUBtaWNoYWVsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJEJQRWxoVDNaT1hrZVdNcUxvVHZ5dE84RFlySmNWenBEeXlKQWRXWm1YM0ZZYk9nVmhDTmVDIiwiY3JlYXRlZEF0IjoiMjAyMy0wNS0xOVQxODo0Nzo1OS4yODJaIiwiaWF0IjoxNjg0NTU4MDY4fQ.laQSx6l7OaeiyvJW5XF2YtjWjc_RBmTLGlNcyeEzZ34', '2023-05-20 01:47:48.011339');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (2, 1, 'www.globo.com', 'R_6yYZ2iymZrx6ykdNO7W', 1, '2023-05-20 01:48:07.180874');
INSERT INTO public.urls VALUES (3, 1, 'www.instagram.com', 'fVnJP0pArMZbdn2eBl6KB', 2, '2023-05-20 02:07:26.248998');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Michael', 'wesley@michael.com', '$2b$10$BPElhT3ZOXkeWMqLoTvytO8DYrJcVzpDyyJAdWZmX3FYbOgVhCNeC', '2023-05-19 15:47:59.282697');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 4, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

