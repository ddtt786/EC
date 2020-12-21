let ___title
let __id
let __like
let __view
let __user
let ___titlep
let __likep
let __viewp
let __creator
let ret

function wait(msecs) {
    let start = new Date().getTime();
    let cur = start;
    while(cur - start < msecs) {
        cur = new Date().getTime();
    }
}

$.ajaxSetup({ async: false });
let entry = {
    ds: {
        sel(sel) {
            return {
                comment(com) {
                    $.ajax({
                        url: `https://playentry.org/api/comment`,
                        type: "POST",
                        data: {
                            targetSubject: "discuss", 
                            targetType: "individual",
                            content: com,
                            target: sel,
                        }
                    })
                    console.warn("댓글을 달았습니다.")
                },
                like() {
                    $.ajax({
                        url: `https://playentry.org/api/discuss/like/${sel}?targetSubject=discuss&targetType=individual`,
                        type: "POST",
                        data: {
                            targetSubject: "discuss", 
                            targetType: "individual",
                        }
                    })
                }
            }
        },
        free: {
            my : `https://playentry.org/api/discuss/find?username=${user.username}&title=&search_title=&sort=created&rows=0&page=1&category=free`,
            get(getr) {
                $.get('https://playentry.org/api/discuss/find?category=free', d => {
                    ___title = d.data[0].title;
                    __id = d.data[0]._id;
                    __like = d.data[0].likesLength;
                    __view = d.data[0].visit;
                    __user = d.data[0].owner;
                    if(getr == "title"){ret = ___title}
                    if(getr == "id"){ret = __id}
                    if(getr == "like"){ret = __like}
                    if(getr == "view"){ret = __view}
                    if(getr == "user"){ret = __user}
                })
                return ret
            },
            write(t,p) {
                $.ajax({
                    url:"https://playentry.org/api/discuss/",
                    type:"POST",
                    data:{
                        content:p,
                        title:t,
                        groupNotice:false,
                        images:[],
                        category:"free"
                    }
                });
                console.log("글을 올렸습니다.")
            },
            delete(del) {
                $.get(entry.ds.free.my, d => {
                    delfree = d.data[0]._id;
                    if(del == undefined) {
                        $.ajax({
                            url: `https://playentry.org/api/discuss/${delfree}`,
                            type: "DELETE",
                        })
                    }else{
                        $.ajax({
                            url: `https://playentry.org/api/discuss/${del}`,
                            type: "DELETE",
                        })
                    }
                })
                console.warn("글을 삭제했습니다.")
            }
        },
        qna: {
            my : `https://playentry.org/api/discuss/find?username=${user.username}&title=&search_title=&sort=created&rows=0&page=1&category=qna`,
            get(getr) {
                $.get('https://playentry.org/api/discuss/find?category=qna', d => {
                    ___title = d.data[0].title;
                    __id = d.data[0]._id;
                    __like = d.data[0].likesLength;
                    __view = d.data[0].visit;
                    __user = d.data[0].owner;
                    if(getr == "title"){ret = ___title}
                    if(getr == "id"){ret = __id}
                    if(getr == "like"){ret = __like}
                    if(getr == "view"){ret = __view}
                    if(getr == "user"){ret = __user}
                })
                return ret
            },
            write(t,p) {
                $.ajax({
                    url:"https://playentry.org/api/discuss/",
                    type:"POST",
                    data:{
                        content:p,
                        title:t,
                        groupNotice:false,
                        images:[],
                        category:"qna"
                    }
                });
                console.log("글을 올렸습니다.")
            },
            delete(del) {
                $.get(entry.ds.qna.my, d => {
                    delfree = d.data[0]._id;
                    if(del == undefined) {
                        $.ajax({
                            url: `https://playentry.org/api/discuss/${delfree}`,
                            type: "DELETE",
                        })
                    }else{
                        $.ajax({
                            url: `https://playentry.org/api/discuss/${del}`,
                            type: "DELETE",
                        })
                    }
                })
                console.warn("글을 삭제했습니다.")
            }
        },
        tip: {
            my : `https://playentry.org/api/discuss/find?username=${user.username}&title=&search_title=&sort=created&rows=0&page=1&category=tips`,
            get(getr) {
                $.get('https://playentry.org/api/discuss/find?category=tip', d => {
                    ___title = d.data[0].title;
                    __id = d.data[0]._id;
                    __like = d.data[0].likesLength;
                    __view = d.data[0].visit;
                    __user = d.data[0].owner;
                    if(getr == "title"){ret = ___title}
                    if(getr == "id"){ret = __id}
                    if(getr == "like"){ret = __like}
                    if(getr == "view"){ret = __view}
                    if(getr == "user"){ret = __user}
                })
                return ret
            },
            write(t,p) {
                $.ajax({
                    url:"https://playentry.org/api/discuss/",
                    type:"POST",
                    data:{
                        content:p,
                        title:t,
                        groupNotice:false,
                        images:[],
                        category:"tip"
                    }
                });
                console.log("글을 올렸습니다.")
            },
            delete(del) {
                $.get(entry.ds.tip.my, d => {
                    delfree = d.data[0]._id;
                    if(del == undefined) {
                        $.ajax({
                            url: `https://playentry.org/api/discuss/${delfree}`,
                            type: "DELETE",
                        })
                    }else{
                        $.ajax({
                            url: `https://playentry.org/api/discuss/${del}`,
                            type: "DELETE",
                        })
                    }
                })
                console.warn("글을 삭제했습니다.")
            }
        }
    },
    project(pj) {
        return {
            get(getr) {
                $.get(`https://playentry.org/api/project/${pj}`, d => {
                    ___titlep = d.name;
                    __likep = d.likeCnt;
                    __viewp = d.visit;
                    __creator = d.username;
                    if(getr == "title"){ret = ___titlep}
                    if(getr == "like"){ret = __likep}
                    if(getr == "view"){ret = __viewp}
                    if(getr == "creator"){ret = __creator}
                })
                return ret
            },
            like() {
                $.ajax({
                    url: `https://playentry.org/api/project/like/${pj}`,
                    type: "POST",
                    data: {
                        targetSubject: "project", targetType: "individual"
                    }
                })
                console.log(`${pj}에 좋아요를 달았습니다.`)
            },
            star() {
                $.ajax({
                    url: `https://playentry.org/api/project/favorite/${pj}`,
                    type: "POST",
                    data: {
                        targetSubject: "project", targetType: "individual",
                    }
                })
                console.log(`${pj}에 관심작품을 달았습니다.`)
            },
            save(saver) {
                if(saver == undefined) {
                    $.ajax({
                        url: `https://playentry.org/api/project/${pj}`,
                        type: "PUT",
                        data: { "isopen": true, "group": [] },
                        success: function (data) {
                            console.log(data)
                        }
                    })
                    console.log(`${pj}를 저장했습니다.`)
                }else{
                    $.ajax({
                        url: `https://playentry.org/api/project/${pj}`,
                        type: "PUT",
                        data: { "isopen": true, "group": [] ,name: saver,},
                        success: function (data) {
                            console.log(data)
                        }
                    })
                    console.warn(`${pj}의 제목을 ${saver}로 바꾸고 저장했습니다.`)
                }
            },
            comment(com) {
                $.ajax({
                    url: `https://playentry.org/api/comment`,
                    type: "POST",
                    data: {
                        targetSubject: "project", 
                        targetType: "individual",
                        content: com,
                        target: pj,
                    }
                })
                console.warn(`${pj}에 댓글을 달았습니다.`)
            },
        }
    }
}

if(confirm("글 관리 권한을 허용하시겠습니까? (글 올리기, 삭제, 댓글 달기와 같은 코드를 실행할 수 있습니다.)") == true){
    console.warn("글 관리 권한을 허용했습니다.")
    }else{
    entry.ds = undefined
    console.log("권한을 거부했습니다.")
}

if(confirm("작품 관리 권한을 허용하시겠습니까? (작품 저장하기, 제목 바꾸기, 좋아요/관심작품 누르기, 댓글 달기와 같은 코드를 실행할 수 있습니다.))") == true){
    console.warn("작품 관리 권한을 허용했습니다.")
    }else{
    entry.project = undefined
    console.log("권한을 거부했습니다.")
}
