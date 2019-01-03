create table if not exists user (
  id integer not null primary key autoincrement ,
  email varchar not null,
  password varchar not null,
  name varchar not null,
  lastname varchar,
  active boolean not null default true,
  unique(email)
);
