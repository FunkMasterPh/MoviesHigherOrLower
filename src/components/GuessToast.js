import React from 'react';
import Toast from 'react-bootstrap/Toast'
import { XCircleFill,CheckCircleFill} from 'react-bootstrap-icons';


const GuessToast = ({ guessResult }) => {
    console.log(guessResult);
    return (
        <Toast className="guess-toast">
            <Toast.Body>
                {guessResult ? 
                    <CheckCircleFill className="correct-answer-toast" size={100} color={'green'}></CheckCircleFill>
                    :
                    <XCircleFill className="correct-answer-toast" size={100} color={'red'}></XCircleFill>
                    }
            </Toast.Body>
        </Toast>
    )
}
export default GuessToast;