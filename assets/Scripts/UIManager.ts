import ManagerBase from "./ManagerBase";
import { MessageType } from "./Message";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIManager extends ManagerBase {
    static Instance: UIManager;

    onLoad () {
        super.onLoad();
        UIManager.Instance = this;
    }

    //start () {
    //    cc.loader.loadRes('Character_Menu', cc.Prefab, (res,charMenuPre) =>{
    //        let Character_Menu: cc.Node = cc.instantiate(charMenuPre);
    //        Character_Menu.setParent(this.node);
    //        Character_Menu.active = false;
    //    });
    //}

    SetMessageType(): number {
        return MessageType.Type_UI;
    }
    
}
