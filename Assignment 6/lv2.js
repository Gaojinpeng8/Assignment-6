function ajax(url,fnSucc,fnFaild)
{
    if(window.XMLHttpRequest)
    {
        var xhr=new XMLHttpRequest();
    }else{
       var xhr=new ActiveXObject("Microsoft.XMLHttp");
    }
    xhr.open('GET',url,true);
    xhr.send();
    xhr.onreadystatechange=function()
    {
        if(xhr.readyState==4)
        {
            if(xhr.status==200){//读取成功  http请求状态
                fnSucc(xhr.responseText);//响应数据类型
            }
            else         //失败
            {
                if(fnFaild){//判断是否传入函数
                    fnFaild(xhr.status);//调用
                }
                
            }

        }
    }
}
  
window.onload=function(){
    var btu=document.getElementById('search');

    btu.onclick=function()
    {
        ajax('https://music.niubishanshan.top/api/v2/music/search/%E5%94%90%E4%BA%BA/1/10',function (str){
            var content=document.getElementById("content");
            var cnt=content.value;
            var ka=document.getElementById("kuang");
            var json=JSON.parse(str);
            var json2=json.data.songList;
            ka.innerHTML='';
            for(var i=0;i<json2.length;i++){
                var P=document.createElement("p");
                if(cnt===json2[i].singer[0].singerName){
                    if(json2[i].singer[1]){
                        P.innerHTML='歌手：'+json2[i].singer[1].singerName+'和'+json2[i].singer[0].singerName+'    歌曲：'+json2[i].songName;
                        ka.appendChild(P);
                    }else{
                    P.innerHTML='歌手：'+json2[i].singer[0].singerName+'    歌曲：'+json2[i].songName;
                    ka.appendChild(P);
                }
                }
                if(cnt===json2[i].songName){
                    P.innerHTML='歌手：'+json2[i].singer[0].singerName+'    歌曲：'+json2[i].songName;
                    ka.appendChild(P);
                }
                if(json2[i].singer[1]&&cnt===json2[i].singer[1].singerName){
                    P.innerHTML='歌手：'+json2[i].singer[1].singerName+'和'+json2[i].singer[0].singerName+'    歌曲：'+json2[i].songName;
                    ka.appendChild(P);
                }
            }
            console.log(json2);
         },function (e){
            alert(e);
         })
    };
}
