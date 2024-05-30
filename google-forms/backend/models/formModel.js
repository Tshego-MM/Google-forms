const pool = require('../database/dbinnit');

class Form{
    static async createForm(ownerId,questions){


        const client = await pool.connect();
        try {
            await pool.query('BEGIN');
            if(questions?.length>10){
                throw new Error(`More than 10 questions given`);
            }
            const formResult = await client.query(
                'INSERT INTO google_form.forms(ownerID) VALUES ($1) RETURNING formID',
                [ownerId]
            );
            const formId = formResult.rows[0].formid;

            for (const [index, question] of questions.entries()) {
                const questionResult = await client.query(
                    `INSERT INTO google_form.questions(fk_formID, fk_Type, questionText, questionPosition)
                     VALUES ($1, $2, $3, $4) RETURNING questionID`,
                    [formId, question.questionType, question.question, index + 1]
                );
                const questionId = questionResult.rows[0].questionid;

                if (question?.options && question?.options.length > 0) {
                    if(question?.options.length>5){
                        throw new Error(`More than 5 options given`);
                    }
                    for (const option of question.options) {
                        await client.query(
                            `INSERT INTO google_form.options(fk_questionID, option)
                             VALUES ($1, $2)`,
                            [questionId, option]
                        );
                    }
                }
            }

            await client.query('COMMIT');
            return {
                status: 'success',
                formLink: `http://localhost:3000/api/forms/${formId}`,
                message: 'Form created successfully'
            };
        } catch (error) {
            await client.query('ROLLBACK');
            throw new Error(`${error.message}`);
        } finally {
            client.release();
        }
    }

    static async getFormById(formId){
        const query = `
                        SELECT 
                            q.fk_Type AS questionType, 
                            q.questionText AS question, 
                            q.questionPosition AS questionPosition, 
                            q.questionID AS questionId, 
                            o.option AS option
                        FROM 
                            google_form.questions q
                        LEFT JOIN 
                            google_form.options o
                        ON 
                            q.questionID = o.fk_questionID
                        WHERE 
                            q.fk_formID = $1
                        ORDER BY 
                            q.questionPosition, q.questionID, o.fk_questionID;
                    `;
        try {
            const res = await pool.query(query, [formId]);
            
            const questionsMap = new Map();

            res.rows.forEach(row => {
                if (!questionsMap.has(row.questionid)) {
                    questionsMap.set(row.questionid, {
                        questionId: row.questionid,
                        questionType: row.questiontype,
                        questionPosition: row.questionposition,
                        question: row.question,
                        options: []
                    });
                }
                if (row.option) {
                    questionsMap.get(row.questionid).options.push(row.option);
                }
            });

            const questions = Array.from(questionsMap.values());
            return questions;
        } catch (err) {
            console.error('Error executing query', err.stack);
            throw err;
        }
    }

}

module.exports = Form;