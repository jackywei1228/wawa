/**
 * Created by Gordon on 2015/10/21.
 */
class User
{
    public userid:number;//用户 ID
    public nick:string;//用户昵称
    public avatar:string;//用户头像
    /**
     * 金币总数
     */
    public point:number;
    /**
     * 奖金总数
     */
    public reward:number;
    /**
     * 佣金总数
     */
    public percentage:number;

    public firstUser:number;
    public secondUser:number;
    public thirdUser:number;

    /**用户分销二维码*/
    public qrcode:string;

    /**用户分销二维码*/
    public saveQrcode:string;

    /**中奖金币数*/
    public amount:number = 0;

    /**兑换是否成功*/
    public exchange:boolean = false;

    /**中奖状态*/
    public status:boolean = false;

    /**站点配置:网站名称*/
    title:string;
    /**站点配置:客服二维码*/
    kefu:string;

    /**支付配置:支付金额，单位元*/
    pay:Array<Pay>;

    game:Array<GameData>;


    private static _instance:User;
    public static get instance():User
    {
        if( null == User._instance )
        {
            User._instance = new User();
        }

        return User._instance;
    }
}