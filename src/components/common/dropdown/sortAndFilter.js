import React, {Component} from 'react'

import FontAwesomeIcon from '../../common/fontAwesomeIcon/fontAwesomeIcon'

export class DropDownSort extends Component {
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
    }
  }
  // console.log('props', props)
  handleClickOutside(){
    this.setState({listOpen: false})
  }
  
  selectItem = (title, id, stateKey) => {
    this.setState({
      headerTitle: title,
      listOpen: false
    }, this.props.resetThenSet(id, stateKey))
  }
  
  toggleList(){
    this.setState((prevState) => ({ listOpen: !prevState.listOpen }))
  }
  render(){
    const {
      list
    } = this.props
    const {
      listOpen,
      headerTitle
    } = this.state
    
    return (
      <div className="fc-sortBar">
        <div className="dropdownWrapper">
          {/* fs20 fw500 ls14 */}
          <div className="header" onClick={() => this.toggleList()}>
            <div className="headerTitle fs20 fw500 ls14 fcGrey424041">
              {headerTitle}
            </div>
            <span className="fc-sortBarSpan">
              <h6 className="fs20 fw500 ls14 fcGrey424041">SORT</h6>
              {
                // style={{ marginTop: `0rem` }}
                listOpen ? <FontAwesomeIcon iconNameForClass="fa fa-angle-up" /> : <FontAwesomeIcon iconNameForClass="fa fa-angle-down" />
              }
              {/* these kinda suck because they are at the top/bottom of a larger image fa-sort-asc fa-sort-desc */}
            </span>
          </div>
          {
            listOpen &&   
            <ul className="list">
              {
                list.map((listItem) => {
                  return (
                    <li 
                      key={listItem.id}
                      // className="listItem fs20 fw500 ls14"
                      className={listItem.selected ? "listItem fs20 fw500 ls14 fcGrey424041 selected" : "listItem fs20 fw500 fcGrey424041 ls14"}
                      onClick={() => this.selectItem(listItem.title, listItem.id, listItem.key)}
                    >{listItem.title}
                    </li>
                    // {listItem.selected && <FontAwesomeIcon iconNameForClass="fa fa-check" />}
                    )
                })
              }
            </ul>
          }
        </div>
      </div>
    )
  }
}

export class DropDownFilter extends Component {
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
    }
  }
  
  static getDerivedStateFromProps(nextProps){
    const count = nextProps.list.filter((a) => a.selected).length;
    if(count === 0){
      // just render the title
      return { headerTitle: nextProps.title }
    }
    else if(count > 0){
      return count > 1 ? { headerTitle: `${count} Filters Applied` } : { headerTitle: `${count} Filter Applied` }
    }
  }
  
  // console.log('props', props)
  handleClickOutside(){
    this.setState({listOpen: false})
  }
  
  toggleList(){
    this.setState((prevState) => ({ listOpen: !prevState.listOpen }))
  }
  render(){
    const {
      list,
      toggleItem
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
          }
        </div>
      </div>
    )
  }
}