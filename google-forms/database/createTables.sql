CREATE TABLE google_form.forms(
	formID uuid DEFAULT gen_random_uuid(),
	ownerID uuid,
	PRIMARY KEY (formID)
);

CREATE TABLE google_form.responses(
	responseID uuid DEFAULT gen_random_uuid(),
	fk_formID uuid,
	fk_questionID uuid,
	email varchar(255),
	response varchar(1000),
	PRIMARY KEY (responseID),
	CONSTRAINT fk_formID
	FOREIGN KEY(fk_formID)
	REFERENCES google_form.forms(formID)
);

CREATE TABLE google_form.questions(
	questionID uuid DEFAULT gen_random_uuid(),
	fk_formID uuid,
	questionType int,
	questionText varchar(1000),
	questionPosition int,	
	PRIMARY KEY (questionID),
	CONSTRAINT fk_formID
	FOREIGN KEY(fk_formID)
	REFERENCES google_form.forms(formID)
);

ALTER TABLE google_form.responses
	ADD CONSTRAINT fk_questionID
	FOREIGN KEY(fk_questionID)
	REFERENCES google_form.questions(questionID);