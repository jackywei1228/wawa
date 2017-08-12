class ShopPanel extends eui.Component implements IPanel
{
    public isCreated:boolean = false;
    private closeBtn:eui.Button;

    public buy5Btn:eui.Image;
    public buy10Btn:eui.Image;
    public buy20Btn:eui.Image;
    public buy50Btn:eui.Image;

    public constructor()
    {
        super();
        this.skinName = "resource/skin/panel/ShopPanelSkin.exml";
    }

    public childrenCreated():void
    {
        super.childrenCreated();
        this.isCreated = true;

        this.closeBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );

        this.buy5Btn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
        this.buy10Btn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
        this.buy20Btn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
        this.buy50Btn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );

        this.onShow();
    }

    private onTap( e:egret.TouchEvent ):void
    {
        SoundMgr.instance.playEffect(Sound.CLICK);
        if( e.target === this.closeBtn )
        {
            UIMgr.instance.closeCurrentPanel();
        }
        else
        {
            DataLoader.instance.post( GameURL.PERCENTAGE, null, this.onPercentage, this );
        }
    }

    private onPercentage(data,url:string ):void
    {
        UIMgr.instance.closeCurrentPanel( null, null, true );
        if( data.code == 0 )
        {//0:成功、其他为错误
            User.instance.exchange = true;
            Scence1.instance.exchangeGold.text = "0";
        }
        else
        {
            User.instance.exchange = false;
            alert( data.errMsg )
        }
        UIMgr.instance.show( PanelName.ExchangePanel );
    }
    public onShow( ...args:any[] ):void
    {
        if( args.length > 1 )
        {

        }
        if( !this.isCreated )
        {
            return;
        }

    }

    public onClose( ...args:any[] ):void
    {

    }

    public onUpdate( ...args:any[] ):void
    {

    }
}