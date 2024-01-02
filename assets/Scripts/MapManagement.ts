import ComponentBase from "./ComponentBase";
import UIManager from "./UIManager";
import Message, { MessageType } from "./Message";
import { CheckEnemy, CheckEnemyRoof, CheckObject, CheckObjectRoof, CheckObstacle, CheckObstacleRoof} from "./mapControl";
import playerControl, { player1 } from "./playerControl";
import MessageCenter from "./MessageCenter";

const {ccclass, property} = cc._decorator;

var moveRange: number[] = [0, 0, 0, 0];  //上下左右
export function getMoveRange(){
    return moveRange;
}

var attackRange: number[] = [0, 0, 0, 0];  //上下左右
export function getAttackRange(){
    return attackRange;
}

@ccclass
export default class MapManager extends ComponentBase {

    start () {
        UIManager.Instance.RegisterReceiver(this);
    }

    ReceiveMessage(msg: Message){
        super.ReceiveMessage(msg);
        //移动范围（直线）
         if(msg.Command == MessageType.Show_Target_Move){
            var GridLayer_Move = new cc.Node('GridLayer_Move');
            var dir: cc.Vec2[] = [cc.v2(0,1),cc.v2(0,-1),cc.v2(-1,0),cc.v2(1,0)];
            GridLayer_Move.setParent(this.node.getChildByName("图块层 3"));
            cc.loader.loadRes('Grid_green', cc.Prefab, (res,gridPre) =>{
                var remainingStep = player1.movePoint;
                moveRange=[remainingStep,remainingStep,remainingStep,remainingStep];
                for(let j = 0; j < 4; j++){
                    for(let i = 0; i<remainingStep; i++){
                        var curPos = cc.v2(Math.round(msg.Content.x + 32 * (dir[j].x) * i), Math.round(msg.Content.y + 32 * (dir[j].y) * i));
                        var tarPos = cc.v2(Math.round(msg.Content.x + 32 * (dir[j].x) * (i+1)), Math.round(msg.Content.y + 32 * (dir[j].y) * (i+1)));
                        if(CheckObstacle(curPos,tarPos) && CheckObject(tarPos) && CheckEnemy(tarPos)) {
                            var newGridInstance = cc.instantiate(gridPre);
                            newGridInstance.setParent(this.node.getChildByName("图块层 3").getChildByName('GridLayer_Move'));
                            newGridInstance.position = cc.v2(tarPos.x - 800, tarPos.y - 800);
                        }else{
                            moveRange[j] = i;
                            break;
                        }    
                    }
                }
            });
        }
        //移动范围（直线）,屋顶版本
        if(msg.Command == MessageType.Show_Target_Move_Roof){
            var GridLayer_Move = new cc.Node('GridLayer_Move');
            var dir: cc.Vec2[] = [cc.v2(0,1),cc.v2(0,-1),cc.v2(-1,0),cc.v2(1,0)];
            GridLayer_Move.setParent(this.node.getChildByName("图块层 3"));
            cc.loader.loadRes('Grid_green', cc.Prefab, (res,gridPre) =>{
                var remainingStep = player1.movePoint;
                moveRange=[remainingStep,remainingStep,remainingStep,remainingStep];
                for(let j = 0; j < 4; j++){
                    for(let i = 0; i<remainingStep; i++){
                        //var curPos = cc.v2(Math.round(msg.Content.x + 32 * (dir[j].x) * i), Math.round(msg.Content.y + 32 * (dir[j].y) * i));
                        var tarPos = cc.v2(Math.round(msg.Content.x + 32 * (dir[j].x) * (i+1)), Math.round(msg.Content.y + 32 * (dir[j].y) * (i+1)));
                        if(CheckObstacleRoof(tarPos) && CheckObjectRoof(tarPos) && CheckEnemyRoof(tarPos)) {
                            var newGridInstance = cc.instantiate(gridPre);
                            newGridInstance.setParent(this.node.getChildByName("图块层 3").getChildByName('GridLayer_Move'));
                            newGridInstance.position = cc.v2(tarPos.x - 800, tarPos.y - 800);
                        }else{
                            moveRange[j] = i;
                            break;
                        }    
                    }
                }
            });
        }

        //近战攻击范围
        if(msg.Command == MessageType.Show_Target_Melee){
            var GridLayer_Melee = new cc.Node('GridLayer_Melee');
            var dir: cc.Vec2[] = [cc.v2(0,1),cc.v2(0,-1),cc.v2(-1,0),cc.v2(1,0)];
            GridLayer_Melee.setParent(this.node.getChildByName("图块层 3"));
            //攻击范围内，无敌人位置，生成绿色边框
            cc.loader.loadRes('Grid_green', cc.Prefab, (res,gridPre) =>{
                for(let i=0; i<4; i++){
                    var curPos = cc.v2(Math.round(msg.Content.x), Math.round(msg.Content.y));
                    var tarPos = cc.v2(Math.round(msg.Content.x + 32 * dir[i].x), Math.round(msg.Content.y + 32 * dir[i].y));
                    if(CheckObstacle(curPos,tarPos) && CheckObject(tarPos) && CheckEnemy(tarPos)){
                        var newGridInstance = cc.instantiate(gridPre);
                        newGridInstance.setParent(this.node.getChildByName("图块层 3").getChildByName('GridLayer_Melee'));
                        newGridInstance.position = cc.v2(Math.round(msg.Content.x - 800 + 32 * dir[i].x), Math.round(msg.Content.y - 800 + 32 * dir[i].y));;
                    }
                }
            });
            //攻击范围内，有敌人位置，生成红色边框
            cc.loader.loadRes('Grid_red', cc.Prefab, (res,gridPre) =>{
                for(let i=0; i<4; i++){
                    var curPos = cc.v2(Math.round(msg.Content.x), Math.round(msg.Content.y));
                    var tarPos = cc.v2(Math.round(msg.Content.x + 32 * dir[i].x), Math.round(msg.Content.y + 32 * dir[i].y));
                    if(CheckObstacle(curPos,tarPos) && CheckObject(tarPos) && CheckEnemy(tarPos) == false){
                        var newGridInstance = cc.instantiate(gridPre);
                        newGridInstance.setParent(this.node.getChildByName("图块层 3").getChildByName('GridLayer_Melee'));
                        newGridInstance.position = cc.v2(Math.round(msg.Content.x - 800 + 32 * dir[i].x), Math.round(msg.Content.y - 800 + 32 * dir[i].y));;
                    }
                }
            });
        }
        //近战攻击范围，屋顶版本
        if(msg.Command == MessageType.Show_Target_Melee_Roof){
            var GridLayer_Melee = new cc.Node('GridLayer_Melee');
            var dir: cc.Vec2[] = [cc.v2(0,1),cc.v2(0,-1),cc.v2(-1,0),cc.v2(1,0)];
            GridLayer_Melee.setParent(this.node.getChildByName("图块层 3"));
            //攻击范围内，无敌人位置，生成绿色边框
            cc.loader.loadRes('Grid_green', cc.Prefab, (res,gridPre) =>{
                for(let i=0; i<4; i++){
                    //var curPos = cc.v2(Math.round(msg.Content.x), Math.round(msg.Content.y));
                    var tarPos = cc.v2(Math.round(msg.Content.x + 32 * dir[i].x), Math.round(msg.Content.y + 32 * dir[i].y));
                    if(CheckObstacleRoof(tarPos) && CheckObjectRoof(tarPos) && CheckEnemyRoof(tarPos)){
                        var newGridInstance = cc.instantiate(gridPre);
                        newGridInstance.setParent(this.node.getChildByName("图块层 3").getChildByName('GridLayer_Melee'));
                        newGridInstance.position = cc.v2(Math.round(msg.Content.x - 800 + 32 * dir[i].x), Math.round(msg.Content.y - 800 + 32 * dir[i].y));;
                    }
                }
            });
            //攻击范围内，有敌人位置，生成红色边框
            cc.loader.loadRes('Grid_red', cc.Prefab, (res,gridPre) =>{
                for(let i=0; i<4; i++){
                    //var curPos = cc.v2(Math.round(msg.Content.x), Math.round(msg.Content.y));
                    var tarPos = cc.v2(Math.round(msg.Content.x + 32 * dir[i].x), Math.round(msg.Content.y + 32 * dir[i].y));
                    if(CheckObstacleRoof(tarPos) && CheckObjectRoof(tarPos) && CheckEnemyRoof(tarPos) == false){
                        var newGridInstance = cc.instantiate(gridPre);
                        newGridInstance.setParent(this.node.getChildByName("图块层 3").getChildByName('GridLayer_Melee'));
                        newGridInstance.position = cc.v2(Math.round(msg.Content.x - 800 + 32 * dir[i].x), Math.round(msg.Content.y - 800 + 32 * dir[i].y));;
                    }
                }
            });
        }

        //远程攻击范围
        if(msg.Command == MessageType.Show_Target_Ranged){
            var GridLayer_Ranged = new cc.Node('GridLayer_Ranged');
            var dir: cc.Vec2[] = [cc.v2(0,1),cc.v2(0,-1),cc.v2(-1,0),cc.v2(1,0)];
            GridLayer_Ranged.setParent(this.node.getChildByName("图块层 3"));
            attackRange=[3,3,3,3];
            //攻击范围内，无敌人位置，生成绿色边框
            cc.loader.loadRes('Grid_green', cc.Prefab, (res,gridPre) =>{
                for(let j = 0; j < 4; j++){
                    for(let i = 0; i<3; i++){
                        var curPos = cc.v2(Math.round(msg.Content.x + 32 * (dir[j].x) * i), Math.round(msg.Content.y + 32 * (dir[j].y) * i));
                        var tarPos = cc.v2(Math.round(msg.Content.x + 32 * (dir[j].x) * (i+1)), Math.round(msg.Content.y + 32 * (dir[j].y) * (i+1)));
                        if(CheckObstacle(curPos,tarPos) && CheckObject(tarPos) && CheckEnemy(tarPos)) {
                            var newGridInstance = cc.instantiate(gridPre);
                            newGridInstance.setParent(this.node.getChildByName("图块层 3").getChildByName('GridLayer_Move'));
                            newGridInstance.position = cc.v2(tarPos.x - 800, tarPos.y - 800);
                        }else{
                            attackRange[j] = i;
                            break;
                        }    
                    }
                }
            });
            //攻击范围内，有敌人位置，生成红色边框
            cc.loader.loadRes('Grid_red', cc.Prefab, (res,gridPre) =>{
                for(let i=0; i<4; i++){
                    var curPos = cc.v2(Math.round(msg.Content.x), Math.round(msg.Content.y));
                    var tarPos = cc.v2(Math.round(msg.Content.x + 32 * dir[i].x), Math.round(msg.Content.y + 32 * dir[i].y));
                    if(CheckObstacle(curPos,tarPos) && CheckObject(tarPos) && CheckEnemy(tarPos) == false){
                        var newGridInstance = cc.instantiate(gridPre);
                        newGridInstance.setParent(this.node.getChildByName("图块层 3").getChildByName('GridLayer_Ranged'));
                        newGridInstance.position = cc.v2(Math.round(msg.Content.x - 800 + 32 * dir[i].x), Math.round(msg.Content.y - 800 + 32 * dir[i].y));;
                    }
                }
            });
        }
        
        
        //获取范围
        if(msg.Command == MessageType.Show_Target_Acquire){
            var GridLayer_Acquire = new cc.Node('GridLayer_Acquire');
            var dir: cc.Vec2[] = [cc.v2(0,1),cc.v2(0,-1),cc.v2(-1,0),cc.v2(1,0)];
            GridLayer_Acquire.setParent(this.node.getChildByName("图块层 3"));
            //获取范围内，无物品位置，生成绿色边框
            cc.loader.loadRes('Grid_green', cc.Prefab, (res,gridPre) =>{
                for(let i=0; i<4; i++){
                    var curPos = cc.v2(Math.round(msg.Content.x), Math.round(msg.Content.y));
                    var tarPos = cc.v2(Math.round(msg.Content.x + 32 * dir[i].x), Math.round(msg.Content.y + 32 * dir[i].y));
                    if(CheckObstacle(curPos,tarPos) && CheckObject(tarPos) && CheckEnemy(tarPos)){
                        var newGridInstance = cc.instantiate(gridPre);
                        newGridInstance.setParent(this.node.getChildByName("图块层 3").getChildByName('GridLayer_Acquire'));
                        newGridInstance.position = cc.v2(Math.round(msg.Content.x - 800 + 32 * dir[i].x), Math.round(msg.Content.y - 800 + 32 * dir[i].y));;
                    }
                }
            });
            //获取范围内，有物品位置，生成红色边框
            cc.loader.loadRes('Grid_red', cc.Prefab, (res,gridPre) =>{
                for(let i=0; i<4; i++){
                    var curPos = cc.v2(Math.round(msg.Content.x), Math.round(msg.Content.y));
                    var tarPos = cc.v2(Math.round(msg.Content.x + 32 * dir[i].x), Math.round(msg.Content.y + 32 * dir[i].y));
                    if(CheckObstacle(curPos,tarPos) && CheckObject(tarPos) == false && CheckEnemy(tarPos)){
                        var newGridInstance = cc.instantiate(gridPre);
                        newGridInstance.setParent(this.node.getChildByName("图块层 3").getChildByName('GridLayer_Acquire'));
                        newGridInstance.position = cc.v2(Math.round(msg.Content.x - 800 + 32 * dir[i].x), Math.round(msg.Content.y - 800 + 32 * dir[i].y));;
                    }
                }
            });
        }
        //获取范围，屋顶版本
        if(msg.Command == MessageType.Show_Target_Acquire_Roof){
            var GridLayer_Acquire = new cc.Node('GridLayer_Acquire');
            var dir: cc.Vec2[] = [cc.v2(0,1),cc.v2(0,-1),cc.v2(-1,0),cc.v2(1,0)];
            GridLayer_Acquire.setParent(this.node.getChildByName("图块层 3"));
            //获取范围内，无物品位置，生成绿色边框
            cc.loader.loadRes('Grid_green', cc.Prefab, (res,gridPre) =>{
                for(let i=0; i<4; i++){
                    //var curPos = cc.v2(Math.round(msg.Content.x), Math.round(msg.Content.y));
                    var tarPos = cc.v2(Math.round(msg.Content.x + 32 * dir[i].x), Math.round(msg.Content.y + 32 * dir[i].y));
                    if(CheckObstacleRoof(tarPos) && CheckObjectRoof(tarPos) && CheckEnemyRoof(tarPos)){
                        var newGridInstance = cc.instantiate(gridPre);
                        newGridInstance.setParent(this.node.getChildByName("图块层 3").getChildByName('GridLayer_Acquire'));
                        newGridInstance.position = cc.v2(Math.round(msg.Content.x - 800 + 32 * dir[i].x), Math.round(msg.Content.y - 800 + 32 * dir[i].y));;
                    }
                }
            });
            //获取范围内，有物品位置，生成红色边框
            cc.loader.loadRes('Grid_red', cc.Prefab, (res,gridPre) =>{
                for(let i=0; i<4; i++){
                    //var curPos = cc.v2(Math.round(msg.Content.x), Math.round(msg.Content.y));
                    var tarPos = cc.v2(Math.round(msg.Content.x + 32 * dir[i].x), Math.round(msg.Content.y + 32 * dir[i].y));
                    if(CheckObstacleRoof(tarPos) && CheckObjectRoof(tarPos) && CheckEnemyRoof(tarPos) == false){
                        var newGridInstance = cc.instantiate(gridPre);
                        newGridInstance.setParent(this.node.getChildByName("图块层 3").getChildByName('GridLayer_Acquire'));
                        newGridInstance.position = cc.v2(Math.round(msg.Content.x - 800 + 32 * dir[i].x), Math.round(msg.Content.y - 800 + 32 * dir[i].y));;
                    }
                }
            });
        }

        //销毁范围图层
        if(msg.Command == MessageType.Destroy_Target){
            this.node.getChildByName("图块层 3").destroyAllChildren();
        }
       
        
    }

    // update (dt) {}
}
