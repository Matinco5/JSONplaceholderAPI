let listOfNotes = document.querySelector(".note-list");
const postBtn = document.querySelector("#fetch-post-btn")
const userId = document.getElementById("user-id")
const userTitle = document.getElementById("user-title")
const userContent = document.getElementById("user-content")
const saveEditBtn = document.getElementById("save-edit-btn")

function EventListener(){
    postBtn.addEventListener("click", fetchPost)
    listOfNotes.addEventListener("click", editUserInfo)
   // saveEditBtn.addEventListener("click", saveEditedUser)
    listOfNotes.addEventListener("click", deleteUserInfo)
    
 }
    
    EventListener()

//validating the input field not to take letters
userId.addEventListener('keydown', function (event) {
    if (
        !(
            event.key === 'Backspace' ||
            event.key === 'ArrowLeft' ||
            event.key === 'ArrowRight' ||
            (event.key >= '0' && event.key <= '9')
        )
    ) {
        event.preventDefault();
    }
});

    //Here, an asynchronous function was created to get the data from the provided endpoints. 
    //The title from the JSON placehiolder  was fetched using the fetch method
async function fetchPost(){
    if(userId.value !== ""){

        try{
            let userId = document.getElementById("user-id").value;
            const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`)
            if(!postResponse.ok){
                throw new Error("enter a valid user id")
            }
            const data = await postResponse.json()

            //creating a new element to display the fetched data
            const newPost = document.createElement("div");

            newPost.classList.add("note-item")
            newPost.setAttribute("data-id", data.id)
            newPost.innerHTML=`
            <h3>${data.title}</h3>
        
            <p>${data.body}</p>
        
            <button type = "button" class = "btn delete-note-btn">
            <span><i class = "fas fa-trash"></i></span>
            Delete
            </buttton>

            <button type = "button" class = "btn edit-note-btn">
            <span><i class = "fas fa-pen"></i></span>
            Edit
            </buttton>

            <button type = "button" class = "btn edit-note-btn">
            User-id: ${data.id}
            </buttton>
        `
            //appending the newly creadted element with the fetched information into an already cvreated container
            listOfNotes.appendChild(newPost)

            userId = document.getElementById("user-id").value = ""

            }
        catch{
            console.error("try again")
            console.log("Enter a valid user identity")
        }}

        //Ensuring the input field doesn't take an empty space
        else{
            if(userId.value === ""){
            userId.classList.add("warning")
            }
            if(userTitle.value === ""){
            userTitle.classList.add("warning")
            }
            if(userContent.value === ""){
            userContent.classList.add("warning")
            }
        }
        setTimeout(function (){
            userId.classList.remove("warning")
            userTitle.classList.remove("warning")
            userContent.classList.remove("warning")
            }, 1600)
    }

    async function editUserInfo(e) {
        if(e.target.classList.contains("edit-note-btn")){
       
        const noteItem = e.target.parentElement;
        const noteID = noteItem.dataset.id;
    
        const noteTitle = noteItem.querySelector("h3").textContent;
        const noteContent = noteItem.querySelector("p").textContent;
    
        document.getElementById("user-title").style.display= "block"
        document.getElementById("user-content").style.display= "block"
        document.getElementById("save-edit-btn").style.display= "block"
        
      
        document.getElementById("user-title").value = noteTitle;
        document.getElementById("user-content").value = noteContent;

        saveEditBtn.addEventListener("click", function () {
               saveEditedUser(noteID);
            }, { once: true });

        }}
    
    
        async function saveEditedUser(noteID){
            try{
                let editedPost = {
                    userId: noteID,
                    id : noteID,
                    title : "",
                    body: ""
                }

                document.getElementById("user-title").value = noteTitle;
                document.getElementById("user-content").value = noteContent;
                
                editedPost.id= noteID
                editedPost.userId = noteID
                editedPost.title =noteTitle;
                editedPost.body = noteContent
                const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${noteID}`,{
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(editedPost)
                })
    
               if(!postResponse.ok){
                throw new Error("enter a valid user id")
                
            }
            document.getElementById("user-title").style.display= "none"
            document.getElementById("user-content").style.display= "none"
            document.getElementById("save-edit-btn").style.display= "none"
            const data = await postResponse.json()
            return data
           
            }

           

            catch{
                console.error("error! Unable to post data")
            }  }
    
            
        
      
    //deleting th2 note 
     function deleteUserInfo(e){
        if(e.target.classList.contains("delete-note-btn")){
    
          //removing the parent element of the clicked element
            e.target.parentElement.remove();
            document.getElementById("user-title").style.display= "none"
            document.getElementById("user-content").style.display= "none"    
            document.getElementById("save-edit-btn").style.display= "none"
        
            document.getElementById("user-id").value = "";
        }
    }
