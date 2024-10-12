import React, { Component } from 'react'

const Like = ({ liked, onFavourite, item }) => {
    return (
        <i onClick={() => onFavourite(item)} style={{ cursor: "pointer" }} className={`fa-heart ${liked ? "fa-solid text-danger" : "fa-regular"}`}></i>
    );
}

export default Like;