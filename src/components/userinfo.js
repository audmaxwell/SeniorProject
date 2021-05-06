import React from 'react';
import axios from 'axios';

var UserInfo = (function() {
    var username = "";
    var uid = "";
    var userid = "";
  
    var getName = function() {
      return username;
    };

    var getUserID = function() {
      return userid;
    };
    
    var setUserID = function (id){
      userid = id;
     
    };
  
    var setName = function(name) {
        username = name;
    };
  
    return {
      getName: getName,
      setName: setName,
      getUserID: getUserID,
      setUserID: setUserID,
    }
  
  })();
  
  export default UserInfo;