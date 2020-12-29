const EC = {
    share : undefined,
    pj: {
        titl : undefined,
        like : undefined,
        view : undefined,
        creator : undefined,
        remake : undefined,
    },
    sns: {
        titl : undefined,
        id : undefined,
        like : undefined,
        view : undefined,
        writer : undefined,
    }
}

$.ajaxSetup({ async: false });

const entry = {
    project(projectimport) {
        return {
            get(imported) {
                $.get(`https://playentry.org/api/project/${projectimport}`, data => {
                    function getimport(get,rtrn) {
                        if(imported == get) {
                            EC.share = rtrn;
                        }
                    }
                    EC.pj.titl = data.name;
                    EC.pj.like = data.likeCnt;
                    EC.pj.view = data.visit;
                    EC.pj.creator = data.username;
                    EC.pj.remake = data.childCnt;
                    getimport("title", EC.pj.titl);
                    getimport("like", EC.pj.like);
                    getimport("view", EC.pj.view);
                    getimport("creator", EC.pj.creator);
                    getimport("remake", EC.pj.remake);
                })
                return EC.share;
            },
            like() {
                $.ajax({
                    url: `https://playentry.org/api/project/like/${projectimport}`,
                    type: "POST",
                    data: {
                        targetSubject: "project", targetType: "individual"
                    }
                })
            },
            star() {
                $.ajax({
                    url: `https://playentry.org/api/project/favorite/${projectimport}`,
                    type: "POST",
                    data: {
                        targetSubject: "project", targetType: "individual"
                    }
                })
            },
            save(save) {
                if(save == undefined) {
                    $.ajax({
                        url: `https://playentry.org/api/project/${projectimport}`,
                        type: "PUT",
                        data: {
                            isopen : true
                        },
                    })
                }else{
                    $.ajax({
                        url: `https://playentry.org/api/project/${projectimport}`,
                        type: "PUT",
                        data: {
                            isopen : true,
                            name : save
                        }
                    })
                }
            },
            comment(comment) {
                $.ajax({
                    url: `https://playentry.org/api/comment`,
                    type: "POST",
                    data: {
                        targetSubject: "project", 
                        targetType: "individual",
                        content: comment,
                        target: projectimport,
                    }
                })
            }
        }
    },
    sns : {
        category(category) {
            return {
                num(num) {
                    if(category == "tip") {
                        $.get(`https://playentry.org/api/discuss/find?category=${category}s`, data => {
                            EC.share = data.data[num - 1]._id
                        })
                    }else{
                        $.get(`https://playentry.org/api/discuss/find?category=${category}`, data => {
                            EC.share = data.data[num - 1]._id
                        })
                    }
                    return EC.share
                },
                write(title,contents) {
                    $.ajax({
                        url:"https://playentry.org/api/discuss/",
                        type:"POST",
                        data:{
                            content : contents,
                            title : title,
                            groupNotice : false,
                            images : [],
                            category: category
                        }
                    });
                }
            }
        },
        select(sel) {
            return {
                get(imported) {
                    $.get(`https://playentry.org/api/discuss/${sel}`, data => {
                        function getimport(get,rtrn) {
                            if(imported == get) {
                                EC.share = rtrn;
                            }
                        }
                        EC.sns.titl = data.title;
                        EC.sns.like = data.likesLength;
                        EC.sns.view = data.visit;
                        EC.sns.writer = data.owner;
                        EC.sns.id = data._id;
                        getimport("title", EC.sns.titl);
                        getimport("like", EC.sns.like);
                        getimport("view", EC.sns.view);
                        getimport("writer", EC.sns.writer);
                        getimport("id", EC.sns.id);
                    })
                    return EC.share;
                },
                comment(content) {
                    $.ajax({
                        url: `https://playentry.org/api/comment`,
                        type: "POST",
                        data: {
                            targetSubject: "discuss", 
                            targetType: "individual",
                            content: content,
                            target: sel,
                        }
                    })
                }
            }
        }
    },
    user: {
        intro: {
            get(imported) {
                if(imported == "backimg"){
                    EC.share = `https://playentry.org/uploads/profile/${user._id.slice(0,2)}/${user._id.slice(2,4)}/blog_${user._id}.png`
                }
                if(imported == "profile"){
                    EC.share = `https://playentry.org/uploads/profile/${user._id.slice(0,2)}/${user._id.slice(2,4)}/avatar_${user._id}.png`
                }
                if(imported == "title"){
                    $.get(`https://playentry.org/api/getUserByUsername/${user.username}`, d => {
                        EC.share = d.description;
                    })
                }
                return EC.share
            },
            set: {
                title(title) {
                    $.ajax({
                        url: `https://playentry.org/rest/picture/upload_confirm`,
                        type: "POST",
                        data: {
                            avatarImage: true,
                            blogImage: entry.my.intro.get("backimg"),
                            description: title
                        }
                    })
                }
            }
        }
    }
}

if(confirm("글 권한을 허용하시겠습니까?") == true){
    console.warn("글 권한을 허용했습니다.")
    } else {
    entry.sns = undefined
    console.log("권한을 거부했습니다.")
}

if(confirm("작품 권한을 허용하시겠습니까?") == true){
    console.warn("작품 권한을 허용했습니다.")
} else {
    entry.project = undefined
    console.log("권한을 거부했습니다.")
}

if(confirm("계정 권한을 허용하시겠습니까?") == true){
    console.warn("계정 권한을 허용했습니다.")
} else {
    entry.user = undefined
    console.log("권한을 거부했습니다.")
}
