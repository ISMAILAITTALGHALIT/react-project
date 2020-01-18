import React from 'react'
import FontAwesome from 'react-fontawesome';
import '../css/Container.css';

const Container = props => {
    return (
        <div>
            <FontAwesome name={props.iconName} size='5x'/>
            <h3 className='container--title'>{props.content}</h3>
        </div>
    )
    }
export { Container };
