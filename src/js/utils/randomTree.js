const randomFloat= function(x1,x2){//用于产生x1到x2之间的随机数
    return Math.random()*(x2-x1)+x1;
};

const randomInt = function (x1,x2) {
    //random返回[0,1)的浮点数
    //Math.random()*(x2-x1)+x1;返回[x1,x2）的浮点数，所以要获得[x1,x2],应该将x2+1然后向下取整
    return Math.floor(Math.random()*(x2+1-x1)+x1);
};

//生成随机顶点
const randomVertexArg = function(vAmt,x1,x2,y1,y2){//vAmt为点的数量
    let vertexArg = new Array();
    for(let i=0;i<vAmt;i++){
        let randomX = randomFloat(x1,x2);
        let randomY = randomFloat(y1,y2);
        let randomName = 'Point'+i;
        let value = 10;
        let vertex = {
            name:randomName,
            x:randomX,
            y:randomY,
            value:value,
        };
        vertexArg.push(vertex)
    }
    return vertexArg;
};

//生成随机边
const randomEdge = function (vertexArg,maxChildren) {
    //定义边数组
    let edgeArg = new Array();
    //拷贝一份顶点数组
    let vertexArgCopy = new Array();
    vertexArg.forEach((item)=>{
        let obj ={};
        //对数组的每一个对象进行浅拷贝
        Object.assign(obj,item);
        vertexArgCopy.push(obj);
    });
    //用push和shift进行队列操作
    let queue = new Array();

    //将第一个元素进行入队操作，采用数组的push方法
    let first = vertexArgCopy.shift();
    queue.push(Object.assign({},first));
    while(queue.length!=0){//当队列不为空时，进行插入边的操作  **?为啥不能用length属性来判断?
        let source = queue.shift();//获取队列的第一个元素作为源点
        let randomChildren = randomInt(1,Number.parseInt(maxChildren));//每一个结点随机产生randomChildren个孩子节点
        for(let i=0;i<randomChildren;i++){
            let target = vertexArgCopy.shift();//从节点数组中删除一个元素
            if(typeof target != 'undefined'){//当存在端点时，构造边
                queue.push(target);//将顶点放入队列尾端
            }
            else{//当不存在端点时返回结果
                return edgeArg;
            }
            let edgeItem = {//每一个随机生成的边
                source:source.name,
                target:target.name,
            };
            edgeArg.push(edgeItem);
        }
    }
};

//暴露接口
export default function (vAmt,xMin,xMax,yMin,yMax,maxChildren) {
    let vertexArg = randomVertexArg(vAmt,xMin,xMax,yMin ,yMax);//得到随机顶点数组
    let edgeArg = randomEdge(vertexArg,maxChildren);//得到随机边
    return{
        Vertexes:vertexArg,
        Edges:edgeArg,
    }
}