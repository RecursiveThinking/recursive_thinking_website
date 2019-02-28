import React, {Component} from 'react'

import FontAwesomeIcon from '../../common/fontAwesomeIcon/fontAwesomeIcon'

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

export class DropDownFilter extends Component {
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
    const count = nextProps.list.filter((a) => a.selected).length;
    if(count === 0){
      // just render the title
      return { headerTitle: nextProps.title }
    }
    else if(count > 0){
      return count > 1 ? { headerTitle: `${count} Filters Applied` } : { headerTitle: `${count} Filter Applied` }
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
                        // listOpen &&  
                        
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