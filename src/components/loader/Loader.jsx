import React from 'react'
import styled from "styled-components"

const Loader = () => {
    return (
        <>
            <div className='min-h-screen w-full flex justify-center items-center bg-[#23232396] backdrop-blur-md fixed top-0 left-0'>
                <div className="container">
                    <div className="loader"></div>
                    <div className="loader"></div>
                    <div className="loader"></div>
                </div>
            </div>
        </>
    )
}

export default Loader