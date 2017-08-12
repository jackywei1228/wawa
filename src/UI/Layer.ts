import DisplayObjectContainer = egret.DisplayObjectContainer;
import Component = eui.Component;
/**
 * Created by Gordon on 2015/9/14.
 */
class Layer
{
    public static STAGE:egret.Stage;
    public static MAIN:Main;
    public static SCENE_LAYER:Component =  new Component();
    public static PANEL_LAYER:Component =  new Component();
    public static WIDTH:number;
    public static HEIGHT:number;
    public static RESIZE:Array<any> = [];

    /**
     * 添加界面屏幕自适应
     * @param name
     * @param func
     * @param thisObj
     */
    public static addResize( name:string, func:Function, thisObj:any ):void
    {
        Layer.RESIZE.push( { "name":name, "func":func, "thisObj":thisObj } );
    }
    public static removeResize( name:string ):void
    {
        for( var i = 0; i < Layer.RESIZE.length; i++ )
        {
            if( Layer.RESIZE[ i ].name == name )
            {
                Layer.RESIZE.splice( i, 1 );
                return;
            }
        }
    }
    public static execute():void
    {
        UIMgr.instance.closeCurrentPanel( null, null, true );
        UIMgr.instance.reset();
        UIMgr.instance.resetWin();
        for( var i = 0; i < Layer.RESIZE.length; i++ )
        {
            Layer.RESIZE[ i ].func.apply( Layer.RESIZE[ i ].thisObj );
        }
    }
}