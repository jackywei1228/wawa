class StartTipPanel extends eui.Component implements IPanel
{
    public isCreated:boolean = false;


    public constructor()
    {
        super();
        this.alpha = 0;
        this.skinName = "resource/skin/panel/StartTipPanelSkin.exml";
    }

    public childrenCreated():void
    {
        super.childrenCreated();

        this.isCreated = true;

        this.onShow();
    }
    public onShow( ...args:any[] ):void
    {
        egret.Tween.get( this ).to( { alpha:1 }, 600 ).wait( 800 ).to( { alpha:0 }, 600 ).call( ()=>{
            UIMgr.instance.closeCurrentPanel( null, null, true );
        }, this );
    }

    public onClose( ...args:any[] ):void
    {

    }

    public onUpdate( ...args:any[] ):void
    {

    }
}