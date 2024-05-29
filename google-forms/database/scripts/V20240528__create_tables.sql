CREATE TABLE google_form.forms(
	formID uuid DEFAULT gen_random_uuid(),
	ownerID uuid,
	PRIMARY KEY (formID)
);

CREATE TABLE google_form.responses(
	responseID uuid DEFAULT gen_random_uuid(),
	fk_formID uuid,
	fk_questionID uuid,
	userID uuid,
	response varchar(1000),
	PRIMARY KEY (responseID),
	CONSTRAINT fk_formID
	FOREIGN KEY(fk_formID)
	REFERENCES google_form.forms(formID)
);

CREATE TABLE google_form.questions(
	questionID uuid DEFAULT gen_random_uuid(),
	fk_formID uuid,
	fk_Type SERIAL,
	questionText varchar(1000),
	questionPosition int,	
	PRIMARY KEY (questionID),
	CONSTRAINT fk_formID
	FOREIGN KEY(fk_formID)
	REFERENCES google_form.forms(formID)
);

CREATE TABLE google_form.question_lookup(
	lookup_key SERIAL,
	fk_questionID uuid,
	fk_formID uuid,
	PRIMARY KEY (lookup_key),
	
	CONSTRAINT fk_formID
	FOREIGN KEY(fk_formID)
	REFERENCES google_form.forms(formID),
	
	CONSTRAINT fk_questionID
	FOREIGN KEY(fk_questionID)
	REFERENCES google_form.questions(questionID)
);

CREATE TABLE google_form.question_type(
	typeID SERIAL,
	description varchar(255),
	PRIMARY KEY(typeID)
);
CREATE TABLE google_form.options(
	entryID SERIAL PRIMARY KEY,
	fk_questionID uuid,
	option varchar(255),

	CONSTRAINT fk_questionID
	FOREIGN KEY(fk_questionID)
	REFERENCES google_form.questions(questionID)
);
ALTER TABLE google_form.responses
	ADD CONSTRAINT fk_questionID
	FOREIGN KEY(fk_questionID)
	REFERENCES google_form.questions(questionID);


ALTER TABLE google_form.questions
	ADD CONSTRAINT fk_Type
	FOREIGN KEY(fk_Type)
	REFERENCES google_form.question_type(typeID)