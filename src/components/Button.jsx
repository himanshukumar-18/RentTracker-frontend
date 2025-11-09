import React from 'react'

const Button = ({BtnWorkName, style}) => {
    return (
        <>
            <button className={style}>
                {BtnWorkName}
            </button>
        </>
    )
}

export default Button