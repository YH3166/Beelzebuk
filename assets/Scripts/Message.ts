const {ccclass, property} = cc._decorator;

@ccclass
export default class Message {
    //类型
    Type: MessageType;
    //小类/命令
    Command: MessageType;
    //参数
    Content: any;

    //构造方法
    constructor(type, command, content){
        this.Type = type;
        this.Command = command;
        this.Content = content;
    }
}

export enum MessageType{
    Type_Char,
    Type_UI,
    Type_Player,
    Type_NPC,
    Type_Audio,
    Char_Action,
    Char_Ability,
    Char_Ability_Des,
    Char_Equipment,
    Char_Equipment_Des,
    Char_Prop,
    Char_Prop_Des,
    Char_Menu_Restore,
    Char_Menu_Update,
    UI_Controller_Restore,
    UI_Update,
    UI_Disable,
    UI_Enable,
    UI_HideAndShow,
    Player_Update,
    Player_New_Turn,
    Player_Move,
    Player_Move_Roof,
    Player_Move_in_Line,
    Player_Move_in_Line_Roof,
    Player_Attack_Melee,
    Player_Attack_Melee_Roof,
    Player_Attack_Ranged,
    Player_Attack_Ranged_Roof,
    Show_Target,
    Show_Target_Melee,
    Show_Target_Melee_Roof,
    Show_Target_Ranged,
    Show_Target_Ranged_Roof,
    Show_Target_Move,
    Show_Target_Move_Roof,
    Show_Target_Acquire,
    Show_Target_Acquire_Roof,
    Map_Update_Obstacle,
    Map_Ladder_Up,
    Map_Ladder_Down,
    Destroy_Target,
    Character_Menu
} 