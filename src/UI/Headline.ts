import ResourceItem = RES.ResourceItem;
/**
 * Created by Gordon on 18/05/2017.
 */
class Headline extends eui.Component
{
    public content:eui.Group;
    public icon:eui.Image;
    public desc:eui.Label;
    public maskRect:eui.Rect;
    public notice:Array<Notice>;

    public constructor()
    {
        super();
        this.once(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/skin/ui/HeadlineSkin.exml";
    }

    private onComplete(): void
    {
        egret.setInterval( this.onInterval, this, 2000 );
    }
    private index = 0;
    private onInterval():void
    {
        if( null == this.notice || this.notice.length <= 0 )
        {
            DataLoader.instance.post( GameURL.NOTICE, null, this.onNotice, this );
            return;
        }
        this.content.y = 40;
        var notice:Notice = this.notice[ this.index ];
        RES.getResByUrl( notice.avatar, ( data,url )=>{
            this.icon.source = data;
            // this.icon.source = "touxiang05_png";
        }, this, ResourceItem.TYPE_IMAGE );
        this.desc.text = notice.content;
        this.index++;
        egret.Tween.removeTweens( this.content );
        egret.Tween.get( this.content ).to( {y:0}, 500 ).wait( 1000 ).to( {y:-40}, 500 );
        if( this.index == this.notice.length )
        {
            this.index = 0;
            DataLoader.instance.post( GameURL.NOTICE, null, this.onNotice, this );
        }
    }

    private onNotice( data,url:string ):void
    {
        if( data.code == 0 )
        {//0:成功、其他为错误
            data = data.data;
            this.notice = data.item;
        }
        else
        {
            if( egret.MainContext.runtimeType == egret.MainContext.RUNTIME_HTML5 )
            {
                alert( "获取用户信息,请稍后重试。错误码：" + JSON.stringify( data ) );
            }
        }
    }
    protected createChildren(): void
    {
        super.createChildren();
        this.content.mask = this.maskRect;
        this.content.y = 40;
    }
}