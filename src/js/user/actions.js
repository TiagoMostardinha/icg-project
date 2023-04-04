export default {
    userActions(e,user){
        switch(e.keyCode){
            case 37:
                user.position.x -= 1;
                break;
            case 38:
                user.position.z -= 1;
                break;
            case 39:
                user.position.x += 1;
                break;
            case 40:
                user.position.z += 1;
                break;
        }
    }
}