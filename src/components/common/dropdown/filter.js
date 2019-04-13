import React, {Component} from 'react'

import FontAwesomeIcon from '../../common/fontAwesomeIcon/fontAwesomeIcon'

export class DropDownFilter extends Component {
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      headerTitle: '',
      timeOut: null
    }
  }
  
  componentDidUpdate(){
    const { listOpen } = this.state;
    setTimeout(() => {
      if(listOpen){
        window.addEventListener('click', this.close)
      } else {
        window.removeEventListener('click', this.close)
      }
    }, 0);
  }
  
  componentWillUnmount(){
    window.removeEventListener('click', this.close)
  }
  
  close = (timeOut) => {
    this.setState({ listOpen: false });
  }
  
  static getDerivedStateFromProps(nextProps){
    let filterCount = 0
    nextProps.list.forEach((a) => {
      a.items.forEach(b => {
        if(b.selected){
          filterCount += 1;
        }
      })
    });
    // console.log('nextProps: ', nextProps)
    // console.log('filterCount: ', filterCount)
    if(filterCount === 0){
      // just render the title
      return { headerTitle: nextProps.title }
    }
    // else if(filterCount > 0){
    //   return filterCount > 1 ? { headerTitle: `${filterCount} Filters Applied` } : { headerTitle: `${filterCount} Filter Applied` }
    // }
    else if(filterCount === 1){
      return {headerTitle: `${filterCount} Filter Applied`}
    }
    else if(filterCount > 1){
      return {headerTitle: `${filterCount} Filters Applied`}
    }
  }
  
  toggleList(){
    this.setState((prevState) => ({ listOpen: !prevState.listOpen }))
  }
  
  render(){
    const {
      list,
      toggleSelected
    } = this.props
    const {
      listOpen,
      headerTitle
    } = this.state
    
    return (
      <div className="fc-filterBar">
        <div className="dropdownWrapper">
          {/* fs20 fw500 ls14 */}
          <div className="header" onClick={() => this.toggleList()}>
            <div className="headerTitle fs20 fw500 ls14 fcGrey424041">
              {headerTitle}
            </div>
            <span className="fc-sortBarSpan">
              <h6 className="fs20 fw500 ls14">FILTER</h6>
              {
                // style={{ marginTop: `0rem` }}
                listOpen ? <FontAwesomeIcon iconNameForClass="fa fa-angle-up" /> : <FontAwesomeIcon iconNameForClass="fa fa-angle-down" />
              }
              {/* these kinda suck (fa-sort-asc fa-sort-desc) because they are at the top/bottom of a larger image  */}
            </span>
          </div>
          {
            listOpen &&   
            // <ul className="list">
            <ul 
              className="list"
              // onClick={e => e.stopPropagation()}
            >
              {
                list.map((ulTitle) => {
                  return (
                    <ul 
                      className="listTitle fs20 fw500 fcGrey424041 ls14"
                      // onClick={e => e.stopPropagation()}
                      key={ulTitle.id}
                    >{ulTitle.title}
                      {
                        ulTitle.items.map((listItems, index) => {
                        const {
                          Id,
                          name,
                          count,
                          selected,
                          childKey
                        } = listItems
                        // console.log('info', Id, name, selected, childKey)
                        // console.log('ulTitle props: ', ulTitle)
                        return (  
                          <li 
                            // className="listItem fs20 fw500 ls14" 
                            className={selected ? "listItem fs16 fw500 ls10 fcGrey424041 selected" : "listItem fs16 fw500 ls10 fcGrey424041"}
                            key={Id}
                            onClick={() => toggleSelected(ulTitle.id, ulTitle.parentKey, Id, index, childKey, name)}
                          >{name} ({count})
                            {selected && <FontAwesomeIcon iconNameForClass="fa fa-check" />}
                          </li>
                        )
                      })
                    }
                    </ul>
                    )
                    // { listItems.selected && <FontAwesomeIcon iconNameForClass="fa fa-check" /> }
                })
              }
            {/* </ul> */}
            </ul>
          }
          {/* {
            listOpen &&   
            <ul className="list">
              {
                list.map((listItem) => {
                  const {
                    id,
                    title,
                    selected,
                    key
                  } = listItem
                  console.log('info', id, title, selected, key)
                  return (
                    <li 
                      // className="listItem fs20 fw500 ls14" 
                      className={listItem.selected ? "listItem fs20 fw500 ls14 fcGrey424041 selected" : "listItem fs20 fw500 fcGrey424041 ls14"}
                      key={id}
                      onClick={() => toggleItem(id, key)}
                    >{title}
                    {selected && <FontAwesomeIcon iconNameForClass="fa fa-check" />}
                    </li>
                  )
                })
              }
            </ul>
          } */}
        </div>
      </div>
    )
  }
}