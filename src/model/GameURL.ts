/**
 * Created by Gordon on 2015/10/21.
 */
class GameURL
{
    public static USER:string = window["game_url"] + "/site/config";
    public static PLAY:string = window["game_url"] + "/game/play";
    public static CREATE:string = window["game_url"] + "/pay/create";
    /**奖金兑换接口*/
    public static REWARD:string = window["game_url"] + "/user/exchange/reward";
    /**奖励佣金兑换*/
    public static PERCENTAGE:string = window["game_url"] + "/user/exchange/percentage";
    public static RECORD:string = window["game_url"] + "/user/record";
    public static NOTICE:string = window["game_url"] + "/site/notice";
}