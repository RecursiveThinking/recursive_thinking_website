import { utils, data } from '../scripts/global';
import { templates, fill } from '../scripts/templater';

export const getEditProfileModel = () => {
    
    // #TODO: API Call goes here
    // const allInterviewQuestions = JSON.parse(localStorage.getItem('allInterviewQuestions'));
    console.log("In Edit Profile Model");
    const currentUser = data.getCurrentUser();
    console.log("currentUser at EditProfile", currentUser);
    
    
    return {
        // interviewPrep: allInterviewQuestions.map(question => {
            // return fill(templates.interviewPrep.interviewQuestion, {
                // day: formattedDate.dateOfMonth,
                // month: formattedDate.monthAsString,
                // year: formattedDate.year,
                // title: lesson.title
            // })
        // })
    }
};