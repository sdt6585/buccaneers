INSERT INTO cyberpunk2.campaign (name) VALUES('Test Game 1');

INSERT INTO cyberpunk2.user (name) VALUES('Stephen');
INSERT INTO cyberpunk2.user (name) VALUES('Scott');

INSERT INTO cyberpunk2.user_campaign (campaign_id, user_id) VALUES(1,1);
INSERT INTO cyberpunk2.user_campaign (campaign_id, user_id) VALUES(1,2);

INSERT INTO cyberpunk2.character (name, hp, exp, gold, is_alive, user_campaign_id, campaign_id) VALUES('Yippy', 10, 0, 40, 1, 1, 1);
INSERT INTO cyberpunk2.character (name, hp, exp, gold, is_alive, user_campaign_id, campaign_id) VALUES('Kay', 12, 0, 12, 1, 1, 1);
INSERT INTO cyberpunk2.character (name, hp, exp, gold, is_alive, user_campaign_id, campaign_id) VALUES('Yay', 9, 0, 55, 1, 2, 1);
INSERT INTO cyberpunk2.character (name, hp, exp, gold, is_alive, user_campaign_id, campaign_id) VALUES('Mother', 9, 0, 55, 1, 2, 1);
INSERT INTO cyberpunk2.character (name, hp, exp, gold, is_alive, user_campaign_id, campaign_id) VALUES('Bruce Willis', 100, 0, 1, 1, 2, 1);

-- Add stats, skills, and inventory here