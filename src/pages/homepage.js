import React from 'react';
import AddPost from '../components/addpost';
import Posts from '../components/posts';

export default class Homepage extends React.Component{
    render(){
        return( 
        <ul>
            <li><AddPost/></li>
            <li><Posts/></li>
        </ul>)
    }
}