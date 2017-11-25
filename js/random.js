class Random {

    static randomLetter(min, max) {

        return Math.floor(Math.random() * (max - min + 1)) + min;
        
    }
}