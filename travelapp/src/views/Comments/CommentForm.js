import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import StorageService from "../../services/StorageService";
import {useToasts} from "react-toast-notifications";
import {changeIsAuthorize} from "../../businessLayer/actions/AuthorizeAction";
import {Notifications} from "../../constants/constants";

const CommentForm = ({
                         handleSubmit,
                         submitLabel,
                         hasCancelButton = false,
                         handleCancel,
                         initialText = "",
                     }) => {

    const isAuthorized = useSelector((state) => state.authorization.isAuthorized);
    const dispatch = useDispatch();
    const storageService = new StorageService();

    const {addToast} = useToasts();

    useEffect(() => {
        const loggedUser = storageService.getUser();

        if (loggedUser) {
            dispatch(changeIsAuthorize(true, JSON.parse(loggedUser)));
        }
    }, [isAuthorized])

    const [text, setText] = useState(initialText);
    const isTextareaDisabled = text.length === 0;
    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(text);
        setText("");
    };

    function showNotAuthorized() {
        addToast(Notifications.account.rejectUnauthorized, {
            appearance: 'info',
            autoDismiss: true
        })
    }

    return isAuthorized ? (
        <form onSubmit={onSubmit}>
      <textarea
          className="comment-form-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
      />
            <button className="comment-form-button" disabled={isTextareaDisabled}>
                {submitLabel}
            </button>
            {hasCancelButton && (
                <button
                    type="button"
                    className="comment-form-button comment-form-cancel-button"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            )}
        </form>
    ) : (<form onSubmit={onSubmit}>
      <textarea
          className="comment-form-textarea"
          value={text}
          onClick={() => showNotAuthorized()}
          onChange={(e) => setText(e.target.value)}
      />
        <button className="comment-form-button" disabled={true}>
            {submitLabel}
        </button>
    </form>);
};

export default CommentForm;
