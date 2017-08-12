class ExchangePanel extends eui.Component implements IPanel
{
    public isCreated:boolean = false;

    public fail:eui.Image;
    public success:eui.Image;

    public constructor()
    {
        super();
        this.skinName = "resource/skin/panel/ExchangePanelSkin.exml";
    }

    public childrenCreated():void
    {
        super.childrenCreated();

        this.isCreated = true;

        this.onShow();
    }

    public onShow( ...args:any[] ):void
    {
        if( !this.isCreated )
        {
            return;
        }
        this.fail.visible = !User.instance.exchange;
        this.success.visible = User.instance.exchange;

        this.alpha = 1;
        egret.Tween.get( this ).wait( 2000 ).to( { alpha:0 }, 600 ).call( ()=>{
            UIMgr.instance.closeCurrentPanel( null, null, true );
        }, this );
    }

    public onClose( ...args:any[] ):void
    {
        egret.Tween.removeTweens( this );
    }

    public onUpdate( ...args:any[] ):void
    {

    }
}