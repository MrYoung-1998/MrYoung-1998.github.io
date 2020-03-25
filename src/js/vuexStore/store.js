import Vuex from "vuex";
import axios from "axios";
import  Vue from "vue"
Vue.use(Vuex);

const url = 'http://175.24.31.199:3000';

const store = new Vuex.Store({
    state:{
        //图的结点数组
        vertexArg:[],
        //图的边数组
        edgeArg:[],
        //处理后的图的结点数组
        resultVertexArg:[],
        //处理后的图的边数组
        resultEdgeArg:[],
        //数据到达标志符
        resultFlag : false
    },
    mutations:{
        insertVertex(state,vertex){
            /*判断点是已经存在，若存在则进行修改操作，若不存在则进行增加操作*/
            for(let v of state.vertexArg){
                if(v.name == vertex.name){//存在，修改该点的值
                    v.x = vertex.x;
                    v.y = vertex.y;
                    v.value = vertex.value;
                    return ;
                }
            }
            state.vertexArg.push(vertex);
        },
        insertEdge(state,edge){
            state.edgeArg.push(edge);
        },
        postGraph(state,location){
            state.resultFlag= false;
            state.resultVertexArg =[];
            state.resultEdgeArg =[];
            let vertexes = '';
            let edges='';
            for(let item of state.vertexArg){
                vertexes += `${item.name} ${item.x} ${item.y} ${item.value}`+'\n';
            }
            for(let item of state.edgeArg){
                edges += `${item.source} ${item.target}`+'\n';
            }
            axios({
                url:url+location,
                method:'post',
                data:JSON.stringify({
                    vertexArg:vertexes,
                    edgeArg: edges,
                })
            }).then((res,error)=>{
                if(error)
                    console.log(error.message);
                else{
                    //在这里定义回调函数

                    //修改数据到达标识符
                    state.resultFlag = true;

                    /*收到的参数格式
                    0: {nodeName: "Point0", x: 50.605450751765396, y: 56.36369915727259, value: "10", edge: {…}}*/
                    /*edge格式
                    *{source：xx,target:xxx}
                    * */
                    //将得到的数据初始化顶点数组和边数组
                    //初始化顶点数组
                    res.data.graph.vertexArg.forEach((item)=>{
                        state.resultVertexArg.push({
                            name:item.nodeName,
                            x:item.x,
                            y:item.y,
                            value:item.value,
                        });
                    });

                    //初始化顶点边数组
                    res.data.graph.vertexArg.forEach((item)=>{
                        let edgePtr = item.edge;
                        while(edgePtr!=null){
                            state.resultEdgeArg.push(Object.assign({},edgePtr));
                            edgePtr = edgePtr.next;
                        }
                    });

                    //调用drawResult事件
                    window.dispatchEvent(window.eventHub.drawResultGraph);
                }
            });
        }
    }
});

export default store