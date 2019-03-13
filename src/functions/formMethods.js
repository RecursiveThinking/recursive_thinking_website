const DICTIONARY_EXCLUDE_FROM_TITLE_CASE = {
  articles: [ 'a', 'an', 'the' ],
  coordConj: [ 'and', 'but', 'or', 'for', 'nor' ],
  prepositions: [ 'on', 'at', 'to', 'from', 'by' ]
}

class FormMethods {
  titleCaseDictionary(){
    
  }
  static removeSpaceFromDatabaseEntries(databaseObj){
    let duplicateDatabaseObj = { ...databaseObj };
    for(let key in duplicateDatabaseObj){
      if(duplicateDatabaseObj[key] === ' '){
        duplicateDatabaseObj[key] = '';
      }
    }
    return duplicateDatabaseObj;
  }
  static addSpaceToFormEntryForDatabase(formObj){
    let duplicateFormObj = { ...formObj };
    for(let key in duplicateFormObj){
      if(duplicateFormObj[key] === ''){
        duplicateFormObj[key] = ' ';
      }
    }
  }
}

export default FormMethods;