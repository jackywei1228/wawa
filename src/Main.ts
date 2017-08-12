class Main extends eui.UILayer
{
    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public createChildren()
    {
        super.createChildren();
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter",assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());

        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage2, this);
    }

    private onAddToStage2(event:egret.Event)
    {
        Layer.STAGE = this.stage;
        Layer.MAIN = this;
        Layer.WIDTH = this.stage.stageWidth;
        Layer.HEIGHT = this.stage.stageHeight;

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        Layer.STAGE.addEventListener( egret.Event.RESIZE, this.onResize2, this );
        RES.getResByUrl( GameURL.USER, this.onUser, this, RES.ResourceItem.TYPE_JSON );
    }
    private onUser(data,url):void
    {
        if( data.code == 0 )
        {//0:成功、其他为错误
            this.isUserLoadEnd = true;
            data = data.data;
            var user = data.user;
            for( var key in user )
            {
                User.instance[key] = user[key];
            }

            User.instance.title = data.site.title;
            User.instance.kefu = data.site.kefu;

            User.instance.pay = data.pay;

            User.instance.game = data.game;
        }
        else
        {
            if( egret.MainContext.runtimeType == egret.MainContext.RUNTIME_HTML5 )
            {
                alert( "获取用户信息,请稍后重试。错误码：" + JSON.stringify( data ) );
            }
        }
    }
    private onResize2( e:egret.Event ):void
    {
        var change:boolean = false;
        if( Layer.WIDTH != this.stage.stageWidth )
        {
            Layer.WIDTH = this.stage.stageWidth;
            change = true;
        }
        if( Layer.HEIGHT != this.stage.stageHeight )
        {
            Layer.HEIGHT = this.stage.stageHeight;
            change = true;
        }
        if( change )
        {
            Layer.execute();
        }
    }
    private onConfigComplete(event:RES.ResourceEvent):void
    {
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.once(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
    }

    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the
     */
    private onThemeLoadComplete( e:egret.Event): void
    {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

        RES.loadGroup( GroupName.preload );
    }
    private isResourceLoadEnd:boolean = false;
    private isUserLoadEnd:boolean = false;

    private onResourceLoadComplete(event:RES.ResourceEvent):void
    {
        if( event.groupName == GroupName.preload )
        {
            this.loadingView = new LoadingUI();
            this.stage.addChild(this.loadingView);
            RES.loadGroup( GroupName.game );
        }
        else if( event.groupName == GroupName.game )
        {
            this.loadingView.onClose();
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createGameScence();
        }
    }

    private onItemLoadError(event:RES.ResourceEvent):void
    {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    private onResourceLoadError(event:RES.ResourceEvent):void
    {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onResourceLoadComplete(event);
    }

    private onResourceProgress(event:RES.ResourceEvent):void
    {
        if( event.groupName == GroupName.game )
        {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private createGameScence():void
    {
        if( !this.isResourceLoadEnd || !this.isUserLoadEnd )
        {
            return;
        }
        Layer.MAIN.addChild( Layer.SCENE_LAYER );
        Layer.MAIN.addChild( Layer.PANEL_LAYER );
        Layer.MAIN.addChild( new GameScence() );
    }
}