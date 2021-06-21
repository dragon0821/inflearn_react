import React, { Component } from 'react';

class Subject extends Component{
    render(){
      return (
        <header> 
              <h1><a href="/" onClick={function(e){ 
                e.preventDefault(); // 이벤트 처리를 해주기 위해서 onClick시 함수에서 event객체를 받아 페이지가 reload되지 않도록 하고 
                this.props.onChangePage(); // props를 통해서 우리가 설치해둔 함수를 이용한다
              }.bind(this)}>{this.props.title}</a></h1>
              {this.props.sub}
        </header>
      );
    }
  }

  export default Subject;