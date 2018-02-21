import { utils, data } from '../scripts/global';
import { templates, fill } from '../scripts/templater';

export const getInterviewPrepModel = () => {
    
    // #TODO: API Call goes here
    // const allInterviewQuestions = JSON.parse(localStorage.getItem('allInterviewQuestions'));
    const allInterviewQuestions = data.getAllInterviewQuestions();
    console.log(allInterviewQuestions);
    const allAnswersToQuestions = data.getAllAnswersToQuestions();
    console.log(allAnswersToQuestions);
    const currentUser = data.getCurrentUser();
    console.log("currentUser at InterviewPrep", currentUser);
    return {
        interviewPrep: allInterviewQuestions.map(question => {
            let questionCategoryArray = utils.returnArrayOfApplicableItems('allCategories', question.categories);
            console.log(questionCategoryArray);
            const formattedDate = utils.getFormattedDate(new Date(question.submitted));
            
            return fill(templates.interviewPrep.tempIdInterviewQuestion, {
                title: `${question.title}:`,
                date: formattedDate.upComingDateStringAmericanNaming,
                description: question.description,
                questionCategories: questionCategoryArray.map((category) => {
                    return fill(templates.interviewPrep.tempIdInterviewQuestionCategory, {
                        category: category
                    })
                }),
                questionAnswersCount: utils.getCountString('question', question),
                questionAnswers: question.answersToQuestion.map(answerId => {
                    let getAnswer = allAnswersToQuestions.filter((answerObj) => {
                        return answerObj["_id"] === answerId;
                    });
                    getAnswer = getAnswer[0];
                    return fill(templates.interviewPrep.tempIdInterviewQuestionAnswer, {
                        
                        submitted: utils.getFormattedDate(new Date(getAnswer.submitted)).upComingDateStringAmericanWithSlash,
                        description: getAnswer.description,
                    })
                }
                )
            })
        })
    }
};