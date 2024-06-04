const { error } = require('console');
const pool = require('../database/dbinnit');
const excel = require('exceljs');

class Responses{

    static async getFormResponses(formId,userId){
        const client = await pool.connect();
        try {
            const form = await client.query(
                `SELECT formid, ownerid, form_name, form_description
                 FROM google_form.forms f
                 WHERE f.ownerID = $1
                 AND f.formId = $2`,
                 [userId,formId]
            );

            if(form.rows.length<1){
                throw new Error(`Cannot access this form.`);
            }

            const result = await client.query(
                `SELECT q.questionID, q.questionText AS question, r.response 
                 FROM google_form.responses r
                 JOIN google_form.questions q ON r.fk_questionID = q.questionID
                 WHERE r.fk_formID = $1
                 ORDER BY q.questionPosition, q.questionID`,
                [formId]
            );

            const formResponses = {};
            result.rows.forEach(row => {
                if (!formResponses[row.question]) {
                    formResponses[row.question] = {
                        question: row.question,
                        responses: []
                    };
                }
                formResponses[row.question].responses.push(row.response);
            });

            const formattedResponses = Object.values(formResponses).map(question => ({
                question: question.question,
                responses: question.responses
            }));

            return {
                formId,
                formResponses: formattedResponses
            };
        } catch (error) {
            throw new Error(`Error fetching form responses: ${error.message}`);
        } finally {
            client.release();
        }
    }

    static async captureResponses(formId, userId, override, responses){
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const existingResponses = await client.query(
                `SELECT COUNT(*) FROM google_form.responses WHERE fk_formID = $1 AND userID = $2`,
                [formId, userId]
            );

            if (existingResponses.rows[0].count > 0 && !override) {
                await client.query('ROLLBACK');
                return {
                    status: 'warning',
                    message: 'Responses already exist for this form. Please confirm if you want to override them.',
                    responses: responses
                };
            }

            if (override) {
                await client.query(
                    `DELETE FROM google_form.responses WHERE fk_formID = $1 AND userID = $2`,
                    [formId, userId]
                );
            }

            for (const answer of responses) {
                const { questionId, response } = answer;
                await client.query(
                    `INSERT INTO google_form.responses(fk_formID, fk_questionID, userID, response)
                     VALUES ($1, $2, $3, $4)`,
                    [formId, questionId, userId, response]
                );
            }

            await client.query('COMMIT');
            return {
                status: 'ok',
                message: 'Responses captured successfully'
            };
        } catch (error) {
            await client.query('ROLLBACK');
            throw new Error(`Transaction failed: ${error.message}`);
        } finally {
            client.release();
        }
    }

    
    static async generateExcel(formResponses) {
        //TODO: Only admins should download the form
        try {
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Results');

            const headersRow = ['Question', ...formResponses.map(response => response.question)];
            const headerRow = worksheet.addRow(headersRow);
            headerRow.font = { bold: true }; 
            headerRow.font = { bold: true, color: { argb: 'FFFFFF' } };
            headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00BFFF' } };

            const maxResponses = Math.max(...formResponses.map(response => response.responses.length));
            for (let i = 0; i < maxResponses; i++) {
                const row = formResponses.map(response => response.responses[i] || '');
                const dataRow = worksheet.addRow(['', ...row]);
                dataRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: i % 2 === 0 ? 'E0FFFF' : 'BFEFFF' } }; 
            }

            worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
                row.alignment = { vertical: 'middle', horizontal: 'center' };
                row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                });
            });

            const buffer = await workbook.xlsx.writeBuffer();

            return buffer;
        } catch (error) {
            throw new Error('Error generating Excel file: ' + error.message);
        }
}

}

module.exports = Responses;