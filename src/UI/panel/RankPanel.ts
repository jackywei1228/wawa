class RankPanel extends eui.Component implements IPanel
{
    public isCreated:boolean = false;
    private closeBtn:eui.Button;

    private tabBar:TabBar;
    private viewStack:ViewStack;

    public constructor()
    {
        super();
        this.skinName = "resource/skin/panel/RankPanelSkin.exml";
    }

    public childrenCreated():void
    {
        super.childrenCreated();
        this.isCreated = true;

        this.closeBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );

        this.tabBar.addEventListener( egret.Event.CHANGE,this.onChange,this, false );

        this.onShow();
    }

    private onTap( e:egret.TouchEvent ):void
    {
        SoundMgr.instance.playEffect(Sound.CLICK);
        if( e.target === this.closeBtn )
        {
            UIMgr.instance.closeCurrentPanel();
        }
    }

    private onChange( e:egret.Event ):void
    {
        SoundMgr.instance.playEffect( Sound.CLICK );
        this.viewStack.selectedIndex = this.tabBar.selectedIndex;
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