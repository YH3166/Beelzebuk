import ComponentBase from "./ComponentBase";
import UIManager from "./UIManager";
import Message, { MessageType } from "./Message";
import MessageCenter from "./MessageCenter";

const {ccclass, property} = cc._decorator;

//obstacle是包含其他玩家角色，敌人角色，场景道具的所有障碍物，适用于检测行动目标等。
//object是场景道具检测
//enemy是敌人角色检测
let object: cc.Vec2[] = [];
let objectRoof: cc.Vec2[] = [];
let obstacle: cc.Vec2[] = [];
let obstacleRoof: cc.Vec2[] = [];
let enemy:  cc.Vec2[] = [];
let enemyRoof: cc.Vec2[] = [];
let edge: cc.Vec2[] = [];

//填写obstacles
var obstaclex = [0, 0, 0, 0, 2, 19, 19, 30, 30, 36,36,37,37,37,37,40,40,41,41,41,41,42,42,43,43,45,45,46,46,47,47,48,48,49,19,19,30,30,47,44,48,36,40,43,44,46,47,48,49,49,49,24,49,11,11,29,29];
var obstacley = [1, 2, 48,49,3, 18, 19, 18, 19, 4, 5, 4, 5, 12,13,7, 8, 7, 8, 18,19,18,19,11,12,15,16,15,16,9, 10,9 ,10,1 ,30,31,30,31,29,35,38,47,46,43,49,46,47,44,45,48,49,33,4, 48,49,48,49];
for(let i = 0; i<19; i++){
    obstaclex.push(11+i);
    obstacley.push(46);
}
for(let i = 0; i<19; i++){
    obstaclex.push(11+i);
    obstacley.push(47);
}        
for(let i = 0; i<obstaclex.length; i++){
    obstacle.push(cc.v2(Math.round(obstaclex[i]*32),Math.round(obstacley[i]*32)));
}


//填写roof obstacles
var obstacleRoofx = [0, 1, 4, 5, 6, 7, 7, 7, 0, 1, 4, 5 ];
var obstacleRoofy = [18,18,18,18,18,19,20,21,29,29,29,29];
for(let i = 0; i<7; i++){
    obstacleRoofx.push(6);
    obstacleRoofy.push(22+i);
}
for(let i = 0; i<obstacleRoofx.length; i++){
    obstacleRoof.push(cc.v2(Math.round(obstacleRoofx[i]*32),Math.round(obstacleRoofy[i]*32)));
}

//填写edges
var Edgex = [];
var Edgey = [];
for(let i = 0; i<10; i++){
    Edgey.push(20);
    Edgex.push(20+i);
    Edgey.push(29);
    Edgex.push(20+i);
    Edgey.push(19);
    Edgex.push(20+i);
    Edgey.push(30);
    Edgex.push(20+i);        
}
for(let i = 0; i<3; i++){
    Edgex.push(20);
    Edgey.push(21+i);
    Edgex.push(29);
    Edgey.push(21+i);
    Edgex.push(20);
    Edgey.push(26+i);
    Edgex.push(29);
    Edgey.push(26+i);        
}
for(let i = 0; i<4; i++){
    Edgex.push(19);
    Edgey.push(20+i);
    Edgex.push(30);
    Edgey.push(20+i);
    Edgex.push(19);
    Edgey.push(26+i);
    Edgex.push(30);
    Edgey.push(26+i); 
}
for(let i = 0; i<4; i++){
    Edgex.push(1+i);
    Edgey.push(17);
    Edgex.push(1+i);
    Edgey.push(29);
}
for(let i = 0; i<Edgey.length; i++){
    edge.push(cc.v2(Math.round(Edgex[i]*32),Math.round(Edgey[i]*32)));
}    

//填写object
var objectx = [0, 0, 1,20,20,26,26,27,29,48,49];
var objecty = [2,21,48,46,47,46,47,50,20,49,4];
for(let i = 0; i<objectx.length; i++){
    object.push(cc.v2(Math.round(objectx[i]*32),Math.round(objecty[i]*32)));
}
obstacle = obstacle.filter(vecA => !object.some(vecB => vecA.equals(vecB)));

//填写objectRoof



//填写enemy
var enemyx = [0];
var enemyy = [3];
for(let i = 0; i<enemyx.length; i++){
    enemy.push(cc.v2(Math.round(enemyx[i]*32),Math.round(enemyy[i]*32)));
}

@ccclass
export default class mapControl extends ComponentBase {
    map: cc.TiledMap;
    player1: cc.Node = null;
    
    start () {
        //接收UI信息
        UIManager.Instance.RegisterReceiver(this);
        //创建玩家角色
        cc.loader.loadRes('Player1', cc.Prefab, (res,playerPre) =>{
            this.player1 = cc.instantiate(playerPre);
            this.player1.setParent(this.node.getChildByName("Player").getChildByName("PlayerLayer"));
            this.player1.x = 96;
            this.player1.y = 320;
        });
    }

    ReceiveMessage(msg: Message){
        super.ReceiveMessage(msg);
        //修订obstacle，吧ladder位置的tile添加/移除obstacle,目的是show target move时不显示ladder。
        if(msg.Command == MessageType.Map_Update_Obstacle){
            if(msg.Content == "Add_Ladders"){
                obstacleRoof.push(cc.v2(Math.round(2*32),Math.round(17*32)));
                obstacleRoof.push(cc.v2(Math.round(3*32),Math.round(17*32)));
                obstacleRoof.push(cc.v2(Math.round(2*32),Math.round(29*32)));
                obstacleRoof.push(cc.v2(Math.round(3*32),Math.round(29*32)));
                obstacle.push(cc.v2(Math.round(2*32),Math.round(17*32)));
                obstacle.push(cc.v2(Math.round(3*32),Math.round(17*32)));
                obstacle.push(cc.v2(Math.round(2*32),Math.round(29*32)));
                obstacle.push(cc.v2(Math.round(3*32),Math.round(29*32)));
            }
            if(msg.Content == "Remove_Ladders"){
                obstacle.pop();
                obstacle.pop();
                obstacle.pop();
                obstacle.pop();
                obstacleRoof.pop();
                obstacleRoof.pop();
                obstacleRoof.pop();
                obstacleRoof.pop();
            }
        }
        //进入ladder时将玩家角色更换图层
        if(msg.Command == MessageType.Map_Ladder_Up){
            this.node.getChildByName('Player').getChildByName('PlayerLayer').getChildByName('Player1').setParent(this.node.getChildByName("图块层 4").getChildByName("PlayerLayer"));
        }
        if(msg.Command == MessageType.Map_Ladder_Down){
            this.node.getChildByName('图块层 4').getChildByName('PlayerLayer').getChildByName('Player1').setParent(this.node.getChildByName("Player").getChildByName("PlayerLayer"));
        }
    }

    update (dt) {
        if(this.player1 != null){
            cc.Camera.main.node.x = this.player1.x - 480;
            cc.Camera.main.node.y = this.player1.y - 320;
        }
    }
}

export function CheckObstacle(curPos, desPos){
    if(desPos.x>=0 && desPos.x<1600 && desPos.y>0 && desPos.y<1600){
        if(!obstacle.some(vec => vec.equals(desPos))){
            if(!edge.some(vec => vec.equals(desPos))){
                return true;
            }else{
                if(desPos.x == 2*32 && curPos.x==1*32){
                    return false;
                }
                if(desPos.x == 3*32 && curPos.x==4*32){
                    return false;
                }
                if(desPos.x == 1*32 && curPos.x==2*32){
                    return false;
                }
                if(desPos.x == 4*32 && curPos.x==3*32){
                    return false;
                }            
                if(desPos.y == 29*32 && desPos.x < 10*32){
                    return true
                }            
                if(desPos.x == 20*32 && curPos.x==19*32){
                    return false;
                }
                if(desPos.x == 19*32 && curPos.x==20*32){
                    return false;
                }
                if(desPos.x == 29*32 && curPos.x==30*32){
                    return false;
                }
                if(desPos.x == 30*32 && curPos.x==29*32){
                    return false;
                }
                if(desPos.y == 20*32 && curPos.y==19*32){
                    return false;
                }
                if(desPos.y == 19*32 && curPos.y==20*32){
                    return false;
                }
                if(desPos.y == 29*32 && curPos.y==30*32){
                    return false;
                }
                if(desPos.y == 30*32 && curPos.y==29*32){
                    return false;
                }
                return true;
            }
        }
    }
}

export function CheckObstacleRoof(desPos){
    if(desPos.x>=0 && desPos.x<1600 && desPos.y>0 && desPos.y<1600){
        if(!obstacleRoof.some(vec => vec.equals(desPos))){
            return true;
        }
    }else{
        return false;
    }
}

export function CheckObject(desPos){
    if(!object.some(vec => vec.equals(desPos))){
        return true;
    }else{
        return false;
    }
}

export function CheckObjectRoof(desPos){
    if(!objectRoof.some(vec => vec.equals(desPos))){
        return true;
    }else{
        return false;
    }
}

export function CheckEnemy(desPos){
    if(!enemy.some(vec => vec.equals(desPos))){
        return true;
    }else{
        return false;
    }
}

export function CheckEnemyRoof(desPos){
    if(!enemyRoof.some(vec => vec.equals(desPos))){
        return true;
    }else{
        return false;
    }
}