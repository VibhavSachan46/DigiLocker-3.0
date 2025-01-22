import React from 'react'

const Modal = () => {
    return (
        <div>
            <div>
                <div>
                    <div>Share with</div>
                    <div>
                        <input
                            type="text"
                            className=''
                            placeholder='Enter Address'
                        >
                        </input>
                    </div>
                    <form id="myForm">
                        <select id="selectNumber">
                            <option>People with Access</option>
                        </select>
                    </form>
                    <div>
                        <button id="cancelBtn">
                            Cancel
                        </button>
                        <button>Share</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal