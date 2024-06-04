ALTER TABLE google_form.forms
ADD form_name varchar(255);

ALTER TABLE google_form.forms
ADD form_description varchar(1000);

UPDATE google_form.forms 
SET form_name = 'test form 1', 
    form_description = 'test description 1'
WHERE formid = 'b0c2d4e1-5a63-4d41-98d2-7f1e2e4c2e39';

UPDATE google_form.forms 
SET form_name = 'test form 2', 
    form_description = 'test description 2'
WHERE formid = 'd7e2a5c4-1f23-4c51-88d1-1f2e3f5d3b59';

UPDATE google_form.forms 
SET form_name = 'test form 3', 
    form_description = 'test description 3'
WHERE formid = 'e0f1c4d2-1a53-4b61-88f1-7f1e4f4c2f36';

UPDATE google_form.forms 
SET form_name = 'test form 4', 
    form_description = 'test description 4'
WHERE formid = 'f5b6d8e2-3a63-4b41-89d1-2f3e5f2d2b59';