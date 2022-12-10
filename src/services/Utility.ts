class Utility {
    static trimParagraph(from, maxSize = 250, suffix = ' [...]') {
        if (from && from.length > maxSize) {
            from = from.substring(0, maxSize)
            from = from.substring(0, Math.min(from.length, from.lastIndexOf(' ')))
            from += suffix
        }

        return from
    }

    static trimInfoParagraph(from, maxSize = 350, suffix = ' [...]') {
        if (from && from.length > maxSize) {
            from = from.substring(0, maxSize)
            from = from.substring(0, Math.min(from.length, from.lastIndexOf(' ')))
            from += suffix
        }

        return from
    }

    static stripHtml(data) {
        return data.replace(/<\/?\w*\\?>/gm, '');
    }
}

export default Utility
