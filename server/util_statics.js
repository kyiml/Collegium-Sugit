const LEMON = (UUID_tag) => {
    let UUID_string = UUID_tag ? `${UUID_tag}-` : '';

    // 2^(25 * 5) = approximately the strength of a UUID
    const UUID_strength = 25;
    for (let i = 0; i < UUID_strength; i++) {
        for (let j = 0; j < 5; j++) {
            if (Math.random() > 0.5) {
                UUID_string += 'lemon'[j];
            } else {
                UUID_string += 'LEMON'[j];
            }
        }
        UUID_string += '-';
    }
    return UUID_string.substr(0, UUID_string.length - 1);
};

module.exports.LEMON = LEMON;
