import React from 'react';
import { Router, Route, Link,IndexLink , hashHistory, IndexRoute } from 'react-router';
import $ from "jquery";


export default  class List extends React.Component{
    constructor(props){
        super(props);
        this.state={
            page:1,
            quelist:[],
            loading:true,
            loadingMore:false,
            mounted :false
        }
    }
    scrollUpdate(){
        var scrollTop =  $(window).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight =  $(window).height();
        var _this=this;

        if (scrollTop + windowHeight >= scrollHeight -100 && this.state.loadingMore) {
            this.setState({
                loadingMore:false,
                loading:true
            });


            /*
            $.ajax({
                url: 'http://127.0.0.1:8080',
                type: 'GET',
                data: {
                    page: this.state.page
                },
                success: function(listData) {
                    if (this.state.mounted && listData) {
                        var quelists = this.state.quelist.concat(listData);
                        var $page = this.state.page + 1;
                        this.setState({
                            quelist:quelists,
                            loading:false,
                            page:$page,
                            loadingMore:true
                        })
                    }

                }.bind(_this)
            })

                 fetch("http://127.0.0.1:8080").then(function(listData) {
                 return listData.json().then(function (json) {
                 if (_this.state.mounted && json) {
                 var quelists = _this.state.quelist.concat(json);
                 var $page = _this.state.page + 1;
                 _this.setState({
                 quelist:quelists,
                 loading:false,
                 page:$page,
                 loadingMore:true
                 })
                 }

                 })
                 });
            */


            fetch('http://127.0.0.1:8080')
                .then(listData => listData.json())
                .then((json)=>{
                    if (this.state.mounted && json) {
                        var quelists = this.state.quelist.concat(json);
                        var $page = this.state.page + 1;
                        this.setState({
                            quelist:quelists,
                            loading:false,
                            page:$page,
                            loadingMore:true
                        })
                    }
                })

        }

    }
    componentDidMount(){
        this.setState({
            mounted : true
        });
        var _this=this;
        /*
        $.ajax({
            url:'http://127.0.0.1:8080',
            type: 'GET',
            data: {
                page: this.state.page
            },
            success: function(listData) {
                if (this.state.mounted) {
                    this.setState({
                        quelist:listData,
                        page:(this.state.page + 1),
                        loading:false,
                        loadingMore:true
                    })
                }

            }.bind(_this)

        });



         fetch("http://127.0.0.1:8080").then(function(listData) {
         return listData.json().then(function (json) {
         if (_this.state.mounted) {
         _this.setState({
         quelist:json,
         page:(_this.state.page + 1),
         loading:false,
         loadingMore:true
         })
         }

         })
         });


        */


        fetch("http://127.0.0.1:8080")
            .then(listData => listData.json())
            .then((json) =>{
                if (this.state.mounted) {
                    this.setState({
                        quelist:json,
                        page:(_this.state.page + 1),
                        loading:false,
                        loadingMore:true
                    })
                }
            });
        window.addEventListener('scroll',()=>{this.scrollUpdate()});
    }
    componenetUnmount(){
        window.removeEventListener('scroll',()=>{this.scrollUpdate()});
    }
    routerWillLeave(){
        window.removeEventListener('scroll',()=>{this.scrollUpdate()});
    }
   render(){
       var _list=this.state.quelist.map(function(value,index){
           return (
               <li key={value.title.titleSrc+index}>
                    <div className="vote">
                        {value.votes}
                        <small>投票</small>
                    </div>
                   <div className="summary">
                        <Link className="summaryTitle" to ={`/question/${value.title.titleSrc}`}>
                            {value.title.content}
                        </Link>
                       <p className="user-time">
                           {value.author} {value.time}
                       </p>
                   </div>
                   <div className="view-answers">
                        <strong>
                            {value.answers}
                        </strong>
                       /
                       {value.views}
                   </div>
               </li>
           );
       }.bind(this));
       var isNone = !!this.state.loading ? "block" : "none";
       return (
           <div className="main">
               <ul>
                   {_list}
               </ul>
               <div style={{display:isNone}} className='loading'> loading</div>
           </div>
       );
   }
}
