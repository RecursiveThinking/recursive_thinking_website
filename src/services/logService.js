import { colorLog as cl, styleType as st, clrObj as co }  from './colorLog'

export const globalLog = true;
export const actionLog = true;

export const act = 'act';
export const cont = 'cont';
export const comp = 'comp';
export const red = 'red';
// export const container = 'container'

export const catObj = {
  act: 'action',
  cont: 'container',
  comp: 'component',
  red: 'reducer'
}

export const subObj = {
  req: 'req',
  res: 'res',
  err: 'err',
  props: 'props'
}

export const tableObj = {
  user: 'user',
  currentUser: 'currentUser',
  lesson: 'lesson',
  intQuest: 'intQuest',
  intQuestAns: 'intQuestAns',
  skill: 'skill',
  homeScreenQuotes: 'homeScreenQuotes',
  ranks: 'ranks',
  adminPanel: 'adminPanel'
}

export const methodObj = {
  ga: 'GetAll',
  gas: 'sGetAll',
  cbid: 'CreateById',
  bid: 'ById',
  gbid: 'GetById',
  ebid: 'EditById',
  ebidll: 'EditByIdLastLogin',
  dbid: 'DeleteById'
}

export const boolLogObj = {
  globalLog: true,
  actLog: true,
  contLog: true,
  compLog: true,
  redLog: true,
  userLog: true,
  lessonLog: true,
  intLog: true,
  intAnsLog: true
}

export const prefixLib = {
  action: {
    req: '>>>> @ ',
    res: '<<<< @ ',
    err: '<<<< @ ',
  },
  reducer: {
    req: '???? @ ',
    res: '++++ @ ',
    err: '---- @ ',
  },
  container: {
    props: '|{}| @'
  },
  component: {
    props: '{{}} @'
  }
}

export const suffixLib = {
  req: 'Request',
  res: 'Success',
  err: 'Error',
  props: 'props'
}

export const returnColorLogString = (cat, sub) => {
  // cat === 'action'
  // better on cat or sub?
  if(cat === 'action'){
    if(sub === 'req'){
      return cl(st.fill, co.od2)
      // return cl(st.text, co.od2)
    }
    if(sub === 'res'){
      return cl(st.fill, co.gd2)
    }
    if(sub === 'err'){
      return cl(st.fill, co.rd2)
    }
  }
  if(cat === 'reducer'){
    if(sub === 'req'){
      // return cl(st.fill, co.ol3)
      return cl(st.text, co.ol3)
    }
    if(sub === 'res'){
      // return cl(st.fill, co.gl3)
      return cl(st.text, co.gl3)
    }
    if(sub === 'err'){
      return cl(st.fill, co.rl3)
    }
  }
  if(cat === 'container'){
    if(sub === 'props'){
      return cl(st.fill, co.pl3)
    }
  }
  if(cat === 'component'){
    if(sub === 'props'){
      return cl(st.fill, co.pl2)
    }
  }
}

export const returnMessageString = (cat, sub, table, method) => {
  // console.log('cat: ', cat, 'sub: ', sub, 'table: ', table, 'method: ', method)
  // console.log('table: ', table, 'tableObj[table]: ', tableObj[table])
  // console.log('prefix: ', prefixLib[cat][sub], 'table: ', tableObj[table], 'method: ', method, 'content: ', `${tableObj[table]}${method}`, 'suffix: ', suffixLib[sub])
  if(cat === catObj[act] || cat === catObj[red]){
    return `%c ${prefixLib[cat][sub]} | ${cat} | ${tableObj[table]}${method} | ${suffixLib[sub]}`;
  }
  if(cat === catObj[cont]){
    if(method){
      return `%c ${prefixLib[cat][sub]} | ${cat} | ${tableObj[table]}${method} | this.${suffixLib[sub]}`;
      
    } else {
      return `%c ${prefixLib[cat][sub]} | ${cat} | ${tableObj[table]} | this.${suffixLib[sub]}`;
    }
  }
  if(cat === catObj[comp]){
    return `%c ${prefixLib[cat][sub]} | ${cat} | ${tableObj[table]} | ${suffixLib[sub]}`;
  }
}

export const LogService = (cat, sub, table, method, obj) => {
  if(globalLog){
    // console.log('@ LS: ', returnMessageString(cat, sub, table, method))
    // console.log('test: ', returnColorLogString(cat, sub))
    // if(obj){
    //   console.log('cat: ', cat, 'sub: ', sub, 'table: ', table, 'method: ', method, obj)
    // } else {
    //   console.log('cat: ', cat, 'sub: ', sub, 'table: ', table, 'method: ', method)
    // }
    if(cat === catObj[act] || cat === catObj[red]){
      return obj ? console.log(returnMessageString(cat, sub, table, method), returnColorLogString(cat, sub), obj) : console.log(returnMessageString(cat, sub, table, method), returnColorLogString(cat, sub))
    }
    if(cat === catObj[cont] || cat === catObj[comp]){
      return obj ? console.log(returnMessageString(cat, sub, table, method), returnColorLogString(cat, sub), obj) : console.log(returnMessageString(cat, sub, table, method), returnColorLogString(cat, sub))
    }
  }
  else {
    // return console.log('Global logging might be turned off')    
  }
}