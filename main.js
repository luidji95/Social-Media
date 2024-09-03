import './style.css'

'use strict';

const wallSection = document.querySelector('.user-wall-section');
const friendGrid = document.querySelector('.friend-grid');
const profileSection = document.querySelector('.profile-details');
const findFriendsInput = document.querySelector('.find-friends-input');

class Like {
    constructor(firstName, secondName) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.authorName = `${firstName} ${secondName}`;
    }
}

class Comment {
    constructor(author, commentText, img) {
        this.author = author;
        this.commentText = commentText;
        this.img = img;
        this.timestamp = new Date();
        this.likes = [];  
    }

    addLike(like) {
        this.likes.push(like);
    }

    getLikeCount() {
        return this.likes.length;
    }

    isLikedBy(userName) {
        return this.likes.some(
            (like) => `${like.firstName} ${like.secondName}` === userName
        );
    }

    removeLike(userName) {
        this.likes = this.likes.filter(
            (like) => `${like.firstName} ${like.secondName}` !== userName
        );
    }
}


class Post {
    constructor(postContent) {
        this.id = crypto.randomUUID();
        this.postContent = postContent;
        this.postDate = new Date();
        this.Likes = [];
        this.Comments = [];
        this.isCommentsVisible = false;
    }

    addLike(like) {
        this.Likes.push(like);
    }

    addComment(comment) {
        this.Comments.push(comment);
    }

    getLikeNames() {
        if (this.Likes.length === 0) {
            return 'No likes yet';
        }

        const firstLike = this.Likes[0];
        const lastLike = this.Likes[this.Likes.length - 1];

        const displayName = lastLike;

        const otherLikesCount = this.Likes.length - 1;
        if (otherLikesCount > 0) {
            return `${displayName.firstName} ${displayName.secondName} and ${otherLikesCount} others like this post`;
        } else {
            return `${displayName.firstName} ${displayName.secondName} likes this post`;
        }
    }

    getCommentCount() {
        return this.Comments.length;
    }

    isLikedBy(userName) {
        return this.Likes.some(
            (like) => `${like.firstName} ${like.secondName}` === userName
        );
    }

    removeLike(userName) {
        this.Likes = this.Likes.filter(
            (like) => `${like.firstName} ${like.secondName}` !== userName
        );
    }
}

class userManager {
    constructor() {
        this.Posts = [];
        this.Friends = [
            { firstName: "Gordana", lastName: "Stouns", img: "img/profile1.jpg" },
            { firstName: "Hiroshi", lastName: "Tanaka", img: "img/profile2.jpg" },
            { firstName: "Marc", lastName: "Anderson", img: "img/profile6.jpg" },
            { firstName: "Ethan", lastName: "Turner", img: "img/profile5.jpg" },
            { firstName: "Majda", lastName: "Odzakilijevska", img: "img/profile4.jpg" },
            { firstName: "Kilibarda", lastName: "Petrovski", img: "img/profile3.jpg" }
        ];
    }

    addPost(post) {
        this.Posts.push(post);
    }

    renderDefaultPosts() {
        wallSection.innerHTML = "";
        this.Posts.forEach(post => {
            const commentsHtml = post.Comments.map(comment => `
                <div class="single-comment">
                    <div class="aaa">
                        <img src="${comment.img}" class="comment-img">
                        <span class="comment-author">${comment.author}</span>
                    </div>
                    <p class="comment-text">${comment.commentText}</p>
                    <div class="comment-likes-section">
                        <button class="like-comment">Like</button>
                        <span class="like-comment-count">Likes: ${comment.getLikeCount()}</span>
                    </div>
                </div>
            `).join('');
    
            const html = `
                <div id="${post.id}" class="post">
                    <div class="post-header">
                        <img src="img/profilepic.jpg" class="profile-img">
                        <span class="user-name">Milos Petrovic</span>
                        <span class="post-date">${post.postDate.toLocaleDateString()}</span>
                    </div>
                    <div class="post-content">
                        <p>${post.postContent}</p>
                    </div>
                    <div class="btn">
                        <button class="like">Like</button>
                        <button class="comment">Comment</button>
                    </div>
                    <div class="post-footer">
                        <div class="likes-section">
                            <span>Likes: ${post.getLikeNames()}</span>
                        </div>
                        <div class="comments-section">
                            <span class="com-show">Comments: ${post.getCommentCount()}</span>
                        </div>
                    </div>
                    <div class="comment-input-section">
                        <input type="text" placeholder="Write a comment..." class="comment-input">
                        <button class="add-comment-btn">Add Comment</button>
                    </div>
                    <div class="commentSection ${post.isCommentsVisible ? '' : 'hidden'}">
                        ${commentsHtml}
                    </div>
                </div>
            `;
            wallSection.insertAdjacentHTML('afterbegin', html);
        });
    }

    updateCommentSection(postId) {
        const post = this.Posts.find(p => p.id === postId);
        const postElement = document.getElementById(postId);
        const commentSection = postElement.querySelector('.commentSection');
        
        const commentsHtml = post.Comments.map(comment => `
            <div class="single-comment">
                <div class="aaa">
                    <img src="${comment.img}" class="comment-img">
                    <span class="comment-author">${comment.author}</span>
                </div>
                <p class="comment-text">${comment.commentText}</p>
                <div class="comment-likes-section">
                    <button class="like-comment">Like</button>
                    <span class="like-comment-count">Likes: ${comment.getLikeCount()}</span>
                </div>
            </div>
        `).join('');
        
        commentSection.innerHTML = commentsHtml;
        commentSection.classList.toggle('hidden', !post.isCommentsVisible);

        const commentCount = postElement.querySelector('.com-show');
        commentCount.textContent = `Comments: ${post.getCommentCount()}`;
    }
}


const userManagerInstance = new userManager();