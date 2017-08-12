/**
 * Created by Gordon on 14/12/22.
 *
 * ui、视图管理类
 */
class UIMgr
{
    private static mgr:UIMgr;
    private panelArray:Array<IPanel> = new Array( PanelName.PANEL_NUM );

    private args:any[];
    private win:IPanel;

    private _isShow:boolean = false;

    public static get instance():UIMgr
    {
        if( null == UIMgr.mgr )
        {
            PanelName.init();
            UIMgr.mgr = new UIMgr();
        }
        return UIMgr.mgr;
    }

    private _sprite:egret.Sprite;
    private TouchLayerName:string = "TouchLayer";

    private get touchLayer():egret.Sprite
    {
        if( null != this._sprite )
        {
            return this._sprite;
        }

        this.reset();
        return this._sprite;
    }

    public reset():void
    {
        this._sprite = new egret.Sprite();
        this._sprite.name = this.TouchLayerName;
        this._sprite.touchEnabled = true;
        this._sprite.touchChildren = true;
        var g:egret.Graphics = this._sprite.graphics;
        g.beginFill( 0x000000, 0.5 );
        g.drawRect( 0, 0, Layer.WIDTH, Layer.HEIGHT );
        g.endFill();

        this._sprite.width = Layer.WIDTH;
        this._sprite.height = Layer.HEIGHT;
        UIUtil.setAnchor( this._sprite );
    }

    public resetWin():void
    {
        var length:number = this.panelArray.length;
        for( var i:number = 0; i < length; i++ )
        {
            var win:any = this.panelArray[ i ];
            if( null != win )
            {
                win.x = Layer.WIDTH>>1;
                win.y = Layer.HEIGHT>>1;
            }
        }
    }

    public getPanel( panelName:number ):any
    {
        var win:any = this.panelArray[ panelName ];
        if( null == win )
        {
            win = new PanelName.PANEL_CLASS[ panelName ]();
            this.panelArray[ panelName ] = win;
            win.initialized = false;
            win.addEventListener( eui.UIEvent.CREATION_COMPLETE, this.onCreated, this );
        }
        return win;
    }

    /**
     * ...args:any[] IPane 面板onShow传入的参数
     */
    public show( panelName:number, ...args:any[] ):void
    {
        this.win = this.getPanel( panelName );

        if( null == this.win )
        {
            return;
        }
        //判断界面当前是否已经弹出面板，如果有则先消除
        this.closeCurrentPanel( null, null, true );
        this.args = args;
        this.doShow();
    }

    /**
     * 移除弹窗
     * @param evt
     */
    private closeWindHandler( e:egret.TouchEvent ):void
    {
        var target:any = e.target;
        if( null == target )
        {
            return;
        }
        if( target.name != this.TouchLayerName )
        {
            return;
        }

        SoundMgr.instance.playEffect( Sound.CLICK );
        this.closeCurrentPanel();
    }

    /**
     * 关闭当前窗口
     * @param callback
     *          关闭后回调方法
     * @param closeNow
     *          是否直接关闭，不变小
     */
    public closeCurrentPanel( callback?:Function, thisArg?:any, closeNow:boolean = false ):void
    {
        var target:egret.Sprite = this.touchLayer;
        if( null == target.parent )
        {
            if( null == callback )
            {
                return;
            }
            callback.call( thisArg );
            return;
        }
        if( 0 == target.numChildren )
        {
            if( null == callback )
            {
                return;
            }
            callback.call( thisArg );
            return;
        }

        target.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.closeWindHandler, this );
        //console.log( "----删除面板关闭事件。" );

        this.removePanel( closeNow );
        if( null == callback )
        {
            return;
        }
        callback.call( thisArg );
    }

    private removePanel( closeNow:boolean ):void
    {
        var sprite:egret.Sprite = this.touchLayer;
        if( null == sprite.parent )
        {
            return;
        }
        var child:any = sprite.getChildAt( 0 );
        if( null != child )
        {
            if( closeNow )
            {
                sprite.removeChild( child );
                Layer.PANEL_LAYER.removeChild( sprite );
                this._isShow = false;
                child.onClose();
                return;
            }

            egret.Tween.get( child ).to( { scaleX:0, scaleY:0 }, 200 ).call( ()=>{
                if( null != child.parent )
                {
                    sprite.removeChild( child );
                    Layer.PANEL_LAYER.removeChild( sprite );
                    this._isShow = false;
                    child.onClose();
                }
            });
            return;
        }
        Layer.PANEL_LAYER.removeChild( sprite );
        this._isShow = false;
    }

    public get isShow():boolean
    {
        return this._isShow;
    }
    private doShow():void
    {
        var content:any = this.win;
        var sprite:egret.Sprite = this.touchLayer;

        content.scaleX = content.scaleY = 0.1;

        sprite.addChild( content );

        this.win.onShow.apply( this.win, this.args );

        this.touchLayer.addEventListener( egret.TouchEvent.TOUCH_TAP, this.closeWindHandler, this );
        //console.log( "++++添加面板关闭事件。" );

        this._isShow = true;
        if( content.initialized )
        {
            Layer.PANEL_LAYER.addChild( sprite );
            egret.Tween.get( content ).to( { scaleX:1, scaleY:1 }, 240, egret.Ease.backOut );
        }
        else
        {
            // LoadStartUI.instance.addLoadUI();
            content.visible = false;
            Layer.PANEL_LAYER.addChild( sprite );
        }
    }

    private onCreated( e:eui.UIEvent ):void
    {
        var win = e.currentTarget;
        UIUtil.setAnchor( win, false );

        WindowAdapter.FullScreenCenter( win );

        // LoadStartUI.instance.removeLoadUI();

        win.removeEventListener( eui.UIEvent.CREATION_COMPLETE, this.onCreated, this );
        win.initialized = win.visible = true;
        egret.Tween.get( win ).to( { scaleX:1, scaleY:1 }, 240, egret.Ease.backOut );
    }
}