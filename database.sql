DROP TABLE IF EXISTS visitors;

CREATE TABLE visitors (
    id SERIAL PRIMARY KEY,
    visitorName character varying(50),
    assistant character varying(50),
    age integer,
    dateofvisit varchar,
    timeofvisit varchar,
    comments character varying(255)
);

