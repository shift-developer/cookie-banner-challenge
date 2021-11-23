import React from 'react'
import './Banner.css'

export const Banner = ({backgroundColor, primaryColor, fontColor}) => {
    return (
        <div className='banner-box-ui-cmp' style={{background: backgroundColor, maxWidth: 900, maxHeight: 50, flex: 1}}>
            <p className='banner-text-ui-cmp' style={{color: fontColor}}>We use cookies to optimize our website and collect statistic on usage</p>
            <button className='banner-button-ui-cmp' style={{background: primaryColor, color: backgroundColor}}>Accept cookies</button>
        </div>
    )
}
