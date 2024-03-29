const utils = {
    randomOrder: (arr) => {
        function shuffle(arr) {
            for (let i = arr.length - 1; i >= 0; i--) {
                const randomIndex = Math.floor(Math.random() * (i + 1));
                const itemAtIndex = arr[randomIndex];
                arr[randomIndex] = arr[i];
                arr[i] = itemAtIndex;
            }
            return arr;
        }
        return shuffle(
            [...Array(arr.length)].map(function(item, i) {
                return i;
            })
        );
    },
}

export default utils;