import { importTemplate, templates, fill } from '../../templater'
import {
    utils,
    data,
    allSkillsProfessionalObj,
    allSkillsSoftwareObj,
    allProgrammingLanguagesObj
} from '../../global';

import interviewQuestionsFromData from '../../../data_returns/RecursiveThinkingInterviewQuestions.json'


import interviewPrepHtml from './interviewPrep.html'
importTemplate("interviewPrep", interviewPrepHtml)

export function setup(renderFunction) {
    renderFunction(
        fill(templates.interviewPrep.page, getInterviewPrepModel())
    );
    
    modalInterview();
    loadDocumentElements();
};

export const getInterviewPrepModel = () => {
    
    
    // #TODO: API Call goes here
    const currentUser = data.getCurrentUser();
    
    const allInterviewQuestions = interviewQuestionsFromData
    console.log('allInterviewQuestions', allInterviewQuestions);
    // console.log("currentUser at InterviewPrep", currentUser);
    return {
        interviewPrep: allInterviewQuestions.map(question => {
            let questionCategoryArray = utils.returnArrayOfApplicableItems('allCategories', question.categories);
            // console.log(questionCategoryArray);
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

export const modalInterview = () => {

    const btnSubmitInterviewQuestion = document.getElementById('btnSubmitInterviewQuestion');
    // const btnAnswerQuestion = document.getElementById('btnAnswerQuestion');

    const modalContSubmitInterviewQuestion = document.getElementById('modalSubmitInterviewQuestion');
    // const modalConstAnswerInterviewQuestion = document.getElementById('modalAnswerInterviewQuestion');

    btnSubmitInterviewQuestion.onclick = function() {
        modalContSubmitInterviewQuestion.style.display = "block";
    }

    // btnAnswerQuestion.onclick = function() {
    //     modalConstAnswerInterviewQuestion.style.display = "block";
    // }

    window.onclick = function(event) {
        if (event.target == modalContSubmitInterviewQuestion) {
            modalContSubmitInterviewQuestion.style.display = "none";
        }
        // else if (event.target == modalConstAnswerInterviewQuestion) {
        //     modalConstAnswerInterviewQuestion.style.display = "none";
        // }
        else{
            // console.log(event.target.parentElement.style.display);
            console.log("Clicking on Something Not a Modal - Interview");
        }
    }
}

function loadDocumentElements(){
    let allSkillInput = document.getElementById('allSkills')
    allSkillInput.addEventListener('input', utils.autoComplete)
}
