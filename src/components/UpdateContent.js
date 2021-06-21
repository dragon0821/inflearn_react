import React, { Component } from 'react';

class UpdateContent extends Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.data.id,
            title:this.props.data.title,
            desc:this.props.data.desc
        }
        this.inputFormHandler = this.inputFormHandler.bind(this); // inputFormHandler함수는 항상 this를 bind할 것임을 나타 냄 
    }
    inputFormHandler(e){
        this.setState({[e.target.name]:e.target.value}); //[e.target.name] 하면 event가 target하고 있는 것의 name을 가져옴 title이면 title이런식으로
    }
    render(){
    console.log(this.props.data);
    console.log('UpdateContent render');
      return(
        <article>
              <h2>Update</h2>  
              <form action="/create_process" method="post" 
                onSubmit={function(e){
                    e.preventDefault();
                    this.props.onSubmit(
                        this.state.id,
                        this.state.title,
                        this.state.desc
                    );
                    console.log(e.target.title.value, e.target.desc.value);
                }.bind(this)}
                >
                <input type="hidden" name="id" value={this.state.id}></input>
                  <p>
                      <input
                        type="text" 
                        name="title" 
                        placeholder="title"
                        //value={this.props.data.title} <-props로 가져온값은 read_only의 값이므로 value로 지정해두면 값을 수정할 수 없게됨
                        value={this.state.title}
                        onChange={this.inputFormHandler}
                        // read_only인 값을 수정으로 바꾸려면 state화 해야함.-> state의 값을 바꾸려면   setState로 해야함.
                    ></input></p>
                  <p>
                      <textarea 
                      onChange={this.inputFormHandler}
                      name="desc" placeholder = "description" value={this.state.desc}></textarea>
                  </p>
                  <p>
                      <input type="submit" value = "submit"></input>
                  </p>
              </form>
        </article>
      );
    }
  }

  export default UpdateContent;