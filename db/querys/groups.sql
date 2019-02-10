create table if not exists groups (
  id integer not null primary key autoincrement,
  name varchar not null,
  label varchar not null,
  active boolean not null default true,
  unique (name)
);
