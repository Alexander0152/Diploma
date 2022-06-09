import {useState, useEffect} from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
    getComments as getCommentsApi,
    createComment as createCommentApi,
    updateComment as updateCommentApi,
    deleteComment as deleteCommentApi,
} from "../../services/CommentsService";

const Comments = ({commentsUrl, countryId}) => {
    const [backendComments, setBackendComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    const rootComments = backendComments?.filter(
        (backendComment) => backendComment.parentId === null
    );
    const getReplies = (commentId) =>
        backendComments
            .filter((backendComment) => backendComment.parentId === commentId)
            .sort(
                (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
            );

    const addComment = (text, parentId, user) => {
        createCommentApi(text, parentId, countryId, user).then(() => {
            setActiveComment(null);

            getCommentsApi(countryId).then((data) => {
                setBackendComments(data);
            });
        });
    };

    const updateComment = (commentId, newText) => {
        updateCommentApi(commentId, newText).then(() => {
            getCommentsApi(countryId).then((data) => {
                setActiveComment(null);
                setBackendComments(data);
            });
        });
    };

    const deleteComment = (commentId) => {
        deleteCommentApi(commentId).then(() => {

            getCommentsApi(countryId).then((data) => {
                setBackendComments(data);
            });
        });
    };

    useEffect(() => {
        if (!countryId) {
            return;
        }
        getCommentsApi(countryId).then((data) => {
            setBackendComments(data);
        });
    }, []);

    return (
        <div className="comments">
            <h3 className="comments-title">Feedbacks</h3>
            <div className="comment-form-title">Write feedback</div>
            <CommentForm submitLabel="Write" handleSubmit={addComment}/>
            <div className="comments-container">
                {rootComments?.map((rootComment) => (
                    <Comment
                        key={rootComment.id}
                        comment={rootComment}
                        replies={getReplies(rootComment.id)}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        addComment={addComment}
                        deleteComment={deleteComment}
                        updateComment={updateComment}
                    />
                ))}
            </div>
        </div>
    );
};

export default Comments;
