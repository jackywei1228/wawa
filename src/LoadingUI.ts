class LoadingUI extends eui.Component
{
    public isCreated:boolean = false;

    private textField:eui.Label;
    public topTip:eui.Image;
    public bottomTip:eui.Image;
    public loadBarMask:eui.Rect;
    public loadBar:eui.Image;

    public constructor()
    {
        super();
        this.once( eui.UIEvent.COMPLETE,this.onComplete,this );
        this.skinName = "resource/skin/panel/LoadingUISkin.exml";
    }

    private intervalId:number;
    public childrenCreated():void
    {
        super.childrenCreated();
        this.loadBar.mask = this.loadBarMask;
        this.isCreated = true;
    }

    private onComplete( e:eui.UIEvent ):void
    {
        this.intervalId = egret.setInterval( this.onTimeout, this, 2000 );
    }
    private bottomSource:Array<string> = [ "loading_zi5_png", "loading_zi2_2_png", "loading_zi3_png", "loading_zi4_png", "loading_zi6_png" ];

    private bottomIdx:number = 0;
    private onTimeout():void
    {
        this.bottomIdx++;
        if( this.bottomIdx >= this.bottomSource.length )
        {
            this.bottomIdx = 0;
        }
        this.bottomTip.source = this.bottomSource[ this.bottomIdx ];
    }

    public onClose():void
    {
        egret.clearInterval( this.intervalId );
    }
    public setProgress(current: number, total: number): void
    {
        if( !this.isCreated )
        {
            return;
        }
        var per:number = current/total;
        this.loadBarMask.width = 381 * per;
        var percent:string = (per*100).toFixed(2);
        this.textField.text = `${percent}%`;
    }
}
