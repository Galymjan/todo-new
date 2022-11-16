import React,{Component} from 'react';

export default class SearchPanel extends Component
{
  
  //const {onfilterItems} = this.props;

  state = {
      term : ''
  }

  onSearchChange = (e)=>{
    const term= e.target.value;
    this.setState({term});
    this.props.onSearchChange(term);
  }

  render() {
    //const {onSearchChange} = this.props;
    
    

    return (
      //<form  onSubmit={this.onSubmit}>
      <input type="text"
                className="form-control search-input"
                onChange={this.onSearchChange}
                placeholder="type to search" 
                value={this.state.term} />
      //</form>
    );
  };
}