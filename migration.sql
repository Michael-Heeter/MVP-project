CREATE TABLE player (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE campaign (
    id SERIAL PRIMARY KEY,
    name TEXT,
    dm TEXT
);

CREATE TABLE character_table (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    race TEXT NOT NULL,
    subrace TEXT,
    class TEXT NOT NULL,
    subclass TEXT,
    size TEXT,
    alignment TEXT,
    strength INT NOT NULL,
    dexterity INT NOT NULL,
    constitution INT NOT NULL,
    intelligence INT NOT NULL,
    wisdom INT NOT NULL,
    charisma INT NOT NULL,
    acrobatics INT,
    animal_handling INT,
    arcana INT,
    athletics INT,
    deception INT,
    history INT,
    insight INT,
    intimidation INT,
    investigation INT,
    medicine INT,
    nature INT,
    perception INT,
    performance INT,
    persuasion INT,
    religion INT,
    sleight_of_hand INT,
    stealth INT,
    survival INT,
    light_armor BOOLEAN,
    medium_armor BOOLEAN,
    heavy_armor BOOLEAN,
    shield BOOLEAN,
    player_id INT,
    campaign_id INT,
    CONSTRAINT fk_player
        FOREIGN KEY (player_id) 
        REFERENCES player(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_campaign
        FOREIGN KEY (campaign_id) 
        REFERENCES campaign(id)
        ON DELETE SET NULL
);