/**
 * Created by Gordon on 2015/10/21.
 */
class SoundMgr
{
    private static _instance:SoundMgr;

    public bgSound:egret.Sound;
    private bgChannel:egret.SoundChannel;
    private isBgPlay:boolean = false;

    private audioCache:Object = {};

    public static get instance():SoundMgr
    {
        if( null == SoundMgr._instance )
        {
            SoundMgr._instance = new SoundMgr();
        }

        return SoundMgr._instance;
    }

    public playBgSound():void
    {
        if( this.isBgPlay )
        {
            return;
        }
        this.isBgPlay = true;
        if( null == this.bgSound )
        {
            return;
        }
        this.bgChannel = this.bgSound.play();
    }

    public stopBgSound():void
    {
        if( null == this.bgSound || null == this.bgChannel )
        {
            return;
        }
        if( this.isBgPlay )
        {
            this.isBgPlay = false;
            this.bgChannel.volume = 0;
        }
    }

    /**
     * @param mp3
     * @param playAsync 异步加载后，是否要播放
     * @param func
     * @param thisObject
     */
    public playEffect( mp3:string, playAsync:boolean = false, func:Function = null, thisObject:any = null ):void
    {
        var sound:egret.Sound = this.audioCache[ mp3 ];
        if( null == sound )
        {
            sound = RES.getRes( mp3 );
            this.audioCache[ mp3 ] = sound;
        }
        if( null != sound )
        {
            var channel:egret.SoundChannel = sound.play( 0, 1 );
            if( null != func )
            {
                channel.removeEventListener( egret.Event.SOUND_COMPLETE, func, thisObject );
                channel.addEventListener( egret.Event.SOUND_COMPLETE, func, thisObject );
            }
            return;
        }
        RES.getResAsync( mp3, ( sound:egret.Sound )=>
        {
            this.audioCache[ mp3 ] = sound;
            if( playAsync && null != sound )
            {
                var channel:egret.SoundChannel = sound.play( 0, 1 );
                if( null != func )
                {
                    channel.removeEventListener( egret.Event.SOUND_COMPLETE, func, thisObject );
                    channel.addEventListener( egret.Event.SOUND_COMPLETE, func, thisObject );
                }
            }
        }, this );
    }
}