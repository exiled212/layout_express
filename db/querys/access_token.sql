create table if not exists access_token(
  email varchar unique not null,
  token varchar unique not null,
  date timestamp not null,
  timelive_seconds integer not null
);
