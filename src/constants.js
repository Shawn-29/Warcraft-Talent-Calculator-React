export const TALENT_ICON_SIZE = 44;

export const TALENT_GAP = TALENT_ICON_SIZE >> 1;

/* talent permissions */
export const STATUS_DISABLED = 'disabled';
export const STATUS_ALLOWED = 'allowed';
export const STATUS_MAX_RANK = 'max rank';

/* user input methods */
export const INPUT_MOUSE = 'mouse';
export const INPUT_TOUCH = 'touch';

/* mouse input button types */
export const MOUSE_BTN_LEFT = 0;
export const MOUSE_BTN_RIGHT = 2;

/* the additional amount of required points to spend to
    access the next tier of talents */
export const POINTS_REQ_PER_TIER = 5;

/* number of allowabled glyphs per type */
export const GLYPH_LIMIT = 3;

export const GLYPH_TYPE_MAJOR = 'major';
export const GLYPH_TYPE_MINOR = 'minor';

/* URL keys */
export const URL_PARAM_TALENT_KEY = 't';
export const URL_PARAM_CLASS_KEY = 'c';
export const URL_PARAM_EXP_KEY = 'x';
export const URL_PARAM_GLYPH_MAJOR_KEY = 'g';
export const URL_PARAM_GLYPH_MINOR_KEY = 'l';

/* link glyph type to glyph url key */
export const GLYPH_PARAM_TABLE = Object.freeze({
    [GLYPH_TYPE_MAJOR]: URL_PARAM_GLYPH_MAJOR_KEY,
    [GLYPH_TYPE_MINOR]: URL_PARAM_GLYPH_MINOR_KEY
});

/* number of columns comprising the class selector image */
export const NUM_CLASS_ICON_COLS = 10;

export const THROTTLE_KEY = 'user input';

/* image resource directories */
export const CDN_ENDPOINT = process.env.REACT_APP_CDN_ENDPOINT ?? 'images/';
export const IMG_ICON_DIR = CDN_ENDPOINT + 'talent-icons';
export const IMG_TREE_BG_DIR = CDN_ENDPOINT + 'tree-bgs';
export const IMG_UI_DIR = CDN_ENDPOINT + 'ui';
export const TALENT_FILE_DIR = 'talent-files';

/* image format extension */
export const TALENT_IMG_EXT = process.env.REACT_APP_TALENT_IMG_EXT ?? '.png';