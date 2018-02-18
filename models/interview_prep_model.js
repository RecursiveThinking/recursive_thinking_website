import { utils } from '../scripts/global';
import { templates, fill } from '../scripts/templater';

export const getInterviewPrepModel = () => {
    
    // #TODO: API Call goes here
    const allInterviewQuestions = JSON.parse(localStorage.getItem('allInterviewQuestions'));
    
    return {
        interviewPrep: allInterviewQuestions.map(question => {
            return fill(templates.interviewPrep.interviewQuestion, {
                // day: formattedDate.dateOfMonth,
                // month: formattedDate.monthAsString,
                // year: formattedDate.year,
                // title: lesson.title
            })
        })
    }
};