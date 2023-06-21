const discussion = document.querySelectorAll(".discussionContainer");
const commentContainer = document.querySelectorAll(".commentContainer");
const replies = document.querySelectorAll(".replies");
const replyContainer = document.querySelectorAll(".replyContainer");

const mainWrapper = document.querySelector(".wrapper")

const comment = document.querySelectorAll(".comment");
const reply = document.querySelectorAll(".reply");


const commentRate = document.querySelectorAll(".rateNumber");
const userImg = document.querySelectorAll(".userImg");
const userName = document.querySelectorAll(".userName");
const createdAt = document.querySelectorAll(".createdAt");
const content = document.querySelectorAll(".content");

const commentRateofRreply = document.querySelector(".Myreply .rateNumber");
const userImgofRreply = document.querySelector(".Myreply .userImg");
const userNameofRreply = document.querySelector(".Myreply .userName");
const createdAtofRreply = document.querySelector(".Myreply .createdAt");

const replyShowerOfComments = document.querySelectorAll(".replyInvoker>button");

const replyBtn = document.querySelectorAll(".replyBtn");


const replyContents = document.querySelectorAll(".replyFactory textarea")

const contentofRreply = document.querySelector(".Myreply .content>p");

const editBtn = document.querySelector(".edit")
const Myreply = document.querySelector(".Myreply");

const yes = document.querySelector(".yes")
const no = document.querySelector(".no")
const overlay = document.querySelector(".overlay")

const commentBtn = document.querySelector(".commentBtn");
const input = document.querySelector(".currentUserComment");
input.focus()

let currentUserImg=document.querySelectorAll(".currentUserImg");



const request = new Request("https://api.jsonbin.io/v3/b/648ef0698e4aa6225eb04fcd")
fetch(request)
.then(resp=>{
    if(!resp.ok){
        throw new Error("data fetching problem")
    }
    return resp.json()
})
.then(data=>{

    console.log(data)
    const currentUser = data.record.currentUser;
    currentUserImg.forEach(e=>e.src=currentUser.image.png)

    const comments =data.record.comments
    let replyTo;
    for (const comm of comments) {
        for (let i = 0; i < commentContainer.length; i++) {
            const e = commentContainer[i].firstElementChild;
            if(e.dataset.id==comm.id){
                commentRate[i].textContent=comm.score
                userImg[i].src = comm.user.image.png
                userName[i].textContent = comm.user.username
                createdAt[i].textContent = comm.createdAt
                content[i].textContent = comm.content
            }
        }

      
        if(comm.replies.length>0){
            const repliesData = comm.replies;
            for (const rep of repliesData) {
                for (let i = 0; i < commentContainer.length; i++) {
                    const e = commentContainer[i].firstElementChild;
                    const eRep = commentContainer[i].nextElementSibling
                    
                    if(e.className==="reply"&&rep.id==e.dataset.id){
                        replyTo=data.record.comments[1].user.username
                        commentRate[i].textContent=rep.score
                        userImg[i].src = rep.user.image.png
                        userName[i].textContent = rep.user.username
                        createdAt[i].textContent = rep.createdAt
                        content[i].innerHTML =`<span class="tag">@${replyTo}</span> ${rep.content}`
                    }
                    if(eRep.className==="Myreply"&&rep.id==eRep.dataset.id){
                        replyTo=data.record.comments[1].replies[0].user.username
                        commentRateofRreply.textContent=rep.score
                        userImgofRreply.src = rep.user.image.png
                        userNameofRreply.textContent = rep.user.username
                        createdAtofRreply.textContent = rep.createdAt
                        contentofRreply.innerHTML = `<span class="tag">@${replyTo}</span> ${rep.content}`
                    }
                }
            }
        }
    }


    function createPost(content ,userImg, userName, creation="Now"){
        const div = document.createElement("div")
        div.setAttribute("class", "comment")
        div.dataset.editing="false"
        div.innerHTML=`
            <div class="commentRate">
                <div class="plus">
                    <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="currentColor"/></svg>
                </div>
    
                <div class="rateNumber">0</div>
    
                <div class="minus">
                    <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="currentColor"/></svg>
                </div>
            </div>
    
            <div class="user">
            <img class="userImg" src="${userImg}">
            <div class="meLabel">you</div>
                <h3 class="userName">${userName}</h3>
                <p class="createdAt">${creation}</p>
            </div>
    
            <div class="options">
                <button class = "delete">
                <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="currentColor"/></svg>            
                Delete
                </button>
    
    
                <button class = "edit">
                <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="currentColor"/></svg>                
                Edit
                </button>
            </div>
    
            <div class="content" data-edit="false">
                <textarea class="toEdit"></textarea>
                <p class="para">${content}</p>
            </div>

            <button class="update">UPDATE</button>
        `;
        mainWrapper.insertAdjacentElement("afterbegin",div)
    }
    
    function createReply(parent, content="unknown", tag="unknown", userImg, userName, creation="Now"){
        const div = document.createElement("div")
        div.setAttribute("class", "Myreply newReply")
        div.dataset.editing="false"
        div.innerHTML=`
            <div class="commentRate">
                <div class="plus">
                    <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="currentColor"/></svg>
                </div>
    
                <div class="rateNumber">0</div>
    
                <div class="minus">
                    <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="currentColor"/></svg>
                </div>
            </div>
    
            <div class="user">
                <img class="userImg" src="${userImg}">
                <div class="meLabel">you</div>
                <h3 class="userName">${userName}</h3>
                <p class="createdAt">${creation}</p>
            </div>
    
            <div class="options">
                <button class = "delete deleteNows">
                <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="currentColor"/></svg>            
                Delete
                </button>
    
    
                <button class = "edit">
                <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="currentColor"/></svg>                
                Edit
                </button>
            </div>
    
            <div class="content" data-edit="false">
                <textarea class="toEdit"></textarea>
                <p class="para"><span class="tag">@${tag} </span>${content}</p>
            </div>

            <button class="update">UPDATE</button>
        `;
        parent.insertAdjacentElement("beforeend",div)
    }
    
    
    
    for (let i = 0; i < replyShowerOfComments.length; i++) {
        const e = replyShowerOfComments[i];
        function showReplyFactory(){
            if(commentContainer[i].dataset.post==="closed"){
                commentContainer[i].dataset.post="opened"
                replyContents[i].focus()
            }else{
                commentContainer[i].dataset.post="closed"
            }
        }
        e.addEventListener("click", showReplyFactory)
    }

    let deleteBtn = document.querySelectorAll(".delete")
    deleteBtn.forEach(e=>{
        e.addEventListener("click", ()=>{
            mainWrapper.dataset.ask="show"

            function removeReply(){
                mainWrapper.dataset.ask="none"
                e.parentElement.parentElement.remove()
                no.removeEventListener("click", hidePoll)
            }                        
            function hidePoll(){
                mainWrapper.dataset.ask="none"
                yes.removeEventListener("click", removeReply)
            }
            
            yes.addEventListener("click", removeReply)
            no.addEventListener("click", hidePoll)
        })
    })

    for (let i = 0; i < replyBtn.length; i++) {
        const e = replyBtn[i];
        e.addEventListener("click", ()=>{
            let orient = Number(e.dataset.to)
            replyContents[i].focus()

            if(replyContents[i].value.length>0){
                discussion[orient].dataset.replies="exist";


                const dataComment = data.record.comments;
                let tag
                for (const to of dataComment) {
                    if(e.dataset.id==to.id){
                        tag = to.user.username
                    }else{
                        for (const repTo of to.replies) {
                            if(e.dataset.id==repTo.id){
                                tag = repTo.user.username
                            }
                        }
                    }
                }
                
                
                createReply(replies[orient], replyContents[i].value, tag, currentUser.image.png, currentUser.username);
                replyContents[i].value="";
            }
            
            deleteBtn = document.querySelectorAll(".delete")
            deleteBtn.forEach(e=>{
                e.addEventListener("click", ()=>{
                    mainWrapper.dataset.ask="show"

                    function removeReply(){
                        mainWrapper.dataset.ask="none"
                        e.parentElement.parentElement.remove()
                        no.removeEventListener("click", hidePoll)
                        if(replies[orient].childNodes.length===0){
                            discussion[orient].dataset.replies="none";
                        }
                    }                        
                    function hidePoll(){
                        mainWrapper.dataset.ask="none"
                        yes.removeEventListener("click", removeReply)
                    }
                    
                    yes.addEventListener("click", removeReply)
                    no.addEventListener("click", hidePoll)

                })
            })
            
        })

    }

    commentBtn.addEventListener("click", ()=>{
        if(input.value.length>0){
            console.log(`ifdjalsd`)
            createPost(input.value, currentUser.image.png, currentUser.username)
        }
        input.value=""
        input.focus()

        
        deleteBtn = document.querySelectorAll(".delete")
        deleteBtn.forEach(e=>{
            e.addEventListener("click", ()=>{
                mainWrapper.dataset.ask="show"

                function removeReply(){
                    mainWrapper.dataset.ask="none"
                    e.parentElement.parentElement.remove()
                    no.removeEventListener("click", hidePoll)
                }                        
                function hidePoll(){
                    mainWrapper.dataset.ask="none"
                    yes.removeEventListener("click", removeReply)
                }
                
                yes.addEventListener("click", removeReply)
                no.addEventListener("click", hidePoll)

            })
        })

    })

    const rata = document.querySelectorAll(".commentRate")

    for (let i = 0; i < rata.length; i++) {
        const e = rata[i];
        let score = e.querySelector(".rateNumber")
        const rateBtn = e.querySelector(".plus")
        const dec = e.querySelector(".minus")

        let currScore = score.textContent
        console.log(currScore)
        
        if(e.classList.contains("blocked")){
            return;
        }
        
        rateBtn.addEventListener("click", ()=>{
            if(rateBtn.classList.contains("added")===false){
                score.textContent = Number(currScore)+1
                dec.classList.remove("added")
                rateBtn.classList.add("added")
            }
        })

        dec.addEventListener("click", ()=>{
            if(dec.classList.contains("added")===false){
                score.textContent = Number(currScore)-1
                rateBtn.classList.remove("added")
                dec.classList.add("added")
            }
        })
    }




})

document.body.addEventListener("click", e=>{
    if(e.target.matches(".edit")){
        const editBtn = e.target
        if(editBtn.parentElement.parentElement.dataset.editing==="false"){
            editBtn.parentElement.parentElement.dataset.editing="true"
            const z = editBtn.parentElement.parentElement.querySelector(".content")
            z.dataset.edit="true"
            const b = z.querySelector(".toEdit")
            const q = z.querySelector(".para")
            b.value=q.textContent
            b.focus()
        }else{
            editBtn.parentElement.parentElement.dataset.editing="false"
            const z = editBtn.parentElement.parentElement.querySelector(".content")
            z.dataset.edit="false"
        }
    }

    if(e.target.matches(".update")){
        const updateEle = e.target;
        const z = updateEle.parentElement.querySelector(".content");
        const b = z.querySelector(".toEdit")
        const q = z.querySelector(".para")
        const tag = q.querySelector(".tag")
        
        
        const regexTag = /^@\w+\b/
        if(b.value.length>0&&regexTag.test(String(q.textContent))){
            const currTag = regexTag.exec(String(q.textContent))[0]
            q.textContent=String(b.value).replace(currTag,"")
            q.innerHTML=`<span class="tag">${tag.textContent} </span>${q.textContent}`
        }else if(b.value.length>0&&regexTag.test(String(q.textContent))===false){
            q.textContent=b.value;
        }


        updateEle.parentElement.dataset.editing="false"
        z.dataset.edit="false"
    }

})

