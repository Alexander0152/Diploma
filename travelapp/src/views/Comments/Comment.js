import CommentForm from "./CommentForm";
import {imageHost, Notifications, UserStatus} from "../../constants/constants";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {changeIsAuthorize} from "../../businessLayer/actions/AuthorizeAction";
import StorageService from "../../services/StorageService";
import {useToasts} from "react-toast-notifications";

const Comment = ({
                     comment,
                     replies,
                     setActiveComment,
                     activeComment,
                     updateComment,
                     deleteComment,
                     addComment,
                     parentId = null,
                 }) => {
    const isEditing =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === "editing";
    const isReplying =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === "replying";
    const fiveMinutes = 300000;
    const timePassed = new Date() - new Date(comment.date) > fiveMinutes;

    const isAuthorized = useSelector((state) => state.authorization.isAuthorized);
    const user = useSelector((state) => state.authorization.user);
    const dispatch = useDispatch();
    const storageService = new StorageService();

    const canDelete =
        user.id === comment.userId && replies.length === 0 && !timePassed;
    const canEdit = user.id === comment.userId;
    const replyId = parentId ? parentId : comment.id;
    const createdAt = new Date(comment.date).toLocaleDateString();

    const {addToast} = useToasts();

    useEffect(() => {
        const loggedUser = storageService.getUser();

        if (loggedUser) {
            dispatch(changeIsAuthorize(true, JSON.parse(loggedUser)));
        }
        const canEditt = user.id === comment.userId && !timePassed;
    }, []);

    function showNotAuthorized() {
        addToast(Notifications.account.rejectUnauthorized, {
            appearance: 'info',
            autoDismiss: true
        })
    }

    return (
        <div key={comment.id} className="comment">
            <div className="comment-image-container">
                <img src={imageHost + '/others/avatar.png'}/>
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{comment.userName}</div>
                    <div>{createdAt}</div>
                </div>
                {!isEditing && <div className="comment-text">{comment.feedbackText}</div>}
                {isEditing && (
                    <CommentForm
                        submitLabel="Update"
                        hasCancelButton
                        initialText={comment.feedbackText}
                        handleSubmit={(text) => updateComment(text, comment.id)}
                        handleCancel={() => {
                            setActiveComment(null);
                        }}
                    />
                )}

                {isAuthorized ? <div className="comment-actions">
                        <div
                            className="comment-action"
                            onClick={() =>
                                setActiveComment({id: comment.id, type: "replying"})
                            }
                        >
                            Reply
                        </div>
                        {canEdit && (
                            <div
                                className="comment-action"
                                onClick={() =>
                                    setActiveComment({id: comment.id, type: "editing"})
                                }
                            >
                                Edit
                            </div>
                        )}
                        {(canDelete || user.status === UserStatus.ADMIN) && (
                            <div
                                className="comment-action"
                                onClick={() => deleteComment(comment.id)}
                            >
                                Delete
                            </div>
                        )}
                    </div> :

                    <div className="comment-actions">
                        <div
                            className="comment-action"
                            onClick={() => showNotAuthorized()
                            }
                        >
                            Reply
                        </div>
                    </div>
                }

                {isReplying && (
                    <CommentForm
                        submitLabel="Reply"
                        handleSubmit={(text) => addComment(text, replyId, user)}
                        hasCancelButton={true}
                        handleCancel={() => {
                            setActiveComment(null);
                        }}
                    />
                )}
                {comment.replies?.length > 0 && (
                    <div className="replies">
                        {comment.replies.map((reply) => (
                            <Comment
                                comment={reply}
                                key={reply.id}
                                setActiveComment={setActiveComment}
                                activeComment={activeComment}
                                updateComment={updateComment}
                                deleteComment={deleteComment}
                                addComment={addComment}
                                parentId={comment.id}
                                replies={[]}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comment;
