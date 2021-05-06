import React from 'react';
import AddPost from '../components/addpost';
import Posts from '../components/posts';
import ProfileBar from "../components/profilebar";

export default class Homepage extends React.Component{
    render(){
        return(
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
            <div><ProfileBar/></div>
            <div><Posts/></div>
            <div>Column 3</div>
            </div> 
)
    }
}