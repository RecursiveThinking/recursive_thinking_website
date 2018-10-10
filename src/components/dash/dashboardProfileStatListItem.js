import React from 'react';

const dashboardProfileStatListItem = ({stat}) => {
  // init an empty string to hold style per list item
  let h1Style = ""
  if(stat[0]){
    // then display the number with green
    h1Style = "fs575 ls44 fw300 fcGreenRT"
  }
  else if(stat[0] === 0){
    // then display the 
    h1Style = "fs575 ls44 fw300 fcGreyb9"
  }
  else if(stat[0] === ''){
    // then the value of stat[0] should get redefined to 'N/A'
    stat[0] = 'N/A'
    // display as grey
    h1Style = "fs575 ls44 fw300 fcGreyb9"    
  }
  
  return (
    <div className="profileStatsData">
      <h1 className={h1Style}>{stat[0]}</h1>
      <h5 className="fs18 ls12 fw500 fcGreyb9">{stat[1]}</h5>
    </div>
  )
}

export default dashboardProfileStatListItem