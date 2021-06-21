import React, { Component } from 'react';
import TOC from "./components/TOC"
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent"
import UpdateContent from "./components/UpdateContent"
import Subject from "./components/Subject"
import Control from "./components/Control"

import './App.css';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom';

//props는 read-only이므로 수정할 수 없다.   //상위 컴포넌트가 하위 컴포넌트의 값을 변경하거나 명령을 할때는 props를 이용한다
//state는 this.setState를 통해서만 수정할 수 있다   // 하위 컴포넌트가 상위 컴포넌트의 값을 변경하거나 명령을 할때는 event를 통해서 한다 (예시:setState())

class App extends Component{
  constructor(props){  // component 초기화 시키는 함수가 먼저 실행
    super(props);
    this.max_content_id=3; // state값으로 하지 않은 이유는 UI에 영향을 줄일이 없는 값이므로 state로 하지 않았다. 불필요한 rendering을 막을 수 있다.
    this.state = {
      mode : 'welcome',
      selected_content_id : 2,
      subject:{title:'WEB', sub:'World Wide Web!'},
      welcome:{title:'welcome', desc : 'Hello, React!!'},
      content:{title:'HTML', desc:'HTML is HyperText Markup Language.'},
      contents:[
        {id:1, title:'HTML',desc:'HTML is HyperText ...'},
        {id:2, title:'CSS',desc:'CSS is for design ...'},
        {id:3, title:'JavaScript',desc:'JavaScript is for interactive ...'}

      ]
    }
  }
  getReadContent(){
    var i = 0;
            while(i < this.state.contents.length){
              var data = this.state.contents[i];
              if(data.id === this.state.selected_content_id){
                return data;
                break;
              }
              i = i + 1;
            }
  }
  getContent(){
          //state가 바뀌면 해당 state를 가지고 있는 component의 render함수가 계속해서 새로 실행이 된다. (화면이 다시 그려진다)
          //render 함수가 새로 실행이 되면 하위에 있는 component 들의 render 함수 또한 새로 실행이 된다.
          var _title, _desc , _article = null;
          if (this.state.mode === 'welcome'){
            _title = this.state.welcome.title;
            _desc = this.state.welcome.desc;
            _article = <ReadContent title = {_title} desc = {_desc}></ReadContent>
          }
          else if(this.state.mode === 'read'){
            var _content=this.getReadContent();
            _article = <ReadContent title = {_content.title} desc = {_content.desc}></ReadContent>
          }
          else if(this.state.mode === 'create'){
            _article = <CreateContent onSubmit={function(_title,_desc){
              //this.state.contents에 있는 content를 하나 추가할 것이다 //add content to this.state.contents
              this.max_content_id = this.max_content_id + 1;
              //push는 원본의 배열에 push한 값이 반영된 배열로 원본을 바꾼다 ex) var arr=[1,2] arr.push(3) -> arr => [1,2,3]
              //concat은 원본의 배열에 concat한 값을 결합한 배열로 return을 해주는 방식이다. 원본의 배열을 바꾸지 않는다.
              //ex) var arr= [1,2] var result = arr.concat(3) arr => [1,2] result => [1,2,3]
              // this.state.contents.push(
              //   {id:this.max_content_id, title:_title, desc : _desc}
              // );
              //만약 객체를 바꾸고 싶다 arr.assign 배열을 바꾸고 싶다 Array.from //create관련 마지막 강의에 나옴 immutable-js 찾아보기

              //concat의 방식을 이용하는 방법도 있고 Array.from을 이용하여 복사한 후에 push하고 setState하는 방식도 있음
              //방법1// var _contents = this.state.contents.concat(
              //   {id:this.max_content_id, title:_title, desc : _desc}
              // );//이 방법이 무조건 권장하는 방법임. 성능을 개선할때 쉬워짐  
              // this.setState({
              //   contents:_contents
              // });
              //방법2
              var _contents = Array.from(this.state.contents);
              _contents.push({id:this.max_content_id, title:_title, desc : _desc});
              this.setState({
                contents:_contents,
                mode:'read',
                selected_content_id : this.max_content_id
              });
            }.bind(this)}></CreateContent>
          }
          else if(this.state.mode === 'update'){
            _content = this.getReadContent();
            _article = <UpdateContent data = {_content} onSubmit={
              function(_id,_title,_desc){
              var _contents = Array.from(this.state.contents); 
              //이렇게 되면 this.state.contents를 복사한 새로운 array가 만들어진다 //원본을 바꾸지 않는 테크닉 성능 튜닝할때 필요함
              var i = 0;
              while(i<_contents.length){
                if(_contents[i].id === _id){
                  _contents[i] = {id:_id, title:_title,desc:_desc};
                  break;
                }
                i=i+1;
              }
              this.setState({
                contents:_contents,
                mode:'read'
              });
            }.bind(this)}></UpdateContent>
          }
          //console.log('render',this); //render 함수에서는 component 자기 자신 // onClick에서의 function이라는 함수에서는 this가 component가 아님 
          return _article; 
  }
  render(){
    console.log('App render');
    return (
      <div className="App">
        <Subject title =  {this.state.subject.title}
         sub = {this.state.subject.sub}
         onChangePage={function(){ // 우리가 만든 event에 함수를 설치해두고
          this.setState({mode:'welcome'});
         }.bind(this)}
         ></Subject>
         {/* <header> //과도기 적인 코드임
              <h1><a href="/" onClick={function(e){  // event 처리를 위해 이름이 없는 함수에 첫번째 객체로 event를 전달해줘야한다
                console.log(e);
                e.preventDefault(); // 이벤트 처리시에 화면이 새로 reload되는 것을 막는 무조건 이용해야하는 방식
                                    // preventDefault라는 함수는 태그의 기본적인 동작을 못하게 막는 역할을 함.
                // this.state.mode = 'read'; // 이미 constructor에서 선언된 내용은 이렇게 바꿀수 없음 //react모르게 값을 바꿀려고 하는 것이므로 값을 바꿔 표시할 수 없음
                // 이것만 있을때의 문제점 2가지 : 1. this를 찾지 못한다 (함수의 끝에 bind로 찾아준다) 
                // 2. state값이 바뀌었음을 알 수 없다 (setState함수를 이용해야함)
                this.setState({
                  mode:'read'
                }) ; // 
                //bind 함수의 첫번째 인자로 원하는 객체를 넣어주면 해당 객체의 값들을 가져올 수 있다.
              }.bind(this)}>{this.state.subject.title}</a></h1> 
              {this.state.subject.sub}
        </header> */}
        <TOC 
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id : Number(id)}); // 해당 id가 문자열로 들어와서 이를 숫자로 바꾸기 위해 Number함수를 이용
        }.bind(this)} data = {this.state.contents}></TOC>
        <Control onChangeMode={function(_mode){
          if(_mode === 'delete'){
            if(window.confirm('really?')){ //사용자가 확인을 누르면 true가 반환이 되고 취소를 누르면 false를 반환함
              var _contents = Array.from(this.state.contents);
              var i=0;
              while(i<this.state.contents.length){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i,1); // splice의 파라미터1 :어디서부터 파라미터 2: 얼마나 지울것이냐
                  break;
                }
                i=i+1;
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              });
              alert('deleted!');
            }
          }
          else{
            this.setState({
              mode:_mode
            });
          }
          this.setState({
            mode:_mode
          });
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
