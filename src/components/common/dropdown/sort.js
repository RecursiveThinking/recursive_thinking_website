import React, {Component} from 'react'

import FontAwesomeIcon from '../fontAwesomeIcon/fontAwesomeIcon'

export class DropDownSort extends Component {
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      headerTitle: this.props.title,
      timeOut: null
    }
  }
  
  componentDidUpdate(){
    const { listOpen } = this.state;
    setTimeout(() => {
      if(listOpen){
        window.addEventListener('click', this.close);
      } else {
        window.removeEventListener('click', this.close)
      }
    }, 0);
  }
  
  componentWillUnmount(){
    window.removeEventListener('click', this.close)
  }
  
  close = (timeOut) => {
    this.setState({ listOpen: false })
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
                      className={listItem.selected ? "listItem fs16 fw500 ls10 fcGrey424041 selected" : "listItem fs16 fw500 ls10 fcGrey424041"}
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

