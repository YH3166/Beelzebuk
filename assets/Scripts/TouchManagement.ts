import ComponentBase from "./ComponentBase";
import MessageCenter from "./MessageCenter";
import Message, { MessageType } from "./Message";
import { getMoveRange } from "./MapManagement";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TouchManager extends ComponentBase {


    start () {
        //监听触摸事件并按照触摸点的location决定事件结算
        this.node.on(cc.Node.EventType.TOUCH_START,(event)=>{
            //监听近程攻击目标
            if(this.node.getChildByName("图块层 3").getChildByName('GridLayer_Melee')){
                var touchLocationToPlayer = cc.v2(this.node.convertToNodeSpaceAR(event.getLocation()).x+320,this.node.convertToNodeSpaceAR(event.getLocation()).y+480);
                MessageCenter.SendCustomMessage(MessageType.Type_Player, MessageType.Player_Attack_Melee, touchLocationToPlayer);
            }
            //监听远程攻击目标
            if(this.node.getChildByName("图块层 3").getChildByName('GridLayer_Ranged')){
                var touchLocationToPlayer = cc.v2(this.node.convertToNodeSpaceAR(event.getLocation()).x+320,this.node.convertToNodeSpaceAR(event.getLocation()).y+480);
                MessageCenter.SendCustomMessage(MessageType.Type_Player, MessageType.Player_Attack_Ranged, touchLocationToPlayer);
            }
            //监听直线移动目标
            if(this.node.getChildByName("图块层 3").getChildByName('GridLayer_Move')){
                var touchLocationToPlayer = cc.v2(this.node.convertToNodeSpaceAR(event.getLocation()).x+320,this.node.convertToNodeSpaceAR(event.getLocation()).y+480);
                //确认监听目标是否在移动范围内
                var moveRange = getMoveRange();
                var moveStep: number[] = [0,0,0,0];
                //var dir: cc.Vec2[] = [cc.v2(0,1),cc.v2(0,-1),cc.v2(-1,0),cc.v2(1,0)];
                //for(let j = 0; j < 4; j++){
                //}
                //向上移动
                if(touchLocationToPlayer.x<32 && touchLocationToPlayer.x>0 && touchLocationToPlayer.y < 32 + moveRange[0]*32 && touchLocationToPlayer.y > 32){
                    moveStep[0] = Math.ceil((touchLocationToPlayer.y - 32)/32);
                    MessageCenter.SendCustomMessage(MessageType.Type_Player, MessageType.Player_Move_in_Line, moveStep);
                }
                //向下移动
                if(touchLocationToPlayer.x<32 && touchLocationToPlayer.x>0 && touchLocationToPlayer.y < 0 && touchLocationToPlayer.y > 0 - moveRange[1]*32){
                    moveStep[1] = Math.ceil(-touchLocationToPlayer.y/32);
                    MessageCenter.SendCustomMessage(MessageType.Type_Player, MessageType.Player_Move_in_Line, moveStep);
                }
                //向左移动
                if(touchLocationToPlayer.x<0 && touchLocationToPlayer.x> - moveRange[2]*32 && touchLocationToPlayer.y < 32 && touchLocationToPlayer.y > 0){
                    moveStep[2] = Math.ceil(-(touchLocationToPlayer.x)/32);
                    MessageCenter.SendCustomMessage(MessageType.Type_Player, MessageType.Player_Move_in_Line, moveStep);
                }                
                //向右移动
                if(touchLocationToPlayer.x<32+moveRange[3]*32 && touchLocationToPlayer.x>32 && touchLocationToPlayer.y < 32 && touchLocationToPlayer.y > 0){
                    moveStep[3] = Math.ceil((touchLocationToPlayer.x - 32)/32);
                    MessageCenter.SendCustomMessage(MessageType.Type_Player, MessageType.Player_Move_in_Line, moveStep);
                }                
            }
        });
    }

    // update (dt) {}
}
