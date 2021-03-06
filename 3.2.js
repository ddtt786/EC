$.ajaxSetup({ async: false });

const ec = {
    macro(time, clbk) {
        setInterval(clbk, time);
    }
}

const pj = (pjsel) => {
    return {
        save(name) {
            if(name == undefined) {
                $.ajax({
                    url: `https://playentry.org/api/project/${pjsel}`,
                    type: "PUT",
                    data: {
                        isopen : true
                    },
                });
            }else{
                $.ajax({
                    url: `https://playentry.org/api/project/${pjsel}`,
                    type: "PUT",
                    data: {
                        isopen : true,
                        name : name
                    }
                });
            }
        },
        get(geting) {
            let rtn;
            if(pjsel == "all"){
                $.get(`https://playentry.org/api/project/find`, ({data}) => {
                    rtn = data[geting - 1]._id;
                });
            }else{
                $.get(`https://playentry.org/api/project/${pjsel}`, data => {
                    function getimport(get,rtrn) {
                        if(geting == get) {
                            rtn = rtrn;
                        }
                    }
                    getimport("title", data.name);
                    getimport("like", data.likeCnt);
                    getimport("view", data.visit);
                    getimport("comment", data.comment);
                    getimport("creator", data.username);
                    getimport("remake", data.childCnt);
                });
            }
            return rtn;
        },
        like() {
            $.ajax({
                url: `https://playentry.org/api/project/like/${pjsel}`,
                type: "POST",
                data: {
                    targetSubject: "project",
                    targetType: "individual"
                }
            });
        },
        bmark() {
            $.ajax({
                url: `https://playentry.org/api/project/favorite/${pjsel}`,
                type: "POST",
                data: {
                    targetSubject: "project", 
                    targetType: "individual"
                }
            });
        },
        cmt(comment) {
            $.ajax({
                url: `https://playentry.org/api/comment`,
                type: "POST",
                data: {
                    targetSubject: "project", 
                    targetType: "individual",
                    content: comment,
                    target: pjsel,
                }
            });
        }
    }
};

const ds = (dssel) => {
    return {
        write(title,content) {
            $.ajax({
                url:"https://playentry.org/api/discuss/",
                type:"POST",
                data:{
                    content : content,
                    title : title,
                    groupNotice : false,
                    images : [],
                    category: dssel
                }
            });
        },
        edit(title,content) {
            $.ajax({
                url:`https://playentry.org/api/discuss/${dssel}`,
                type:"PUT",
                data:{
                    content : content,
                    title : title,
                    groupNotice : false,
                }
            });
        },
        get(geting) {
            let rtn;
            if(dssel == "tip"||dssel == "qna"||dssel == "free") {
                if(dssel == "tip") {
                    $.get(`https://playentry.org/api/discuss/find?category=${dssel}s`, ({data}) => {
                        rtn = data[geting - 1]._id;
                    });
                }else{
                    $.get(`https://playentry.org/api/discuss/find?category=${dssel}`, ({data}) => {
                        rtn = data[geting - 1]._id;
                    });
                }
            }else{
                $.get(`https://playentry.org/api/discuss/${dssel}`, data => {
                    function getimport(get,rtrn) {
                        if(geting == get) {
                            rtn = rtrn;
                        }
                    }
                    getimport("title", data.title);
                    getimport("like", data.likesLength);
                    getimport("view", data.visit);
                    getimport("writer", data.owner);
                    getimport("id", data._id);
                });
            }
            return rtn;
        },
        cmt(content) {
            $.ajax({
                url: `https://playentry.org/api/comment`,
                type: "POST",
                data: {
                    targetSubject: "discuss", 
                    targetType: "individual",
                    content: content,
                    target: dssel,
                }
            });
        },
        like() {
            $.ajax({
                url: `https://playentry.org/api/discuss/like/${dssel}?targetSubject=discuss&targetType=individual`,
                type: "POST",
                data: {
                    targetSubject: "discuss", targetType: "individual"
                }
            });
        }
    }
};

const my = {
    intro: {
        get(geting) {
            let rtn;
            if(geting == "backimg"){
                rtn = `https://playentry.org/uploads/profile/${user._id.slice(0,2)}/${user._id.slice(2,4)}/blog_${user._id}.png`;
            }
            if(geting == "profile"){
                rtn = `https://playentry.org/uploads/profile/${user._id.slice(0,2)}/${user._id.slice(2,4)}/avatar_${user._id}.png`;
            }
            if(geting == "title"){
                $.get(`https://playentry.org/api/getUserByUsername/${user.username}`, d => {
                    rtn = d.description;
                });
            }
            return rtn;
        },
        set: {
            title(title) {
                $.ajax({
                    url: `https://playentry.org/rest/picture/upload_confirm`,
                    type: "POST",
                    data: {
                        avatarImage: true,
                        blogImage: my.intro.get("backimg"),
                        description: title
                    }
                });
            }
        }
    }
};
