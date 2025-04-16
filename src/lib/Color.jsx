

class Color {

    static getColorByUser(userIdentifier) {
        if (userIdentifier) {
            let hash = 0;
            for (let i = 0; i < userIdentifier.length; i++) {
                hash = userIdentifier.charCodeAt(i) + ((hash << 5) - hash);
            }

            hash = Math.abs(hash);
            const color = (hash & 0x00ffffff).toString(16).padStart(6, '0');
            return `#${color}`;
        }
    };
}

export default Color;