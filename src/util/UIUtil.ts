/**
 * Created by Gordon on 2015/9/17.
 */
class UIUtil
{
	public static setAnchor( ui:egret.DisplayObject, movePos:boolean = true ):void
	{
        var width:number = ui.width >> 1;
        var height:number = ui.height >> 1;

        ui.anchorOffsetX = width;
        ui.anchorOffsetY = height;

        if( movePos )
        {
            ui.x += width;
            ui.y += height;
        }
	}
	public static setAnchor2( ui:egret.DisplayObject, movePos:boolean = true ):void
	{
        var width:number = ui.width >> 1;
        var height:number = ui.height >> 1;

        ui.anchorOffsetX = width;
        ui.anchorOffsetY = height;

        if( movePos )
        {
            ui.x += ( width * ui.scaleX );
            ui.y += ( width * ui.scaleY );
        }
	}

    /**
     * 是否ui有包含关系
     */
    public static partOf( parent:egret.DisplayObject, child:egret.DisplayObject ):boolean
    {
        var up = child;
        while( null != up )
        {
            if( parent === up )
            {
                return true;
            }
            up = up.parent;
        }

        return false;
    }

    /**
     * @param displayObject
     * @param state1
     * @param state2
     * @param time
     * @param num   循环次数；只能传入 >= 0; 默认0，循环无限次；
     * @param callback  num 循环次数结束后，执行回调方法
     */
    public static loopTween( displayObject:egret.DisplayObject, state1:Object, state2:Object,
                             time:number = 200, num:number = 1, callback:Function = null, thisObject:any = null ):void
    {
        egret.Tween.removeTweens( displayObject );
        onComplete();

        function onComplete()
        {
            if( 0 == num )
            {
                tween();
                return;
            }

            if( 1 == num )
            {
                num = -1;
                tween();
                return;
            }

            if( num < 0 )
            {
                if( null != callback )
                {
                    callback.apply( thisObject );
                }
                return;
            }

            num--;
            tween();
        }

        function tween()
        {
            egret.Tween.get( displayObject ).to( state1, time ).to( state2, time ).call( onComplete );
        }
    }
}