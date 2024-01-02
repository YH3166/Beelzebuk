import ComponentBase from "./ComponentBase";
import MessageCenter from "./MessageCenter";
import Message, { MessageType } from "./Message";
import UIManager from "./UIManager";
import { player1 } from "./playerControl";
import { PropertyName } from "./PropertyItem";
const {ccclass, property} = cc._decorator;

@ccclass
export default class ControllerManagement extends ComponentBase {

    Controller_Left(){
        MessageCenter.SendCustomMessage(MessageType.Type_Player, MessageType.Player_Move, 'left');
        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Controller_Restore, '');
        this.node.getChildByName('WSAD').getChildByName('Left Button').getComponent(cc.Button).interactable = false;
        this.scheduleOnce(() => {
            this.node.getChildByName('WSAD').getChildByName('Left Button').getComponent(cc.Button).interactable = true;
        }, 0.5);
    }

    Controller_Right(){
        MessageCenter.SendCustomMessage(MessageType.Type_Player, MessageType.Player_Move, 'right');
        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Controller_Restore, '');
        this.node.getChildByName('WSAD').getChildByName('Right Button').getComponent(cc.Button).interactable = false;
        this.scheduleOnce(() => {
            this.node.getChildByName('WSAD').getChildByName('Right Button').getComponent(cc.Button).interactable = true;
        }, 0.5);
    }
    
    Controller_Up(){
        MessageCenter.SendCustomMessage(MessageType.Type_Player, MessageType.Player_Move, 'up');
        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Controller_Restore, '');
        this.node.getChildByName('WSAD').getChildByName('Up Button').getComponent(cc.Button).interactable = false;
        this.scheduleOnce(() => {
            this.node.getChildByName('WSAD').getChildByName('Up Button').getComponent(cc.Button).interactable = true;
        }, 0.5);
    }

    Controller_Down(){
        MessageCenter.SendCustomMessage(MessageType.Type_Player, MessageType.Player_Move, 'down');
        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Controller_Restore, '');
        this.node.getChildByName('WSAD').getChildByName('Down Button').getComponent(cc.Button).interactable = false;
        this.scheduleOnce(() => {
            this.node.getChildByName('WSAD').getChildByName('Down Button').getComponent(cc.Button).interactable = true;
        }, 0.5);
    }

    Controller_Attack(){
        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Controller_Restore, '');
        this.node.getChildByName('Attack_Cancel Button').getChildByName('Attack Button').active = false;
        if(!player1.weapon){
            MessageCenter.SendCustomMessage(MessageType.Type_Player, MessageType.Show_Target,'attack');
        } else if(player1.weapon.length == 1) {
            MessageCenter.SendCustomMessage(MessageType.Type_Player, MessageType.Show_Target,'attack1');
        } else if(player1.weapon.length == 2){
            this.Controller_Hide();
            this.node.getChildByName('Weapon').active = true;
            MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_HideAndShow,'hide');
            this.node.getChildByName('Weapon').getChildByName('Weapon1').getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = PropertyName[player1.weapon[0]];
            this.node.getChildByName('Weapon').getChildByName('Weapon2').getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = PropertyName[player1.weapon[1]];
        } 
    }

    Controller_Attack_Weapon1(){
        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Controller_Restore, '');
        this.node.getChildByName('Attack_Cancel Button').getChildByName('Attack Button').active = false;
        MessageCenter.SendCustomMessage(MessageType.Type_Player, MessageType.Show_Target,'attack1');
    }

    Controller_Attack_Weapon2(){
        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Controller_Restore, '');
        this.node.getChildByName('Attack_Cancel Button').getChildByName('Attack Button').active = false;
        MessageCenter.SendCustomMessage(MessageType.Type_Player, MessageType.Show_Target,'attack2');
    }

    Controller_Move(){
        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Controller_Restore, '');
        MessageCenter.SendCustomMessage(MessageType.Type_Player, MessageType.Show_Target,'move');
        this.node.getChildByName('Move_Cancel Button').getChildByName('Move Button').active = false;
    }

    Controller_Acquire(){
        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Controller_Restore, '');
        MessageCenter.SendCustomMessage(MessageType.Type_Player, MessageType.Show_Target,'acquire');
        this.node.getChildByName('Acquire_Cancel Button').getChildByName('Acquire Button').active = false;
    }

    Controller_Character(){
        //MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Controller_Restore, '');
        MessageCenter.SendCustomMessage(MessageType.Type_Char, MessageType.Character_Menu,'open');
        MessageCenter.SendCustomMessage(MessageType.Type_Char, MessageType.Char_Menu_Update, '');
    }

    Controller_EndTurn(){
        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Controller_Restore, '');
        MessageCenter.SendCustomMessage(MessageType.Type_Player, MessageType.Player_New_Turn, '');
    }

    Controller_Cancel(){
        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Controller_Restore, '');
    }

    Controller_Hide(){
        this.node.children.forEach(child => {
            child.active = false;
            //child.children.forEach(kid => {
            //    kid.active = false;
            //})
        })
    }

    Controller_Show(){
        this.node.children.forEach(child => {
            child.active = true;
            child.children.forEach(kid => {
                kid.active = true;
            })
        })
        MessageCenter.SendCustomMessage(MessageType.Type_Char, MessageType.Character_Menu,'close');
        this.node.getChildByName('Weapon').active = false;
    }

    Controller_Restore(){
        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Destroy_Target, '');
            this.node.children.forEach(child => {
                child.children.forEach(chil =>{
                    chil.active = true;
                })
                child.active = true;
            })
            this.node.getChildByName('Weapon').active = false;
            MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_HideAndShow, 'show');
    }

    start () {
        UIManager.Instance.RegisterReceiver(this);
        this.node.getChildByName('Weapon').active = false;
    }

    ReceiveMessage(msg: Message){
        super.ReceiveMessage(msg);
        if(msg.Command == MessageType.UI_Controller_Restore){
            this.Controller_Restore();
        }

        if(msg.Command == MessageType.UI_Disable){
            if(msg.Content == 'move'){
                this.node.getChildByName('WSAD').children.forEach(child => {
                    child.getComponent(cc.Button).interactable = false;
                })
                this.node.getChildByName('Move_Cancel Button').getChildByName('Move Button').getComponent(cc.Button).interactable = false;
            }
            if(msg.Content == 'action'){
                this.node.getChildByName('Acquire_Cancel Button').getChildByName('Acquire Button').getComponent(cc.Button).interactable = false;
                MessageCenter.SendCustomMessage(MessageType.Type_Char, MessageType.Char_Action, 'disable');
            }
            if(msg.Content == 'attack'){
                this.node.getChildByName('Attack_Cancel Button').getChildByName('Attack Button').getComponent(cc.Button).interactable = false;
            }
        }

        if(msg.Command == MessageType.UI_Enable){
            if(msg.Content == 'move'){
                this.node.getChildByName('WSAD').children.forEach(child => {
                    child.getComponent(cc.Button).interactable = true;
                })
                this.node.getChildByName('Move_Cancel Button').getChildByName('Move Button').getComponent(cc.Button).interactable = true;
            }
            if(msg.Content == 'action'){
                this.node.getChildByName('Acquire_Cancel Button').getChildByName('Acquire Button').getComponent(cc.Button).interactable = true;
                MessageCenter.SendCustomMessage(MessageType.Type_Char, MessageType.Char_Action, 'enable');
            }
            if(msg.Content == 'attack'){
                this.node.getChildByName('Attack_Cancel Button').getChildByName('Attack Button').getComponent(cc.Button).interactable = true;
            }
        }
    }

    update (dt) {
        this.node.x = cc.Camera.main.node.x;
        this.node.y = cc.Camera.main.node.y;
    }
}
