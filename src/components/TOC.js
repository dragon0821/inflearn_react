import React, { Component } from 'react';


class TOC extends Component{
  shouldComponentUpdate(newProps,newState){
    if(newProps.data === this.props.data)// 변화가 없으면 false를 return 하고
    { //newProbs는 새롭게 바뀐 data이고 this.props.data는 기존의 data임
      //이렇게 newProps와 this.props.data를 비교하려면 기존의 값에 변화가 없어야함. -> push가 아닌 concat을 사용해야하는 이유
      return false;
    }
    return true; //변화가 있으면 true를 return 하도록 한다.
  }
  //shouldComponentUpdate가 false를 return 하면 render가 호출되지 않는다
  //shouldComponentUpdate가 true를 return 하면 render가 호출된다 무조건
  //TOC가 반드시 render가 되지 않아도 되는데 변화가 생길때 마다 관련도 없는데 호출될 필요가 없으니까 성능이 개선됨

    render(){
      console.log('Toc render');
        var lists = [] ;
        var data = this.props.data;
        var i = 0;
        while(i < data.length){
            lists.push(
            <li key={data[i].id}>
                <a
                 href = {"/content/"+data[i].id}
                 data-id = {data[i].id}   //여기서 data-yongju이런식이면 e.target.dataset.yongju이런식으로 값을 가져오면 된다
                 onClick={function(e){  // id를 매개변수로 받고 onChangePa ge함수에도 id를 넘겨주고 bind에 data[i].id를 해주는 방법도 있다
                     e.preventDefault();
                     this.props.onChangePage(e.target.dataset.id);
                    //e.target이면 해당 이벤트가 타겟이 되는 태그를 지목하고 그 안의 dataset의 id가 우리가 선택한 id를 지목하게된다
                 }.bind(this)}
                 >{data[i].title}</a>
            </li>);
            i = i + 1;
        }
      return(
        <nav>
          <ul>
             {lists}
          </ul>
        </nav>
      );
    }
  }

  export default TOC;