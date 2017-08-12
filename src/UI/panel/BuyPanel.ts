class BuyPanel extends eui.Component implements IPanel
{
    public isCreated:boolean = false;

    public bg:eui.Image;
    public closeBtn:eui.Button;
    public buy5Btn:eui.Image;
    public buy10Btn:eui.Image;
    public buy20Btn:eui.Image;
    public buy50Btn:eui.Image;
    public buy100Btn:eui.Image;
    public buy200Btn:eui.Image;

    public constructor()
    {
        super();
        this.skinName = "resource/skin/panel/BuyPanelSkin.exml";
    }

    public childrenCreated():void
    {
        super.childrenCreated();
        this.isCreated = true;

        this.bg.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
        this.closeBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
        this.buy5Btn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
        this.buy10Btn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
        this.buy20Btn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
        this.buy50Btn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
        this.buy100Btn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
        this.buy200Btn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );

        this.onShow();
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

    private onTap( e:egret.TouchEvent ):void
    {
        SoundMgr.instance.playEffect(Sound.CLICK);
        if( e.target === this.closeBtn )
        {
            UIMgr.instance.closeCurrentPanel();
            return;
        }
        var amount:number;
        if( e.target === this.buy5Btn )
        {
            amount = 5;
        }
        else if( e.target === this.buy10Btn )
        {
            amount = 10;
        }
        else if( e.target === this.buy20Btn )
        {
            amount = 20;
        }
        else if( e.target === this.buy50Btn )
        {
            amount = 50;
        }
        else if( e.target === this.buy100Btn )
        {
            amount = 100;
        }
        else if( e.target === this.buy200Btn )
        {
            amount = 200;
        }
        window.location.href = GameURL.CREATE + `?amount=${amount}`;
    }
}