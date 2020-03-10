(this["webpackJsonpchat-app"]=this["webpackJsonpchat-app"]||[]).push([[0],{1150:function(e,t,o){},1151:function(e,t,o){},1162:function(e,t,o){},1163:function(e,t,o){"use strict";o.r(t);var n=o(0),a=o.n(n),s=o(45),c=o.n(s),i=o(8),r=o.n(i),m=o(10),l=o(2),u=o(3),p=o(5),d=o(4),h=o(6),f=o(46),v=o.n(f),g=(o(86),o(87),"disconnect"),E="connected",N="join",O="joined",R="leave",b="left",k="message",C=o(13),S=o.n(C),j=function(e){function t(){var e,o;Object(l.a)(this,t);for(var n=arguments.length,a=new Array(n),s=0;s<n;s++)a[s]=arguments[s];return(o=Object(p.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(a)))).url="",o.state={roomList:[],selectedRoom:"",isSomeRoomJoined:!1,isListeningToRoomJoinAndLeave:!1,username:null},o.listenToRoomJoined=function(){o.props.socket.on(O,(function(e){console.log("JOINED ROOM -> :",e),o.setState({isSomeRoomJoined:!0})}))},o.listenToRoomLeave=function(){o.props.socket.on(b,(function(e){console.log("ROOM LEAVE -> :",e),e.username===o.state.username&&o.setState({isSomeRoomJoined:!1})}))},o.listenToConnect=function(){o.props.socket.on(E,(function(e){console.log("CONNECTED ->:",e),o.setState({username:e.username})}))},o.getAllRooms=Object(m.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.a.get("".concat(o.url,"/api/rooms"));case 2:t=e.sent,o.setState({roomList:t.data.rooms});case 4:case"end":return e.stop()}}),e)}))),o.joinOrLeaveRoom=Object(m.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o.state.isSomeRoomJoined?o.props.socket.emit(R,{roomName:o.state.selectedRoom,username:o.state.username}):o.props.socket.emit(N,{roomName:o.state.selectedRoom,username:o.state.username});case 1:case"end":return e.stop()}}),e)}))),o}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.getAllRooms()}},{key:"componentDidUpdate",value:function(){this.props.socket&&!this.state.isListeningToRoomJoinAndLeave&&(this.setState({isListeningToRoomJoinAndLeave:!0}),this.listenToRoomJoined(),this.listenToRoomLeave(),this.listenToConnect())}},{key:"render",value:function(){var e=this,t=this.state.roomList.map((function(e){return a.a.createElement("option",{value:e.roomName,key:e.roomName},e.roomName)}));return a.a.createElement("div",{className:"ui form"},a.a.createElement("div",{className:"ui row mb-2"},a.a.createElement("div",{className:"ui toggle checkbox"},a.a.createElement("input",{type:"checkbox",checked:this.props.isConnected,onChange:this.props.onConnectionToggle,disabled:this.state.isSomeRoomJoined}),a.a.createElement("label",null,this.props.isConnected?"Disconnect":"Connect"))),a.a.createElement("div",{className:"ui row two fields"},a.a.createElement("div",{className:"field"},a.a.createElement("select",{value:this.state.selectedRoom,disabled:!this.props.isConnected||this.state.isSomeRoomJoined,onChange:function(t){return e.setState({selectedRoom:t.target.value})}},a.a.createElement("option",{value:""},"Select A Room"),t)),a.a.createElement("div",{className:"field"},a.a.createElement("button",{className:"ui primary button",disabled:!this.props.isConnected,onClick:this.joinOrLeaveRoom},this.state.isSomeRoomJoined?"Leave":"Join"))))}}]),t}(a.a.Component),J=o(47),T=o.n(J),y=(o(1150),o(1151),function(e){function t(){return Object(l.a)(this,t),Object(p.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"comment"},a.a.createElement("a",{href:"/",className:"avatar"},a.a.createElement("img",{alt:"avatar",src:"App Bot"===this.props.author?"./bot.png":this.props.avatar})),a.a.createElement("div",{className:"content"},a.a.createElement("a",{href:"/",className:"author ".concat("App Bot"===this.props.author?"red":"")},this.props.author),a.a.createElement("div",{className:"metadata"},a.a.createElement("span",{className:"date"},this.props.timeAgo)),a.a.createElement("div",{className:"text"},this.props.content)))}}]),t}(a.a.Component)),L=o(1167),w=o(48),A=o.n(w);L.a.addLocale(A.a);var D=function(e){function t(){var e,o;Object(l.a)(this,t);for(var n=arguments.length,a=new Array(n),s=0;s<n;s++)a[s]=arguments[s];return(o=Object(p.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(a)))).timeAgo=new L.a,o}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.props.comments;return t.sort((function(e,t){return new Date(t.timestamp)-new Date(e.timestamp)})),t=this.props.comments.map((function(t){return a.a.createElement(y,{key:t._id,author:t.username,timeAgo:e.timeAgo.format(new Date(t.timestamp)),content:t.message,avatar:T.a.image.avatar()})})),a.a.createElement("div",{className:"ui segment comments comment-list"},t)}}]),t}(a.a.Component),M=(o(1162),function(e){function t(){var e,o;Object(l.a)(this,t);for(var n=arguments.length,a=new Array(n),s=0;s<n;s++)a[s]=arguments[s];return(o=Object(p.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(a)))).state={comment:""},o.messageRoom=function(){o.props.socket.emit(k,{roomName:o.props.roomName,message:o.state.comment,timestamp:new Date})},o}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return a.a.createElement("div",{className:"ui form"},a.a.createElement("div",{className:"field"},a.a.createElement("label",null,"Username:"," ",a.a.createElement("span",{className:"red"},this.props.username?"("+this.props.username+")":null)),a.a.createElement("textarea",{disabled:!this.props.isConnected||!this.props.isSomeRoomJoined,value:this.state.comment,onChange:function(t){return e.setState({comment:t.target.value})}})),a.a.createElement("div",{className:"field right-align"},a.a.createElement("button",{className:"ui teal button",onClick:this.messageRoom,disabled:!this.props.isConnected||!this.props.isSomeRoomJoined},"Comment")))}}]),t}(a.a.Component)),x=function(e){function t(){var e,o;Object(l.a)(this,t);for(var n=arguments.length,a=new Array(n),s=0;s<n;s++)a[s]=arguments[s];return(o=Object(p.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(a)))).url="",o.state={isConnected:!1,roomName:"",username:null,isSomeRoomJoined:!1,commentList:[]},o.connectSocket=function(){o.socket=v.a.connect(o.url),o.listenToRoomJoined(),o.listenToRoomLeave(),o.listenToDisconnect(),o.listenToConnect()},o.disconnectSocket=function(){o.socket.disconnect()},o.onConnectionToggle=function(){o.setState({isConnected:!o.state.isConnected}),o.state.isConnected?o.disconnectSocket():o.connectSocket()},o.getMessageOfRoom=function(){var e=Object(m.a)(r.a.mark((function e(t){var n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.a.post("".concat(o.url,"/api/roomhistory"),{roomname:t});case 2:n=e.sent,o.setState({commentList:n.data});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),o.listenToRoomJoined=function(){o.socket.on(O,(function(e){console.log("ROOM JOINED -> :",e),o.setState({roomName:e.roomName,isSomeRoomJoined:!0}),o.listenToMessages(),o.getMessageOfRoom(e.roomName)}))},o.listenToConnect=function(){o.socket.on(E,(function(e){console.log("CONNECTED :",e),o.setState({username:e.username})}))},o.listenToDisconnect=function(){o.socket.on(g,(function(e){console.log("DISCONNECTED :",e),o.setState({username:null})}))},o.listenToRoomLeave=function(){o.socket.on(b,(function(e){console.log("ROOM LEAVE :",e),e.username===o.state.username&&(o.setState({isSomeRoomJoined:!1,roomName:"",commentList:[]}),o.socket.off(k))}))},o.listenToMessages=function(){o.socket.on(k,(function(e){console.log("MESSAGE :",e),o.getMessageOfRoom(o.state.roomName)}))},o}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"ui container"},a.a.createElement("div",{className:"ui grid"},a.a.createElement("div",{className:"two column row"},a.a.createElement("div",{className:"column"},a.a.createElement(D,{comments:this.state.commentList})),a.a.createElement("div",{className:"column"},a.a.createElement(j,{isConnected:this.state.isConnected,onConnectionToggle:this.onConnectionToggle,onRoomJoin:this.onRoomJoin,socket:this.socket}),a.a.createElement(M,{isConnected:this.state.isConnected,roomName:this.state.roomName,isSomeRoomJoined:this.state.isSomeRoomJoined,socket:this.socket,username:this.state.username})))))}}]),t}(a.a.Component);c.a.render(a.a.createElement(x,null),document.getElementById("root"))},49:function(e,t,o){e.exports=o(1163)},83:function(e,t){},86:function(e,t,o){},87:function(e,t,o){}},[[49,1,2]]]);
//# sourceMappingURL=main.10eaf565.chunk.js.map