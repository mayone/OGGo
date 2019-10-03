import React from 'react';
import './modal.scss'

export default function GameResultModal(props) {
    const { open, gameResult, onConfirm, onClear } = props

    if (!open) {
        return null
    }

    return (
        <div
            className="modal"
        >
            <div className="modal-content">
                <div className="modal-header">
                    <button
                        class="close"
                        onClick={onConfirm}
                    >
                        &times;
                    </button>
                    <h4 className="modal-title">Game result</h4>
                </div>
                <div className="modal-body">
                    <text className={`${gameResult}-text`}>
                        {`${gameResult} wins`}
                    </text>
                </div>
                <div className="modal-footer">
                    <button
                        className="confirm"
                        onClick={onConfirm}
                    >
                        OK
                    </button>
                    <button
                        className="clear"
                        onClick={onClear}
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    )
}