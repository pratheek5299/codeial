{
    //method to sumbit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-forms');

        newPostForm.submit(function(event){
            event.preventDefault();
            $.ajax({
                type: 'post', 
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                    let  newPost = newPostDom(data.data.post, data.data.post.user);
                    $('#display-posts>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));//space is important before the class
                }, error: function(err){
                    console.log(error.responseText);
                }
            })
        });
    }

    // method to create a post in DOM 
    let newPostDom = function(i, user){
        console.log(i.name);
        return $(`  <li id="post-${i._id}">
                        <p>
                           
                            <small>
                                <a class="delete-post-button" href="/posts/destroy/${i._id}">X</a>
                            </small>
                            
                            ${i.content}
                        </p>   
                        <p>
                            - by ${user.name}
                        </p>
                        <div id="post-comments">
                           
                                <form method="POST" action="/comments/create">
                                    <input type="text" name="content" placeholder="Type here to type comment..." required>
                                    <input type="hidden" name="post" value="${i._id}">
                                    <input type="submit" value="Add Comments" name="" id="">
                                </form>
            
                            <div class="post-comments-list">
                                <ul id="post-comments-${i._id}">
                                
                                </ul>
                            </div>
                        </div>
                    </li>`)
    }

    // method to delete Post from Dom
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function(err){
                    console.log(err.responseText);
                }
            })
        });
    }



    createPost();
}