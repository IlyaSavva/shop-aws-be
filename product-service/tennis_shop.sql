CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
 	title text NOT NULL,
 	description text,
 	price integer
);

CREATE TABLE stocks (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	product_id uuid,
	count integer,
	FOREIGN KEY ("product_id") REFERENCES "products" ("id")
);

INSERT INTO products (title, description, price) VALUES
('Head Gravity PRO 2021', 'With its massive sweetspot and its bold new flip design, with a yellow-green fade on one side and a blue-violet fade on the other, the GRAVITY PRO is a modern and dynamic racquet for the aggressive next generation player.', 310),
('Head Speed MP 2021', 'The SPEED MP is slightly lighter than the PRO and provides the silos chracteristics in an easier-to-handle version for a wide range of players.', 320),
('Head Speed MP 2019', 'It comes with the Graphene 360+ technology, a combination of Graphene 360s energy transfer and innovative spiralfibers for an enhanced flex and clean impact feel as well as a 16/19 string pattern for enhanced spin during fast rallies.', 330),
('Head Radical MP', 'Slightly lighter than its bigger brother the RADICAL PRO, the RADICAL MP is designed for the versatile all-court tournament player, with a perfect blend of power, control and spin.', 340),
('Head Radical PRO', 'With a vibrant and daring new design that illustrates its modernity, the RADICAL PRO supplies the perfect blend of power, control and spin for the versatile, all-court and advanced tournament player.', 350),
('Head Extreme MP', 'Generate extreme spin and power with the EXTREME MP, which has been refreshed with a new design, and upgraded with innovative Graphene 360+ technology for enhanced flex and clean impact feel.', 360),
('Head Instinct MP', 'The INSTINCT MP provides effortless high performance and comfort for the advanced tournament player, now with a new design, and the innovative Graphene 360+ technology for enhanced flex and clean impact feel.', 370),
('Head Prestige MP', 'The PRESTIGE MP provides the perfect precision to the experienced player who wants extra control in their long and fast swings.', 380),
('Head Prestige PRO', 'The PRESTIGE PRO is made for the technical tour player who needs a precise racquet that is right to the point.', 390),
('Head Attitude PRO', 'This racquet will make sure that your first steps on the tennis court wont be your last. Pre-strung, the ATTITUDE PRO model provides easier handling and maneuverability.', 410),
('Head Challenge PRO', 'The CHALLENGE PRO, the slightly heavier model compared to the CHALLENGE MP, provides the perfect mix of power and control to the competitive club player.', 420);

INSERT INTO stocks (product_id, count) VALUES
('15e5cd6f-c27a-4a94-958a-c8b9d514a327', 11),
('2a88d675-3442-4f57-889a-14510807ca59', 12),
('04216596-032e-4fa0-b429-aee8f763e489', 13),
('01f27661-bcf7-4dca-9679-197594438a4c', 14),
('2c46779a-a858-4e8f-b82e-f239e308699c', 15),
('217b1e5f-b1c6-4489-9561-fd728037a4a4', 16),
('7bfa047c-8275-46bf-9990-4c9cd03134a0', 17),
('776a3398-104e-4762-aae5-e56c96335100', 18),
('cc8c6d66-5383-4d9d-86af-37a6e12b9e0a', 19),
('08bfdafa-3c32-4c88-8d75-87dad31f4070', 20),
('faf3d62b-a14b-48a3-a144-e3ac498f9e61', 21);

