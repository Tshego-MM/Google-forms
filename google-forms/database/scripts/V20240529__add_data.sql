INSERT INTO google_form.forms (formID, ownerID) VALUES
(CAST('e0f1c4d2-1a53-4b61-88f1-7f1e4f4c2f36' AS uuid) , CAST('c1e3a7a2-6b44-489e-9e8f-1f4b3f3a5a78' AS uuid)),
(CAST('f5b6d8e2-3a63-4b41-89d1-2f3e5f2d2b59' AS uuid), CAST('d3f4b5c2-2c66-4a77-8e7d-3f5b2f4c1b37' AS uuid)),
(CAST('b0c2d4e1-5a63-4d41-98d2-7f1e2e4c2e39' AS uuid), CAST('e1a4b6c3-6b45-4b8e-8e1f-2d4b3f2c4b78' AS uuid)),
(CAST('d7e2a5c4-1f23-4c51-88d1-1f2e3f5d3b59' AS uuid), CAST('f5b4c3e1-2c67-4a88-8d2e-3f4a2e5b2a37' AS uuid));

INSERT INTO google_form.question_type (typeID, description) VALUES
(1, 'Multiple Choice'),
(2, 'Short Answer'),
(3, 'Long Answer'),
(4, 'True Or False');


INSERT INTO google_form.questions (questionID, fk_formID, fk_Type, questionText, questionPosition) VALUES
(CAST('a0b1c2d3-4e5f-6789-0a1b-2c3d4e5f6789' AS uuid), CAST('e0f1c4d2-1a53-4b61-88f1-7f1e4f4c2f36' AS uuid), 1, 'What is your favorite color?', 1),
(CAST('1ac9b784-1ef4-4dc9-8f4a-b0844c74d24f' AS uuid), CAST('f5b6d8e2-3a63-4b41-89d1-2f3e5f2d2b59' AS uuid), 2, 'How often do you exercise?', 2),
(CAST('b1c2d3e4-5f67-7890-1a2b-3c4d5e6f7890' AS uuid), CAST('b0c2d4e1-5a63-4d41-98d2-7f1e2e4c2e39' AS uuid), 3, 'Please describe your work experience.', 1),
(CAST('82cfc278-1a36-4251-8c78-9c81008564c5' AS uuid), CAST('d7e2a5c4-1f23-4c51-88d1-1f2e3f5d3b59' AS uuid), 4, 'Is the Earth round?', 2);

INSERT INTO google_form.options (entryID, fk_questionID, option) VALUES
(1, CAST('a0b1c2d3-4e5f-6789-0a1b-2c3d4e5f6789' AS uuid), 'Red'),
(2, CAST('a0b1c2d3-4e5f-6789-0a1b-2c3d4e5f6789' AS uuid), 'Blue'),
(3, CAST('a0b1c2d3-4e5f-6789-0a1b-2c3d4e5f6789' AS uuid), 'Green'),
(4, CAST('b1c2d3e4-5f67-7890-1a2b-3c4d5e6f7890' AS uuid), 'N/A'),
(5, CAST('82cfc278-1a36-4251-8c78-9c81008564c5' AS uuid), 'True'),
(6, CAST('82cfc278-1a36-4251-8c78-9c81008564c5' AS uuid), 'False');

INSERT INTO google_form.question_lookup (lookup_key, fk_questionID, fk_formID) VALUES
(1, CAST('a0b1c2d3-4e5f-6789-0a1b-2c3d4e5f6789' AS uuid), CAST('e0f1c4d2-1a53-4b61-88f1-7f1e4f4c2f36' AS uuid)),
(2, CAST('1ac9b784-1ef4-4dc9-8f4a-b0844c74d24f' AS uuid), CAST('f5b6d8e2-3a63-4b41-89d1-2f3e5f2d2b59' AS uuid)),
(3, CAST('b1c2d3e4-5f67-7890-1a2b-3c4d5e6f7890' AS uuid), CAST('b0c2d4e1-5a63-4d41-98d2-7f1e2e4c2e39' AS uuid)),
(4, CAST('82cfc278-1a36-4251-8c78-9c81008564c5' AS uuid), CAST('d7e2a5c4-1f23-4c51-88d1-1f2e3f5d3b59' AS uuid));


INSERT INTO google_form.responses (responseID, fk_formID, fk_questionID, userID, response) VALUES
(CAST('22b60e1d-2e57-4939-b3e1-cb7a02f29750' AS uuid), CAST('e0f1c4d2-1a53-4b61-88f1-7f1e4f4c2f36' AS uuid), CAST('a0b1c2d3-4e5f-6789-0a1b-2c3d4e5f6789' AS uuid), CAST('e0f1c4d2-1a53-4b61-88f1-7f1e4f4c2f36' AS uuid), 'Blue'),
(CAST('08f59f22-9f71-4f8b-a35c-c3b656aae82b' AS uuid), CAST('f5b6d8e2-3a63-4b41-89d1-2f3e5f2d2b59' AS uuid), CAST('1ac9b784-1ef4-4dc9-8f4a-b0844c74d24f' AS uuid), CAST('f5b6d8e2-3a63-4b41-89d1-2f3e5f2d2b59' AS uuid), 'Daily'),
(CAST('33c70f2e-3f68-4a39-c4e2-dc8a02f39861' AS uuid), CAST('b0c2d4e1-5a63-4d41-98d2-7f1e2e4c2e39' AS uuid), CAST('b1c2d3e4-5f67-7890-1a2b-3c4d5e6f7890' AS uuid), CAST('e1a4b6c3-6b45-4b8e-8e1f-2d4b3f2c4b78' AS uuid), 'Extensive experience in project management'),
(CAST('cf994256-9da8-4aea-8bf8-bffedfdf9820' AS uuid), CAST('d7e2a5c4-1f23-4c51-88d1-1f2e3f5d3b59' AS uuid), CAST('82cfc278-1a36-4251-8c78-9c81008564c5' AS uuid), CAST('f5b4c3e1-2c67-4a88-8d2e-3f4a2e5b2a37' AS uuid), 'True');

