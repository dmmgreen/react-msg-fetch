import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';
import $ from "jquery";
import Back from '../back/back';

export default class Question extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loading:true,
            Qdata:{
                question: {
                    title: "",
                    question: "",
                    count: "",
                    authorTime: ""
                },
                comment: []
            },
            mounted:false
        }
    }
    componentDidMount(){
        this.setState({
            mounted:true
        })
    }
    componentWillMount(){
        var id = this.props.params.questionId;
        /*
        $.ajax({
            url: 'http://127.0.0.1:8080/question',
            type: 'GET',
            data: {
                id: id
            },
            success: function(datas) {
                if (this.state.mounted) {
                    this.setState({
                        Qdata:datas,
                        loading:false
                    })
                }
            }.bind(this)
        })


         var _this=this;
         fetch("http://127.0.0.1:8080/question").then(function(listData) {
         return listData.json().then(function (json) {
         if (_this.state.mounted) {
         _this.setState({
         Qdata:json,
         loading:false
         })
         }

         })
         });


     fetch法一:拼接参数
         fetch(`http://127.0.0.1:8080/question/?id=${id}`,{
         method:'GET'
         })
         .then(listData => listData.json())
         .then((json) =>{
         if (this.state.mounted) {
         this.setState({
         Qdata:json,
         loading:false
         })
         }
         });


法二：也是传参拼接
         var urlSearch = new URLSearchParams(),
         params = {id:id};
         Object.keys(params).forEach(key => urlSearch.append(key, params[key]));
         fetch("http://127.0.0.1:8080/question?"+urlSearch) .then(listData => listData.json())
         .then((json) =>{
         console.log(json.comment);
         if (this.state.mounted) {
         this.setState({
         Qdata:json,
         loading:false
         })
         }
         });



         */



        //var querystring = require('querystring');
        //var data = { id: id };
        //
        //
        //fetch("http://127.0.0.1:8080/question/",{
        //    method:'GET',
        //    query:querystring.stringify(data)
        //})
        //    .then(listData => listData.json())
        //    .then((json) =>{
        //        if (this.state.mounted) {
        //            this.setState({
        //                Qdata:json,
        //                loading:false
        //            })
        //        }
        //    });

        fetch(`http://127.0.0.1:8080/question/?id=${id}`,{
            method:'GET'
        })
            .then(listData => listData.json())
            .then((json) =>{
                if (this.state.mounted) {
                    this.setState({
                        Qdata:json,
                        loading:false
                    })
                }
            });

    }
    render(){
        var data = this.state.Qdata;
        var author = data;
        var _list = data.comment.map(function(item,index){
            return (<div className="com-list fmt" key={index}>
                <div className="com-content" dangerouslySetInnerHTML={{__html:item.answer}}>
                </div>
                <div className="comUser">
                    <div className="comUserLeft">
                        {item.time}
                    </div>
                    <div className="comUserRight">
                        <img src={item.avatar} />
                        <div>
                            <span className="comNmae">{item.name}</span>
                            <span>{item.rank}</span>
                        </div>
                    </div>
                </div>
            </div>)
        });
        var isNone = !!this.state.loading ? "block" : "none";
        return (
            <div className="main question">
                <div className="questionTop">
                    <p className="question-title">
                        {data.question.title}
                    </p>
                    <p className="question-user">
                        {data.question.authorTime}
                    </p>
                </div>
                <div className="question-main fmt" dangerouslySetInnerHTML={{__html:data.question.question}}>
                </div>
                <h2 className="com-title">评论列表</h2>
                {_list}
                <div style={{display:isNone}} className='loading'> loading</div>
               /* <Back /> */
            </div>
        );

    }
}