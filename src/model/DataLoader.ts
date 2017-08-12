/**
 * Created by Gordon on 2015/10/21.
 */
class DataLoader
{
    private static _instance:DataLoader;
    public static get instance():DataLoader
    {
        if( null == DataLoader._instance )
        {
            DataLoader._instance = new DataLoader();
        }

        return DataLoader._instance;
    }

    public post( url:string, data:any, callBack: (data,url:string) => void, thisObj:any ):void
    {
        // RES.getResByUrl( url, callBack, thisObj, RES.ResourceItem.TYPE_JSON );
        url = url + "?time=" + Date.now();
        callBack.bind( thisObj );
        var xmlhttp = new XMLHttpRequest();
        function state_Change()
        {
            if (xmlhttp.readyState==4)
            {// 4 = "loaded"
                if (xmlhttp.status==200)
                {// 200 = OK
                    callBack.call( thisObj, JSON.parse(xmlhttp.responseText), url )
                }
                else
                {
                    alert("获取用户信息,请稍后重试。");
                }
            }
        }
        xmlhttp.onreadystatechange=state_Change;
        xmlhttp.open("POST",url,true);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send(data);
    }
}