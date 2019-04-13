export const clrObj = {
  lrbl1: 'rgba(230, 185, 175, 1)',
  lrbl2: 'rgba(215, 125, 105, 1)',
  lrbl3: 'rgba(200, 65, 35, 1)',
  lrb: 'rgba(152, 0, 0, 1)',
  lrbd1: 'rgba(165, 30, 0, 1)',
  lrbd2: 'rgba(130, 30, 10, 1)',
  lrbd3: 'rgba(90, 15, 0, 1)',
  
  rl1: 'rgba(245, 205, 205, 1)',
  rl2: 'rgba(235, 155, 155, 1)',
  rl3: 'rgba(225, 105, 105, 1)',
  r: 'rgba(255, 0, 0, 1)',
  rd1: 'rgba(205, 0, 0, 1)',
  rd2: 'rgba(155, 0, 0, 1)',
  rd3: 'rgba(105, 0, 0, 1)',
  
  ol1: 'rgba(250, 230, 205, 1)',
  ol2: 'rgba(245, 205, 155, 1)',
  ol3: 'rgba(240, 180, 105, 1)',
  o: 'rgba(255, 155, 0, 1)',
  od1: 'rgba(230, 145, 55, 1)',
  od2: 'rgba(175, 105, 30, 1)',
  od3: 'rgba(120, 65, 5, 1)',
  
  yl1: 'rgba(255, 240, 205, 1)',
  yl2: 'rgba(255, 230, 155, 1)',
  yl3: 'rgba(255, 220, 105, 1)',
  y: 'rgba(255, 255, 0, 1)',
  yd1: 'rgba(240, 195, 50, 1)',
  yd2: 'rgba(185, 145, 25, 1)',
  yd3: 'rgba(130, 95, 0, 1)',
  
  gl1: 'rgba(215, 235, 210, 1)',
  gl2: 'rgba(180, 215, 170, 1)',
  gl3: 'rgba(145, 195, 130, 1)',
  g: 'rgba(0, 255, 0, 1)',
  gd1: 'rgba(105, 160, 80, 1)',
  gd2: 'rgba(75, 120, 29, 1)',
  gd3: 'rgba(45, 80, 20, 1)',
  
  cl1: 'rgba(210, 225, 225, 1)',
  cl2: 'rgba(160, 195, 200, 1)',
  cl3: 'rgba(110, 165, 175, 1)',
  c: 'rgba(0, 255, 255, 1)',
  cd1: 'rgba(70, 130, 140, 1)',
  cd2: 'rgba(40, 90, 100, 1)',
  cd3: 'rgba(10, 50, 60, 1)',
  
  cbl1: 'rgba(200, 220, 250, 1)',
  cbl2: 'rgba(155, 185, 240, 1)',
  cbl3: 'rgba(110, 150, 230, 1)',
  cb: 'rgba(75, 135, 230, 1)',
  cbd1: 'rgba(60, 120, 215, 1)',
  cbd2: 'rgba(45, 95, 175, 1)',
  cbd3: 'rgba(30, 70, 135, 1)',
  
  bl1: 'rgba(205, 225, 240, 1)',
  bl2: 'rgba(160, 195, 230, 1)',
  bl3: 'rgba(115, 165, 220, 1)',
  b: 'rgba(0, 0, 255, 1)',
  bd1: 'rgba(60, 135, 200, 1)',
  bd2: 'rgba(35, 95, 150, 1)',
  bd3: 'rgba(10, 55, 100, 1)',
  
  pl1: 'rgba(215, 210, 235, 1)',
  pl2: 'rgba(180, 165, 215, 1)',
  pl3: 'rgba(145, 120, 195, 1)',
  p: 'rgba(155, 0, 255, 1)',
  pd1: 'rgba(105, 80, 165, 1)',
  pd2: 'rgba(70, 50, 120, 1)',
  pd3: 'rgba(35, 20, 75, 1)',

  ml1: 'rgba(235, 210, 220, 1)',
  ml2: 'rgba(215, 165, 190, 1)',
  ml3: 'rgba(195, 120, 160, 1)',
  m: 'rgba(255, 0, 255, 1)',
  md1: 'rgba(165, 80, 120, 1)',
  md2: 'rgba(120, 50, 85, 1)',
  md3: 'rgba(75, 20, 50, 1)'
}

export const styleType = {
  fill: 'fill',
  text: 'text'
}

export const colorLog = (style, color = 'red') => {
  // console.log('style: ', style, 'color: ', color)
  switch(style){
    case style = styleType['fill']:
      // console.log('fill: style: ', style, 'color: ', color)  
      return `background: ${color}; color: white; padding: 4px 30px 4px 2px;`
    case style = styleType['text']:
      // console.log('txt: style: ', style, 'color: ', color)  
      return `color: ${color}; padding: 4px 30px 4px 2px;`
    default:
      return `color: ${color}; padding: 4px 30px 4px 2px;`
    }
}