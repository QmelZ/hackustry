const toast = require("libs/toast");

const annoying = {
    started: false,
    start(){
        this.started = true;
        Timer.schedule(() => {
            toast(Icon.warning, "[red]restart your game to finish disabling features[]");
        }, 10, 10);
    }
};

module.exports = annoying;
