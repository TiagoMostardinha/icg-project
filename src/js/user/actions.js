export default {
    userActions(e,user){
        switch(e.keyCode){
            case 37: // Left arrow key
                user.rotateY(0.1); // Rotate left by 0.1 radians
                break;
            case 38: // Up arrow key
                user.translateZ(-1); // Move forward by 1 unit
                break;
            case 39: // Right arrow key
                user.rotateY(-0.1); // Rotate right by 0.1 radians
                break;
            case 40: // Down arrow key
                user.translateZ(1); // Move backward by 1 unit
                break;
        }
    }
}
