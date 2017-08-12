/**
 * @author: dansen
 * @date: 2015-03-20 14:44:42
 * @desc: 布局接口
 */
class WindowAdapter
{
    private static width = 720;
    private static height = 1280;
    /**
     * @param panelUI 适配层,panelUI.group居中
     * @param ifCenter 此panelUI是否需要居中
     */
    public static resizePanel( panelUI )
    {
        if( Layer.WIDTH > WindowAdapter.width )
        {
            panelUI.width = Layer.WIDTH;
        }
        else
        {
            panelUI.height = Layer.HEIGHT;
        }
    }

    public static FullScreen( black ):void
    {
        if( Layer.WIDTH > WindowAdapter.width )
        {
            black.scaleX = Layer.WIDTH / WindowAdapter.width;
        }
        else
        {
            black.scaleY = Layer.HEIGHT / WindowAdapter.height;
        }
    }

    /**
     * 停靠在左边，距离左边距intervalX个像素
     * @param  {CCNode} node  已经设置中心锚点的节点
     * @param  {int} intervalX 边距
     * @return {null}           无
     */
    public static dockLeft( node, intervalX = 0, isCenter = false )
    {
        intervalX = intervalX | 0;
        var parent = node.parent;

        if( isCenter )
        {
            node.x = intervalX + node.width / 2;
            node.y = parent.height / 2 - node.height / 2;
        }
        else
        {
            node.x = intervalX + node.width / 2;
        }
    }

    /**
     * 停靠在右边，距离右边距intervalX个像素
     * @param  {CCNode} node  已经设置中心锚点的节点
     * @param  {int} intervalX 边距
     * @return {null}           无
     */
    public static dockRight( node, intervalX = 0, isCenter = false )
    {
        intervalX = intervalX | 0;
        var parent = node.parent;

        if( isCenter )
        {
            node.x = parent.width - node.width / 2 - intervalX;
            node.y = parent.height / 2 - node.height / 2;
        }
        else
        {
            node.x = parent.width - node.width / 2 - intervalX;
        }
    }

    /**
     * 停靠在上边，距离上边距intervalY个像素
     * @param  {CCNode} node 已经设置中心锚点的节点
     * @param  {int} intervalX 边距
     * @return {null}           无
     */
    public static dockTop( node, intervalY, isCenter = false )
    {
        intervalY = intervalY | 0;
        var parent = node.parent;
        if( isCenter )
        {
            node.x = parent.width / 2 - node.width / 2;
            node.y = intervalY + node.height / 2;
        }
        else
        {
            node.y = intervalY + node.height / 2;
        }
    }

    /**
     * 停靠在下边，距离下边距intervalY个像素
     * @param  {CCNode} node  已经设置中心锚点的节点
     * @param  {int} intervalX 边距
     * @return {null}           无
     */
    public static dockBottom( node:egret.DisplayObject, intervalY = 0, isCenter = false ):void
    {
        var parent = node.parent;
        if( isCenter )
        {
            node.x = parent.width / 2;
            node.y = parent.height - node.height / 2 - intervalY;
        }
        else
        {
            node.y = parent.height - node.height / 2 - intervalY;
        }
    }

    /**
     * 停靠在中心
     * @param  {CCNode} node  节点
     * @return {null} 无
     */
    public static dockCenter( node )
    {
        UIUtil.setAnchor( node );
        var parent = node.parent;
        node.x = parent.width>>1;
        node.y = parent.height>>1;
    }
    public static FullScreenCenter( node )
    {
        UIUtil.setAnchor( node );
        node.x = Layer.WIDTH>>1;
        node.y = Layer.HEIGHT>>1;
    }

    /**
     * 向上叠加
     * @param  {CCNode} node      节点
     * @param  {int} count 总数量
     * @param  {int} width 元素宽度
     * @param  {int} index 第几个
     * @return {null}       无
     */
    public static dockChipVertical( node, index )
    {
        node.x = 3;
        node.y = 78 - index * 2;
    }
}