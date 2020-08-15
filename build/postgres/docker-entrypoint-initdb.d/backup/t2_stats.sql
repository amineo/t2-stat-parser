-- -------------------------------------------------------------
-- TablePlus 3.1.0(290)
--
-- https://tableplus.com/
--
-- Database: t2_stats
-- Generation Time: 2020-01-25 17:48:36.5480
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."players";
CREATE SEQUENCE IF NOT EXISTS player_id_seq;

-- Table Definition
CREATE TABLE "public"."players" (
    "id" int4 NOT NULL DEFAULT nextval('player_id_seq'::regclass),
    "player_guid" numeric NOT NULL UNIQUE,
    "player_name" text NOT NULL UNIQUE,
    "total_games_ctfgame" numeric NOT NULL DEFAULT 0,
    "total_games_dmgame" numeric NOT NULL DEFAULT 0,
    "total_games_lakrabbitgame" numeric NOT NULL DEFAULT 0,
    "total_games_sctfgame" numeric NOT NULL DEFAULT 0,
    "stat_overwrite_ctfgame" numeric NOT NULL DEFAULT 0,
    "stat_overwrite_dmgame" numeric NOT NULL DEFAULT 0,
    "stat_overwrite_lakrabbitgame" numeric NOT NULL DEFAULT 0,
    "stat_overwrite_sctfgame" numeric NOT NULL DEFAULT 0,
    "uuid" text NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT players_pk PRIMARY KEY (player_guid)
);




DROP TABLE IF EXISTS "public"."games";

-- Table Definition
CREATE TABLE "public"."games" (
    "game_id" numeric NOT NULL UNIQUE,
    "map" text NOT NULL,
    "datestamp" timestamp NOT NULL,
    "gametype" text NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT game_pk PRIMARY KEY (game_id)
);








DROP TABLE IF EXISTS "public"."game_detail";
CREATE SEQUENCE IF NOT EXISTS games_id_seq;

-- Table Definition
CREATE TABLE "public"."game_detail" (
    "id" int4 NOT NULL DEFAULT nextval('games_id_seq'::regclass),
    "player_guid" numeric NOT NULL,
    "player_name" text NOT NULL,
    "stat_overwrite" numeric NOT NULL,
    "map" text NOT NULL,
    "game_id" numeric NOT NULL,
    "stats" jsonb NOT NULL,
    "datestamp" timestamp NOT NULL,
    "uuid" text NOT NULL UNIQUE,
    "gametype" text NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT games_pk PRIMARY KEY (id),
    FOREIGN KEY (game_id) REFERENCES games (game_id),
    FOREIGN KEY (player_guid) REFERENCES players (player_guid)
);







CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "public"."players"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();